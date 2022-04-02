package com.thomasleconte.francebuilder.data.entity;

import lombok.Data;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

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

    @Column(name = "email")
    private String email;

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

    @Column(name = "roles")
    private String roles;

    @Column(name = "accountNotExpired")
    private boolean accountNotExpired;

    @Column(name = "accountNotLocked")
    private boolean accountNotLocked;

    @Column(name = "credentialNonExpired")
    private boolean credentialNonExpired;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "code_parrain")
    private String codeParrain;

    @OneToMany(mappedBy = "codeParrain")
    private List<User> filleuls;

    public String getFullName() {
        return nom + " " + prenom;
    }

    public List<String> getRoles(){
        return Arrays.asList(this.roles.split(";"));
    }

    public void addFilleul(User filleul){
        if(this.filleuls == null) this.filleuls = new ArrayList<>();
        this.filleuls.add(filleul);
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
