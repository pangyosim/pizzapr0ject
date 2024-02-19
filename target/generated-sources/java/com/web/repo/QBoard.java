package com.web.repo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = -169974735L;

    public static final QBoard board = new QBoard("board");

    public final StringPath boardContents = createString("boardContents");

    public final DateTimePath<java.util.Date> boardDate = createDateTime("boardDate", java.util.Date.class);

    public final StringPath boardFile = createString("boardFile");

    public final NumberPath<Integer> boardSeq = createNumber("boardSeq", Integer.class);

    public final StringPath boardTitle = createString("boardTitle");

    public final StringPath boardUserId = createString("boardUserId");

    public final NumberPath<Integer> boardViews = createNumber("boardViews", Integer.class);

    public QBoard(String variable) {
        super(Board.class, forVariable(variable));
    }

    public QBoard(Path<? extends Board> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBoard(PathMetadata metadata) {
        super(Board.class, metadata);
    }

}

