package com.moebius.backend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;

@Getter
@Setter
public class LoginDto {
	@Email
	private String email;
	private String password;
}
