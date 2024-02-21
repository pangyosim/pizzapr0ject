package com.web.repo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QParkingEntity is a Querydsl query type for ParkingEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QParkingEntity extends EntityPathBase<ParkingEntity> {

    private static final long serialVersionUID = 1974522886L;

    public static final QParkingEntity parkingEntity = new QParkingEntity("parkingEntity");

    public final StringPath beginholi = createString("beginholi");

    public final StringPath beginweek = createString("beginweek");

    public final StringPath endholi = createString("endholi");

    public final StringPath endweek = createString("endweek");

    public final NumberPath<Integer> fullmon = createNumber("fullmon", Integer.class);

    public final StringPath holipayyn = createString("holipayyn");

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lng = createNumber("lng", Double.class);

    public final StringPath nightyn = createString("nightyn");

    public final StringPath paytype = createString("paytype");

    public final StringPath paytypeholi = createString("paytypeholi");

    public final StringPath pkaddr = createString("pkaddr");

    public final StringPath pkcode = createString("pkcode");

    public final StringPath pkname = createString("pkname");

    public final StringPath pkrule = createString("pkrule");

    public final StringPath pkstatus = createString("pkstatus");

    public final StringPath saturdaypay = createString("saturdaypay");

    public final StringPath saturdaypayyn = createString("saturdaypayyn");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath tel = createString("tel");

    public final StringPath type = createString("type");

    public QParkingEntity(String variable) {
        super(ParkingEntity.class, forVariable(variable));
    }

    public QParkingEntity(Path<? extends ParkingEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QParkingEntity(PathMetadata metadata) {
        super(ParkingEntity.class, metadata);
    }

}

