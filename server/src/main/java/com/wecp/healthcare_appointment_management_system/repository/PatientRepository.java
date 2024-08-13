package com.wecp.healthcare_appointment_management_system.repository;

import com.wecp.healthcare_appointment_management_system.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository  extends JpaRepository<Patient,Long> {
    // Custom query methods if needed
}