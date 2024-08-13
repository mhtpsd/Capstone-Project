package com.wecp.healthcare_appointment_management_system.service;


import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor findDoctorByID(Long Id){
        return doctorRepository.findById(Id).orElse(null);
    }

    public List<Doctor> getDoctors(){
        return doctorRepository.findAll();
    }

    public Doctor updateAvailability(Long doctorId, String availability) throws Exception {
        Doctor doctorToUpdate = doctorRepository.findById(doctorId).orElse(null);
    
        if (doctorToUpdate == null) {
            throw new Exception("Doctor not found with ID: " + doctorId);
        } else {
            doctorToUpdate.setAvailability(availability);
            return doctorRepository.save(doctorToUpdate);
        }
    }
    
}