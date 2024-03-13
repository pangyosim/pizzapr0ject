package com.web.repo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Table(name = "averagedata")
public class RefineWaitrepo {

    @Id
    @Column(name="brcd", nullable = false)
    private String brcd;
    @Column(name="addr", nullable = false)
    private String addr;
    @Column(name="trwntgn1", nullable = true)
    private String trwntgn1;
    @Column(name="avg1", nullable = true)
    private String avg1;
    @Column(name="trwntgn2", nullable = true)
    private String trwntgn2;
    @Column(name="avg2", nullable = true)
    private String avg2;
    @Column(name="trwntgn3", nullable = true)
    private String trwntgn3;
    @Column(name="avg3", nullable = true)
    private String avg3;
    @Column(name="trwntgn4", nullable = true)
    private String trwntgn4;
    @Column(name="avg4", nullable = true)
    private String avg4;
    @Column(name="trwntgn5", nullable = true)
    private String trwntgn5;
    @Column(name="avg5", nullable = true)
    private String avg5;

}
