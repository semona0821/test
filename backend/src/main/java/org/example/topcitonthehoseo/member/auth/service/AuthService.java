package org.example.topcitonthehoseo.member.auth.service;

import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.UUID;

import org.example.topcitonthehoseo.member.auth.dto.GoogleLoginRequestDto;
import org.example.topcitonthehoseo.member.auth.dto.LoginRequestDto;
import org.example.topcitonthehoseo.member.auth.dto.LoginResponseDto;
import org.example.topcitonthehoseo.member.auth.dto.RegisterRequestDto;
import org.example.topcitonthehoseo.member.auth.dto.ResetPasswordRequestDto;
import org.example.topcitonthehoseo.member.auth.dto.TokenResponseDto;
import org.example.topcitonthehoseo.member.auth.util.JwtUtil;
import org.example.topcitonthehoseo.member.entity.User;
import org.example.topcitonthehoseo.member.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j

public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Value("${google.client-id}")
    private String googleClientId;

    @PostConstruct
    public void init() {
        System.out.println("✅ googleClientId = " + googleClientId);
    }

    // 1) 일반 로그인
    public LoginResponseDto login(LoginRequestDto dto) {
        User user = userRepository.findByStudentId(dto.getStudentId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return buildTokenResponse(user, false);
    }

    // 2) 구글 로그인
    @Transactional
    public LoginResponseDto googleLogin(GoogleLoginRequestDto dto) {
        String email = verifyGoogleTokenAndGetEmail(dto.getCredential());
        if (email == null) {
            log.error("🔴 구글 토큰 검증 실패 또는 이메일 추출 실패");
            throw new IllegalArgumentException("구글 토큰이 유효하지 않습니다.");
        }

        // 이메일 필터링 (학생 + 교수용)
        if (!(email.endsWith("@vision.hoseo.edu") || email.endsWith("@hoseo.edu"))) {
            throw new IllegalArgumentException("학교 이메일(@vision.hoseo.edu)만 로그인할 수 있습니다.");
        }

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            String studentId = email.split("@")[0];

            User tmp = User.builder()
                    .email(email)
                    .studentId(studentId)
                    .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .registered(false)
                    .nickname("USER_" + System.currentTimeMillis())
                    .role("USER")
                    .isWithdraw(false)
                    .totalScore(0)
                    .build();
            return userRepository.save(tmp);
        });

        boolean isNewUser = !user.getRegistered();

        return buildTokenResponse(user, isNewUser);
    }



    // 3) 추가 정보 등록
    @Transactional
    public LoginResponseDto register(RegisterRequestDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("먼저 구글 로그인을 진행해주세요."));

        if (user.getStudentId() != null) {
            throw new IllegalStateException("이미 가입이 완료된 계정입니다.");
        }

        if (userRepository.findByStudentId(dto.getStudentId()).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 학번입니다.");
        }
        if (userRepository.existsByNickname(dto.getNickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        user.setStudentId(dto.getStudentId());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setNickname(dto.getNickname());
        user.setRegistered(true);

        return buildTokenResponse(user, false);
    }

    // 4) 토큰 재발급 (리프레시 토큰 기반)
    public TokenResponseDto reissueToken(String refreshToken) {
        if (!jwtUtil.validateToken(refreshToken)) {
            throw new IllegalArgumentException("리프레시 토큰이 유효하지 않습니다.");
        }

        String studentId = jwtUtil.getStudentIdFromToken(refreshToken);
        User user = userRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        String newAccessToken = jwtUtil.createAccessToken(studentId, user.getRole());
        String newRefreshToken = jwtUtil.createRefreshToken(studentId);

        return new TokenResponseDto(newAccessToken, newRefreshToken);
    }

    // Google ID Token 검증
    private String verifyGoogleTokenAndGetEmail(String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    JacksonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) return null;

            return idToken.getPayload().getEmail();
        } catch (GeneralSecurityException | java.io.IOException e) {
            log.error("Google Token verification error", e);
            return null;
        }
    }

    // 로그인 응답 빌드 (LoginResponseDto용)
    private LoginResponseDto buildTokenResponse(User user, boolean isNewUser) {
        String accessToken = jwtUtil.createAccessToken(user.getStudentId(), user.getRole());
        String refreshToken = jwtUtil.createRefreshToken(user.getStudentId());

        return LoginResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .nickname(user.getNickname())
                .role(user.getRole())
                .isNewUser(isNewUser)
                .build();
    }

    // 패스워드 찾기
    public void resetPassword(ResetPasswordRequestDto request) {
        User user = userRepository.findByStudentIdIgnoreCase(request.getUsername())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public boolean isNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

}
