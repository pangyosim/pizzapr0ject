package com.web.repo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QWaitrepo is a Querydsl query type for Waitrepo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWaitrepo extends EntityPathBase<Waitrepo> {

    private static final long serialVersionUID = -1315328708L;

    public static final QWaitrepo waitrepo = new QWaitrepo("waitrepo");

    public final StringPath addr = createString("addr");

    public final StringPath brcd = createString("brcd");

    public final StringPath createday = createString("createday");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath trwntgn1 = createString("trwntgn1");

    public final StringPath trwntgn2 = createString("trwntgn2");

    public final StringPath trwntgn3 = createString("trwntgn3");

    public final StringPath trwntgn4 = createString("trwntgn4");

    public final StringPath trwntgn5 = createString("trwntgn5");

    public final StringPath waitpeople1 = createString("waitpeople1");

    public final StringPath waitpeople2 = createString("waitpeople2");

    public final StringPath waitpeople3 = createString("waitpeople3");

    public final StringPath waitpeople4 = createString("waitpeople4");

    public final StringPath waitpeople5 = createString("waitpeople5");

    public QWaitrepo(String variable) {
        super(Waitrepo.class, forVariable(variable));
    }

    public QWaitrepo(Path<? extends Waitrepo> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWaitrepo(PathMetadata metadata) {
        super(Waitrepo.class, metadata);
    }

}

