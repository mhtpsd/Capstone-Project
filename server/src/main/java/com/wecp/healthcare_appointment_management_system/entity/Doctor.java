package com.wecp.healthcare_appointment_management_system.entity;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Set;

@Entity
public class Doctor extends User {
      // implement doctor entity
      @OneToMany(mappedBy = "doctor")
      @JsonIgnore
      private Set<Appointment> appointments;

      @OneToMany(mappedBy = "doctor")
      @JsonIgnore
      private Set<MedicalRecord> medicalRecords;

      private String specialty;
      private String availability;

      public Doctor() {}

      public Set<Appointment> getAppointments() {
         return appointments;
      }

      public void setAppointments(Set<Appointment> appointments) {
         this.appointments = appointments;
      }

      public Set<MedicalRecord> getMedicalRecords() {
         return medicalRecords;
      }

      public void setMedicalRecords(Set<MedicalRecord> medicalRecords) {
         this.medicalRecords = medicalRecords;
      }

      public String getSpecialty() {
         return specialty;
      }

      public void setSpecialty(String specialty) {
         this.specialty = specialty;
      }

      public String getAvailability() {
         return availability;
      }

      public void setAvailability(String availability) {
         this.availability = availability;
      }
<<<<<<< HEAD
}
=======
}
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
