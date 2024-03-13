package com.web.repo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QReview is a Querydsl query type for Review
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReview extends EntityPathBase<Review> {

    private static final long serialVersionUID = -524801171L;

    public static final QReview review = new QReview("review");

    public final StringPath krnbrm = createString("krnbrm");

    public final StringPath reviewContents = createString("reviewContents");

    public final DateTimePath<java.util.Date> reviewDate = createDateTime("reviewDate", java.util.Date.class);

    public final NumberPath<Integer> reviewSeq = createNumber("reviewSeq", Integer.class);

    public final StringPath reviewUserId = createString("reviewUserId");

    public final NumberPath<Float> starRating = createNumber("starRating", Float.class);

    public QReview(String variable) {
        super(Review.class, forVariable(variable));
    }

    public QReview(Path<? extends Review> path) {
        super(path.getType(), path.getMetadata());
    }

    public QReview(PathMetadata metadata) {
        super(Review.class, metadata);
    }

}

