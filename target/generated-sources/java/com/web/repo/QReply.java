package com.web.repo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QReply is a Querydsl query type for Reply
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReply extends EntityPathBase<Reply> {

    private static final long serialVersionUID = -155482059L;

    public static final QReply reply = new QReply("reply");

    public final NumberPath<Integer> qaSeq = createNumber("qaSeq", Integer.class);

    public final StringPath replyContents = createString("replyContents");

    public final DatePath<java.sql.Date> replyDate = createDate("replyDate", java.sql.Date.class);

    public final NumberPath<Integer> replySeq = createNumber("replySeq", Integer.class);

    public final StringPath replyUserId = createString("replyUserId");

    public QReply(String variable) {
        super(Reply.class, forVariable(variable));
    }

    public QReply(Path<? extends Reply> path) {
        super(path.getType(), path.getMetadata());
    }

    public QReply(PathMetadata metadata) {
        super(Reply.class, metadata);
    }

}

