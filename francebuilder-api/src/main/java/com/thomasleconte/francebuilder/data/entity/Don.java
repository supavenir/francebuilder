package com.thomasleconte.francebuilder.data.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="don")
@Data
@ToString
public class Don {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "montant")
    private int montant;

    @Column(name = "commentaire")
    private String commentaire;

    @Column(name = "date")
    private LocalDateTime date;

    @ManyToOne
    private User user;
}
