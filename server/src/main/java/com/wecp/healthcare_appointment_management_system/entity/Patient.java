package com.wecp.healthcare_appointment_management_system.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;

@Entity
public class Patient extends User {
    // implement patient entity
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL) 
    private Set<MedicalRecord> medicalRecords;

    @OneToMany(mappedBy = "patient") 
    @JsonIgnore 
    private Set<Appointment> appointments;

    public Set<MedicalRecord> getMedicalRecords() {
        return medicalRecords;
    }

    public void setMedicalRecords(Set<MedicalRecord> medicalRecords) {
        this.medicalRecords = medicalRecords;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }
    
    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    } 

<<<<<<< HEAD
}
=======
}
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
