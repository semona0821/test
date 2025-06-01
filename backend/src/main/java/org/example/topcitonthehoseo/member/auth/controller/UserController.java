package org.example.topcitonthehoseo.member.auth.controller;

import java.util.Optional;

import org.example.topcitonthehoseo.member.auth.dto.NicknameUpdateRequestDto;
import org.example.topcitonthehoseo.member.auth.service.UserService;
import org.example.topcitonthehoseo.member.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{studentId}")
    public ResponseEntity<User> getUserByStudentId(@PathVariable String studentId) {
        Optional<User> user = userService.findByStudentId(studentId);
        return user.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User saved = userService.save(user);
        return ResponseEntity.ok(saved);
    }
    
    @PatchMapping("/nickname")
    public ResponseEntity<?> updateNickname(@RequestBody NicknameUpdateRequestDto request,
                                            @RequestParam String username) {
        userService.updateNickname(username, request.getNickname());
        return ResponseEntity.ok("닉네임 변경 완료");
    }
}
