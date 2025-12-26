# STRIDE Threat Model
## Secure Web Application

### 1. Spoofing (Impersonation)
- **Threat:** Attackers steal JWT tokens to impersonate users
- **Mitigation:** 
  - JWT tokens with 24-hour expiration
  - Secure token storage (HTTP-only cookies in production)
  - bcrypt password hashing with salt
- **Implementation Status:** ✅ Implemented

### 2. Tampering (Data Manipulation)
- **Threat:** Users or attackers modify data in transit
- **Mitigation:**
  - Input validation using validator.js
  - Request body size limits (10kb)
  - HTTPS in production (currently HTTP for development)
- **Implementation Status:** ✅ Implemented

### 3. Repudiation (Denying Actions)
- **Threat:** Users deny performing actions
- **Mitigation:**
  - Server-side logging of authentication attempts
  - JWT tokens with timestamps
  - Audit trail for admin actions
- **Implementation Status:** ⚠️ Partial

### 4. Information Disclosure (Data Exposure)
- **Threat:** Sensitive data exposure
- **Mitigation:**
  - Password hashing with bcrypt
  - No sensitive data in URLs
  - Secure HTTP headers (Helmet.js)
  - Environment variables for secrets
- **Implementation Status:** ✅ Implemented

### 5. Denial of Service (Service Disruption)
- **Threat:** Server overload from excessive requests
- **Mitigation:**
  - Rate limiting (100 requests/15 minutes per IP)
  - Request payload size limits
  - Efficient database queries
- **Implementation Status:** ✅ Implemented

### 6. Elevation of Privilege (Unauthorized Access)
- **Threat:** Regular users accessing admin functions
- **Mitigation:**
  - Role-Based Access Control (RBAC)
  - Server-side authorization checks
  - JWT token includes role information
- **Implementation Status:** ✅ Implemented

## Diagram