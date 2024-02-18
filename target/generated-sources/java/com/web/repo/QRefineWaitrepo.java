package com.web.repo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRefineWaitrepo is a Querydsl query type for RefineWaitrepo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRefineWaitrepo extends EntityPathBase<RefineWaitrepo> {

    private static final long serialVersionUID = 162714377L;

    public static final QRefineWaitrepo refineWaitrepo = new QRefineWaitrepo("refineWaitrepo");

    public final StringPath addr = createString("addr");

    public final StringPath avg1 = createString("avg1");

    public final StringPath avg2 = createString("avg2");

    public final StringPath avg3 = createString("avg3");

    public final StringPath avg4 = createString("avg4");

    public final StringPath avg5 = createString("avg5");

    public final StringPath brcd = createString("brcd");

    public final StringPath trwntgn1 = createString("trwntgn1");

    public final StringPath trwntgn2 = createString("trwntgn2");

    public final StringPath trwntgn3 = createString("trwntgn3");

    public final StringPath trwntgn4 = createString("trwntgn4");

    public final StringPath trwntgn5 = createString("trwntgn5");

    public QRefineWaitrepo(String variable) {
        super(RefineWaitrepo.class, forVariable(variable));
    }

    public QRefineWaitrepo(Path<? extends RefineWaitrepo> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRefineWaitrepo(PathMetadata metadata) {
        super(RefineWaitrepo.class, metadata);
    }

}

