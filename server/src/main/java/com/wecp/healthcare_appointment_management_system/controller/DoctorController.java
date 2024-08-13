package com.wecp.healthcare_appointment_management_system.controller;

import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.service.AppointmentService;
import com.wecp.healthcare_appointment_management_system.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DoctorController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/api/doctor/appointments")
    public ResponseEntity<List<Appointment>> viewAppointments(@RequestParam Long doctorId) {
        // view appointments
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorId(doctorId);
        return new ResponseEntity<List<Appointment>>(appointments, HttpStatus.OK);
    }

    @PostMapping("/api/doctor/availability")
    public ResponseEntity<Doctor> manageAvailability(@RequestParam Long doctorId, @RequestParam String availability) throws Exception {
        // manage availablity
        Doctor updatedDoctor = doctorService.updateAvailability(doctorId, availability);
        return ResponseEntity.status(HttpStatus.OK).body(updatedDoctor);
    }
}