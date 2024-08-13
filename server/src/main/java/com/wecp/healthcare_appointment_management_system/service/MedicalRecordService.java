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

<<<<<<< HEAD
}
=======
}
>>>>>>> 653baa45948800887c541d3e3f8bb3fced9d5c2b
