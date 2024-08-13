package com.wecp.healthcare_appointment_management_system.repository;

import com.wecp.healthcare_appointment_management_system.entity.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceptionistRepository  extends JpaRepository<Receptionist,Long> {

}