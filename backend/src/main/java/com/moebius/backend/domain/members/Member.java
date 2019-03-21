package com.moebius.backend.domain.members;

import com.moebius.backend.domain.commons.Base;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Document(collection = "members")
@EqualsAndHashCode(callSuper = true)
public class Member extends Base {
	@Id
	private ObjectId id;
	private Level level;
	private String name;
	@Email
	private String email;
	private String password;
	private String authToken;

	@Builder.Default()
	private boolean isActive = false;

	@Builder.Default()
	@DBRef
	private Set<Role> roles = new HashSet<>();
}