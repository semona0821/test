package org.example.topcitonthehoseo.member.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginRequestDto {
    private String studentId;
    private String password;
}
