package com.web.repo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QQnA is a Querydsl query type for QnA
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQnA extends EntityPathBase<QnA> {

    private static final long serialVersionUID = -1725300273L;

    public static final QQnA qnA = new QQnA("qnA");

    public final StringPath qaContents = createString("qaContents");

    public final DateTimePath<java.util.Date> qaDate = createDateTime("qaDate", java.util.Date.class);

    public final StringPath qaFile = createString("qaFile");

    public final NumberPath<Integer> qaSeq = createNumber("qaSeq", Integer.class);

    public final StringPath qaTitle = createString("qaTitle");

    public final StringPath qaUserId = createString("qaUserId");

    public final NumberPath<Integer> qaViews = createNumber("qaViews", Integer.class);

    public QQnA(String variable) {
        super(QnA.class, forVariable(variable));
    }

    public QQnA(Path<? extends QnA> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQnA(PathMetadata metadata) {
        super(QnA.class, metadata);
    }

}

