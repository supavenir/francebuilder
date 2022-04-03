package com.thomasleconte.francebuilder.data.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "parrainage")
@Data
@ToString
public class Parrainnage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(targetEntity = User.class)
    private User parraineur;

    @ManyToOne(targetEntity = User.class)
    private User filleul;
}
