# 📌 EHR + User Management API Collection

This repository contains a **Postman Collection** for testing and documenting APIs built for the **EHR (Electronic Health Records) + User Management System**.  
It includes authentication, user management, file uploads, and mock EHR endpoints for patients, appointments, and medical records.  

---

## 🚀 Features Covered

### 🔑 Authentication (`/auth`)
- **Register User** – Create new users with role-based access (client, admin, vendor, driver).  
- **Login User** – Authenticate users and receive a JWT token.  
- **Refresh Token** – Refresh JWT session.  
- **Logout User** – Invalidate user session.  

### 👤 User Management (`/user`)
- **Get User Info** – Retrieve user profile details.  
- **Update User Info** – Update profile fields (name, address, etc.).  
- **Update Password** – Change password with old password validation.  
- **Reset Password** – Reset password via security answer.  
- **Delete User** – Remove a user account.  

### 📤 Uploads (`/upload-image`)
- **Upload Profile Image** – Upload profile pictures using `multipart/form-data`.  

### 🏥 EHR Mock APIs (`/patients`, `/ehr`)
- **Patients** – Create, read, update, delete patients.  
- **Appointments** – Book, cancel, and reschedule appointments.  
- **EHR Records** – Manage lab results, prescriptions, allergies, and vitals.  

---

## 🛠️ Setup Instructions

### 1️⃣ Install Postman
Download and install [Postman](https://www.postman.com/downloads/).

### 2️⃣ Import the Collection
1. Open Postman.  
2. Click **Import** → Select `EHR-Integration.postman_collection.json`.  
3. Collection will appear in your **Collections** sidebar.  

### 3️⃣ Set Environment Variables
In Postman, create an environment with the following variables:

| Variable | Example Value |
|----------|---------------|
| `baseUrl` | `http://localhost:5000/api` |
| `token` | (your JWT token after login) |

### 4️⃣ Authenticate
1. Run the **Register User** request.  
2. Run the **Login User** request → Copy the `token` from response.  
3. Paste the token into the `token` environment variable.  
4. Now you can access protected routes (User, Upload, EHR).  

---


## ⚡ Example Usage (cURL)

Login user:
```bash
curl -X POST {{baseUrl}}/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "123456"
  }'
