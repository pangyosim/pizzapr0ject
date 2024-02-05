package com.web.repo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Table(name="bankaddr")
public class Bankaddr {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long seq;
    @Column(name= "brcd", nullable = false)
    private String brcd;
    @Column(name= "krnbrm", nullable = false)
    private String krnbrm;
    @Column(name= "brncnwbscadr", nullable = false)
    private String brncnwbscadr;
    @Column(name="geox", nullable = false, length = 255)
    private double geox;
    @Column(name="geoy", nullable = false, length = 255)
    private double geoy;
}
