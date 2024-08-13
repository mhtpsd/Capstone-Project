package com.wecp.healthcare_appointment_management_system.service;

import com.wecp.healthcare_appointment_management_system.entity.MedicalRecord;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MedicalRecordService {

    @Autowired
   private MedicalRecordRepository medicalRecordRepository;
 
   public List<MedicalRecord> getMedicalRecordsByPatientId(Long patientId){
        return medicalRecordRepository.getMedicalRecordsByPatientId(patientId);
   }

}