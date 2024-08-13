package com.wecp.healthcare_appointment_management_system.config;
import com.wecp.healthcare_appointment_management_system.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // implement security configuration
    // set the permission of api here such that
    // register and login api can be accessed to anyone
    // patients api can be accessed by PATIENT role
    // doctors api can be accessed by DOCTOR role
    // receptionists api can be accessed by RECEPTIONIST role

    // e.g hasAuthority("PATIENT") for /api/patient/doctors

    private final UserDetailsService userDetailsService;
    private final JwtRequestFilter jwtRequestFilter;
    private final PasswordEncoder passwordEncoder;
 
    @Autowired
    public SecurityConfig(UserDetailsService userDetailsService,
                    JwtRequestFilter jwtRequestFilter,
                    PasswordEncoder passwordEncoder) {
            this.userDetailsService = userDetailsService;
            this.jwtRequestFilter = jwtRequestFilter;
            this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/receptionist/register").permitAll()
                .antMatchers(HttpMethod.POST, "/api/user/login").permitAll()
                .antMatchers(HttpMethod.POST, "/api/doctor/availability").hasAuthority("DOCTOR")
                .antMatchers(HttpMethod.POST, "/api/patient/register").permitAll()
                .antMatchers(HttpMethod.POST, "/api/doctors/register").permitAll()
                .antMatchers(HttpMethod.POST, "/api/patient/appointment").hasAuthority("PATIENT")

                .antMatchers(HttpMethod.POST, "/api/receptionist/appointment").hasAuthority("RECEPTIONIST")

                .antMatchers(HttpMethod.POST, "/api/receptionist/appointment").hasAuthority("“RECEPTIONIST")

                .antMatchers(HttpMethod.GET, "/api/patient/doctors").hasAuthority("PATIENT")
                .antMatchers(HttpMethod.GET, "/api/patient/appointments").hasAuthority("PATIENT")
                .antMatchers(HttpMethod.GET, "/api/patient/medicalrecords").hasAuthority("PATIENT")
                .antMatchers(HttpMethod.GET, "/api/doctor/appointments").hasAuthority("DOCTOR")
                .antMatchers(HttpMethod.GET, "/api/receptionist/appointments").hasAuthority("RECEPTIONIST")
                .antMatchers(HttpMethod.POST, "/api/receptionist/appointment").hasAuthority("RECEPTIONIST")
                .antMatchers(HttpMethod.PUT, "/api/receptionist/appointment-reschedule/{appointmentId}**").hasAuthority("RECEPTIONIST")
                
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
 
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
            return super.authenticationManagerBean();
    }
}