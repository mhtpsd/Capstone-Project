package com.wecp.healthcare_appointment_management_system.service;

// import com.wecp.healthcare_appointment_management_system.entity.Doctor;
// import com.wecp.healthcare_appointment_management_system.entity.Patient;
// import com.wecp.healthcare_appointment_management_system.entity.Receptionist;
import com.wecp.healthcare_appointment_management_system.entity.User;
// import com.wecp.healthcare_appointment_management_system.repository.DoctorRepository;
// import com.wecp.healthcare_appointment_management_system.repository.PatientRepository;
// import com.wecp.healthcare_appointment_management_system.repository.ReceptionistRepository;
import com.wecp.healthcare_appointment_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {
@Autowired
   private UserRepository userRepository; 
   @Autowired
   private PasswordEncoder passwordEncoder;

   public User loginUser(String username,String password) {
      User user = userRepository.findByUsername(username);
      if (user != null && passwordEncoder.matches(password, user.getPassword())) {
          return user;
      }
      return null;
   }

   public User registerUser(User user) {

      User oldUser = userRepository.findByUsername(user.getUsername());
      if (oldUser != null) {
          throw new RuntimeException("User name Is Unavailable: " + user.getUsername());

      }
      user.setPassword(passwordEncoder.encode(user.getPassword()));

      return userRepository.save(user);
  }

   public User getUserByUsername(String username) {
      return userRepository.findByUsername(username);
  }

@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    // TODO Auto-generated method stub
    User user = userRepository.findByUsername(username);
    if (user == null) {
        throw new UsernameNotFoundException("User not found");
    }

    return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            new ArrayList<>());
}


}