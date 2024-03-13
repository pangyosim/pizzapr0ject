package com.web.repo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBankaddr is a Querydsl query type for Bankaddr
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBankaddr extends EntityPathBase<Bankaddr> {

    private static final long serialVersionUID = 874686210L;

    public static final QBankaddr bankaddr = new QBankaddr("bankaddr");

    public final StringPath brcd = createString("brcd");

    public final StringPath brncnwbscadr = createString("brncnwbscadr");

    public final NumberPath<Double> geox = createNumber("geox", Double.class);

    public final NumberPath<Double> geoy = createNumber("geoy", Double.class);

    public final StringPath krnbrm = createString("krnbrm");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public QBankaddr(String variable) {
        super(Bankaddr.class, forVariable(variable));
    }

    public QBankaddr(Path<? extends Bankaddr> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBankaddr(PathMetadata metadata) {
        super(Bankaddr.class, metadata);
    }

}

