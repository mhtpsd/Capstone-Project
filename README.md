# HAMS — HealthCare Appointment Management System

A capstone project repository for **HAMS (HealthCare Appointment Management System)** — a system designed to streamline scheduling, managing, and tracking healthcare appointments for patients, providers, and administrators.

## Overview

HAMS helps clinics and hospitals:

- Manage patient appointment requests and bookings
- Maintain provider schedules and availability
- Reduce no‑shows with reminders/notifications
- Support basic workflows for staff and administrators

> Note: This README is intended to document the project as it evolves. Update sections such as setup steps and architecture to match the current implementation.

## Tech Stack (as currently detected)

This repository includes code in multiple languages, including:

- **Java** (backend / core services)
- **TypeScript / JavaScript** (web UI and/or tooling)
- **HTML / SCSS** (front-end markup & styling)
- **Shell** (scripts)

## Repository Structure

Key folders/files may include (varies by implementation):

- `backend/` — server-side services / APIs
- `frontend/` — client-side application
- `docs/` — documentation and diagrams
- `scripts/` — helper scripts

If these folders differ, feel free to adjust this section to reflect the actual layout.

## Getting Started

Because project setups differ (Spring Boot, Node, etc.), start here:

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/mhtpsd/Capstone-Project.git
   cd Capstone-Project
   ```

2. **Locate the app entry points**
   - For Java: look for `pom.xml` or `build.gradle` and a Spring Boot `@SpringBootApplication` class.
   - For Node/TypeScript: look for `package.json` and scripts like `dev`, `start`, or `build`.

3. **Run the project**
   - Java (example):
     ```bash
     ./mvnw spring-boot:run
     ```
   - Node (example):
     ```bash
     npm install
     npm run dev
     ```

> If you want, tell me whether you’re using Spring Boot, React/Angular, etc., and I’ll tailor these commands precisely to your repo.

## Features (planned / typical)

- Patient registration & profile management
- Provider schedule management
- Appointment creation, rescheduling, cancellation
- Admin dashboard
- Notifications (email/SMS) *(optional)*

## Contributing

1. Create a branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push: `git push origin feature/your-feature`
4. Open a Pull Request

## License

No license file is currently specified. Add a license (e.g., MIT, Apache-2.0) if you intend the project to be reused.