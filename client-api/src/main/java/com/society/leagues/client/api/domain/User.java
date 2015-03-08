package com.society.leagues.client.api.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.society.leagues.client.api.domain.division.Division;

import javax.annotation.security.DenyAll;
import javax.validation.constraints.NotNull;
import java.util.*;


public class User extends LeagueObject {

    @NotNull
    String firstName;
    @NotNull
    String lastName;
    String email;
    String password;
    @NotNull
    String login;
    @NotNull
    Role role;
    Set<Integer> players = new TreeSet<>();

    public User(String login, String password, Role role) {
        this.login = login;
        this.password = password;
        this.role = role;
    }
    
    public User (Integer id) {
        setId(id);
    }

    public User(String login, String password) {
        this.login = login;
        this.password = password;
        this.role = Role.PLAYER;
    }

    public User() {

    }

    public User(String firstName, String lastName, String password, String login, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.login = login;
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @DenyAll
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void addRole(Role role) {
         this.role = role;
    }

    public boolean isAdmin() {
        return Role.isAdmin(role);
    }

    public Set<Integer> getPlayers() {
        return players;
    }

    public void addPlayer(Player player) {
        players.add(player.getId());
    }

    public String getName() {
        return firstName + " " + lastName;
    }
    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", login='" + login + '\'' +
                ", role=" + role +
                '}';
    }
}
