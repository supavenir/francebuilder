package com.thomasleconte.francebuilder.data.entity;

import lombok.Data;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "user")
@Data
@ToString
public class User implements UserDetails {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "numero")
    private String numero;

    @Column(name = "descriptif")
    private String descriptif;

    @Column(name = "nomEntreprise")
    private String nomEntreprise;

    @Column(name = "accountNotExpired")
    private boolean accountNotExpired;

    @Column(name = "accountNotLocked")
    private boolean accountNotLocked;

    @Column(name = "credentialNonExpired")
    private boolean credentialNonExpired;

    @Column(name = "enabled")
    private boolean enabled;

    public String getFullName() {
        return nom + " " + prenom;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNotExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNotLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
