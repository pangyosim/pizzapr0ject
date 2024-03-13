package com.web.repo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@ToString
@Entity
@Table(name="avgwait")
public class Waitrepo {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long seq;
        @Column(name="brcd", nullable = false)
        private String brcd;
        @Column(name="addr", nullable = false)
        private String addr;
        @Column(name="trwntgn1", nullable = true)
        private String trwntgn1;
        @Column(name="waitpeople1", nullable = true)
        private String waitpeople1;
        @Column(name="trwntgn2", nullable = true)
        private String trwntgn2;
        @Column(name="waitpeople2", nullable = true)
        private String waitpeople2;
        @Column(name="trwntgn3", nullable = true)
        private String trwntgn3;
        @Column(name="waitpeople3", nullable = true)
        private String waitpeople3;
        @Column(name="trwntgn4", nullable = true)
        private String trwntgn4;
        @Column(name="waitpeople4", nullable = true)
        private String waitpeople4;
        @Column(name="trwntgn5", nullable = true)
        private String trwntgn5;
        @Column(name="waitpeople5", nullable = true)
        private String waitpeople5;
        @Column(name="createday", nullable = false)
        private String createday;


}
