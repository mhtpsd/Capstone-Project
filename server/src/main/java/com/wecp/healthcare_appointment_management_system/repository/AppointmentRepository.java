package com.wecp.healthcare_appointment_management_system.repository;

import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository  extends JpaRepository<Appointment,Long> {

    @Query("select a from Appointment a where a.patient.id =:patientId")
    public List<Appointment> getAppointmentsByPatientId(Long patientId);

    @Query("select a from Appointment a where a.doctor.id =:doctorId")
    public List<Appointment> getAppointmentsByDoctorId(Long doctorId);
}