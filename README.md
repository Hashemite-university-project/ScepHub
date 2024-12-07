# ScepHub

A comprehensive **skills development platform** designed for university students to gain practical experience through projects and courses. This platform bridges the gap between academia and the real world by providing students with opportunities to work on real-life projects under the guidance of experienced instructors. Additionally, it includes a robust chat system for seamless communication and collaboration.

---

## Project Idea

This platform enables university students to:
- Enhance their skills by enrolling in **courses** and participating in **real-world projects**.
- Request to join projects based on their interests and skills.
- Collaborate and communicate with instructors and peers through a **real-time chat system**.

**For Instructors**:
- Create and manage **courses** with rich content to help students learn effectively.
- Design **projects** where students can apply their knowledge and gain hands-on experience.
- Oversee and manage student participation in projects.

**Communication Features**:
- **Individual Chat**: Students and instructors can communicate directly.
- **Group Chat**: Project members can collaborate in real-time.

---

## Features

### Core Functionalities
- **Courses and Projects**:
  - Students can browse and enroll in instructor-created courses.
  - Students can request to join projects, which instructors manage.
  - Courses and projects are structured to provide practical, job-ready skills.

- **Real-Time Chat System**:
  - **WebSocket** integration for instant messaging.
  - Supports both **individual** and **group chats**.

- **Subscription Management**:
  - Secure payments using **Stripe**.
  - **Stripe Webhooks** for real-time payment status updates.

- **Role-Based Authorization**:
  - Different roles with distinct permissions:
    - **Admins**: Manage the platform.
    - **Instructors**: Create and manage courses/projects.
    - **Students**: Enroll in courses and participate in projects.

### Backend Features
- **Technologies Used**:
  - **NestJS**: Modular server-side framework for scalability and performance.
  - **MySQL**: Relational database for storing platform data.
  - **Sequelize**: ORM for managing database interactions.
  - **Swagger**: Integrated API documentation for easy testing and development.
  - **Firebase Storage**: Secure file storage for course materials and project resources.
  - **JWT with Refresh Tokens**:
    - Secure authentication and session management.
  - **Stripe**:
    - Payment processing for subscriptions.
    - **Webhook Integration** for automatic subscription updates.

---

## Technologies Used

### Backend
- **NestJS**: Framework for building scalable and efficient server-side applications.
- **MySQL**: Database to store and manage data.
- **Sequelize**: ORM for querying and managing database operations.
- **Swagger**: API documentation and testing interface.
- **WebSocket**: Real-time communication for the chat system.
- **Stripe**: Payment gateway for subscription processing.
- **Firebase Storage**: Secure and scalable storage solution.
- **JWT (JSON Web Tokens)**: Secure authentication mechanism with access and refresh tokens.

### Frontend
- **React.js**: (Optional) Can be used for creating the user interface.
- **Tailwind CSS**: (Optional) Utility-first CSS framework for styling.

---

## Installation

### Prerequisites
- Node.js (v14+)
- MySQL database
- Firebase account
- Stripe account