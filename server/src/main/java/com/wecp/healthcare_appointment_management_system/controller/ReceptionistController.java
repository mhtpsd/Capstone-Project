package com.wecp.healthcare_appointment_management_system.controller;


import com.wecp.healthcare_appointment_management_system.dto.TimeDto;
import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import com.wecp.healthcare_appointment_management_system.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ReceptionistController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/api/receptionist/appointments")
    public List<Appointment> getAppointments() {
      // get all appointments
      return appointmentService.getAppointments();
    }

    @PostMapping("/api/receptionist/appointment")
    public ResponseEntity<Appointment> scheduleAppointment(@RequestParam Long patientId,
                                                           @RequestParam Long doctorId,
                                                           @RequestBody TimeDto timeDto) {
        // schedule appointment
        return new ResponseEntity<Appointment>(appointmentService.scheduleAppointment(patientId, doctorId, timeDto), HttpStatus.OK);
    }

    @PutMapping("/api/receptionist/appointment-reschedule/{appointmentId}")
    public ResponseEntity<Appointment> rescheduleAppointment(@PathVariable Long appointmentId,
                                                             @RequestBody TimeDto timeDto) {
        // reschedule appointment
        return new ResponseEntity<Appointment>(appointmentService.rescheduleAppointment(appointmentId,timeDto), HttpStatus.OK);
    }
  }