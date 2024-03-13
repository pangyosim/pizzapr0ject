package com.web.repo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLoginRequest is a Querydsl query type for LoginRequest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLoginRequest extends EntityPathBase<LoginRequest> {

    private static final long serialVersionUID = -1349045445L;

    public static final QLoginRequest loginRequest = new QLoginRequest("loginRequest");

    public final StringPath email = createString("email");

    public final StringPath id = createString("id");

    public final StringPath password = createString("password");

    public QLoginRequest(String variable) {
        super(LoginRequest.class, forVariable(variable));
    }

    public QLoginRequest(Path<? extends LoginRequest> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLoginRequest(PathMetadata metadata) {
        super(LoginRequest.class, metadata);
    }

}

