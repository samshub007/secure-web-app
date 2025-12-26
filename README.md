# 🔐 Secure Web Application - Application Security Project

## 📋 Overview
A secure web application demonstrating secure coding practices, threat modeling, and risk assessment for university coursework.

## 🎯 Features Implemented

### ✅ Authentication & Authorization
- JWT-based authentication with 24-hour expiration
- Role-Based Access Control (Admin/User)
- Password hashing using bcrypt with salt
- Secure session management

### ✅ Security Measures
- **Helmet.js** for security HTTP headers
- **CORS** protection with specific origins
- **Rate limiting** (100 requests/15 min per IP)
- **Input validation** using validator.js
- **Request size limiting** (10kb max)

### ✅ Threat Modeling
- **STRIDE** threat model documentation
- **DREAD** risk assessment matrix
- Identified and mitigated key security threats

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Authentication:** JWT, bcrypt
- **Security:** Helmet.js, CORS, rate limiting
- **Frontend:** HTML, CSS, JavaScript
- **Database:** In-memory array (MongoDB ready)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/samhub007/secure-web-app.git
cd secure-web-app/backend

# Install dependencies
npm install

# Start server
node server.js



## 🔒 Security Scanning Results

### Automated Scans:
- **npm audit**: ✅ 0 vulnerabilities found
- **Dependencies**: All packages up-to-date and secure

### Scan Report:
```bash
# Last scan results:
Dependencies:
- bcryptjs@3.0.3 (secure password hashing)
- helmet@8.1.0 (security headers)
- jsonwebtoken@9.0.3 (authentication)
- validator@13.15.26 (input validation)
- cors@2.8.5 (CORS protection)
- express@5.2.1 (web framework)

Vulnerabilities: 0 ✅