package com.wecp.healthcare_appointment_management_system.entity;
 
import javax.persistence.*;
 
@Entity
@Table(name = "users") // do not change table name
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    // implement user entity
    private Long id;
    private String username;
    private String password;
    private String email;
    private String role;
    public User() {
    }
 
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
     
}