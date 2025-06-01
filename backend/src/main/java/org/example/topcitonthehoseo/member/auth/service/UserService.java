package org.example.topcitonthehoseo.member.auth.service;

import java.util.Optional;

import org.example.topcitonthehoseo.member.entity.User;
import org.example.topcitonthehoseo.member.repository.UserRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByStudentId(String studentId) {
        return userRepository.findByStudentId(studentId);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void updateNickname(String studentId, String newNickname) {
        User user = userRepository.findByStudentIdIgnoreCase(studentId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        user.setNickname(newNickname);
        userRepository.save(user);
    }

    public boolean isNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

}
