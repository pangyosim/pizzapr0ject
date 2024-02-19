package com.web.repo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserMember is a Querydsl query type for UserMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserMember extends EntityPathBase<UserMember> {

    private static final long serialVersionUID = -307609638L;

    public static final QUserMember userMember = new QUserMember("userMember");

    public final StringPath address = createString("address");

    public final StringPath email = createString("email");

    public final StringPath id = createString("id");

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final StringPath provider = createString("provider");

    public final EnumPath<Role> role = createEnum("role", Role.class);

    public final StringPath socialnum = createString("socialnum");

    public final StringPath username = createString("username");

    public QUserMember(String variable) {
        super(UserMember.class, forVariable(variable));
    }

    public QUserMember(Path<? extends UserMember> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserMember(PathMetadata metadata) {
        super(UserMember.class, metadata);
    }

}

