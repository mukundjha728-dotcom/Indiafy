# 🔌 API Reference & Quick Links

## Backend Authentication Endpoints

### Sign Up

```
POST /customer/auth/signup

Request Body:
{
  "firstName": "John",
  "lastName": "Doe",        // optional
  "middleName": "Michael",  // optional (not in frontend form)
  "email": "john@example.com",
  "password": "Test12345"
}

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "Customer",
    "createdAt": "2024-04-28T10:30:00Z",
    "updatedAt": "2024-04-28T10:30:00Z"
  },
  "message": "New Customer registration Successful",
  "statusCode": 200
}

Response (400):
{
  "statusCode": 400,
  "message": "All fields are required."
}

Response (400 - Password):
{
  "statusCode": 400,
  "message": "Password must be at least 8 characters long and include at least one letter and one number."
}

Response (400 - Email exists):
{
  "statusCode": 400,
  "message": "Email already exists"
}
```

### Login

```
POST /customer/auth/login

Request Body:
{
  "email": "john@example.com",
  "password": "Test12345"
}

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "Customer",
    "createdAt": "2024-04-28T10:30:00Z",
    "updatedAt": "2024-04-28T10:30:00Z"
  },
  "message": "Access Granted",
  "statusCode": 200
}

Response (404):
{
  "statusCode": 404,
  "message": "Email is not found"
}

Response (401):
{
  "statusCode": 401,
  "message": "Incorrect Password"
}
```

### Send OTP (Optional)

```
POST /customer/auth/signupOtp

Request Body:
{
  "email": "john@example.com",
  "type": "signup"  // or "password_reset"
}

Response (200):
{
  "success": true,
  "data": null,
  "message": "Email sent successfully.",
  "statusCode": 200
}
```

### Verify OTP (Optional)

```
POST /customer/auth/authOtp

Request Body:
{
  "email": "john@example.com",
  "otp": "123456",
  "type": "signup"
}

Response (200):
{
  "success": true,
  "data": null,
  "message": "OTP verified successfully.",
  "statusCode": 200
}
```

### Forgot Password

```
PUT /customer/auth/fotgetPassword  // Note: typo in backend route

Request Body:
{
  "email": "john@example.com",
  "password": "NewPassword123"
}

Response (200):
{
  "success": true,
  "data": null,
  "message": "Password reset successfully.",
  "statusCode": 200
}

Response (404):
{
  "statusCode": 404,
  "message": "Customer not found"
}
```

---

## Frontend Integration

### Signup in Component

```javascript
import { useAuthStore } from "@/store/authStore";
import axiosInstance from "@/utils/axiosInstance";

const { login } = useAuthStore();

const handleSignup = async (formData) => {
  try {
    const res = await axiosInstance.post("/customer/auth/signup", formData);

    if (res.success && res.data) {
      login(res.data, res.data._id);
      // User is now authenticated
    }
  } catch (error) {
    console.error("Signup failed:", error);
  }
};
```

### Login in Component

```javascript
const handleLogin = async (credentials) => {
  try {
    const res = await axiosInstance.post("/customer/auth/login", credentials);

    if (res.success && res.data) {
      login(res.data, res.data._id);
      // User is now authenticated
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

### Check Authentication

```javascript
const { user, isAuthenticated } = useAuthStore();

if (isAuthenticated && user) {
  console.log("User is logged in:", user.firstName);
} else {
  console.log("User is not authenticated");
}
```

### Logout

```javascript
const { logout } = useAuthStore();

const handleLogout = () => {
  logout();
  // User is now logged out
};
```

### Protect Routes

```javascript
<Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
  <Route path="/profile" element={<Customerprofile />} />
  <Route path="/order-history" element={<Orderhistorypage />} />
</Route>
```

---

## Database Schema

### Customer Model (MongoDB)

```javascript
{
  _id: ObjectId,
  firstName: {
    type: String,
    required: true
  },
  middleName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  otp: String,
  otpExpires: Date,
  securityKeyId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Validation Rules

### Email

- Must be valid email format
- Must be unique in database
- Examples: ✅ `john@example.com`, ❌ `invalid-email`

### Password

- Minimum 8 characters
- Must contain at least one letter (A-Z, a-z)
- Must contain at least one number (0-9)
- Special characters allowed but not required
- Examples:
  - ✅ `Test12345`
  - ✅ `Abc@123$`
  - ❌ `TestTest` (no numbers)
  - ❌ `12345678` (no letters)
  - ❌ `Test123` (only 7 chars)

### First Name

- Minimum 2 characters
- Maximum N/A (should be reasonable, e.g., 50)
- Can contain letters, spaces, hyphens
- Examples: ✅ `John`, ✅ `Mary-Jane`, ❌ `A` (too short)

### Last Name

- Optional
- Minimum 2 characters if provided
- Same character rules as First Name

---

## HTTP Status Codes

| Code | Meaning      | Common Causes                                   |
| ---- | ------------ | ----------------------------------------------- |
| 200  | Success      | Valid request, user created/authenticated       |
| 400  | Bad Request  | Missing fields, invalid format, duplicate email |
| 401  | Unauthorized | Wrong password                                  |
| 404  | Not Found    | Email doesn't exist in database                 |
| 500  | Server Error | Database error, server crash                    |

---

## Common Headers

### Request Headers (Auto-added by Axios)

```
Content-Type: application/json
Accept: application/json
```

### Response Headers (from backend)

```
Content-Type: application/json; charset=utf-8
Set-Cookie: jwt_token=...; HttpOnly; Secure; SameSite=Strict
```

---

## Frontend Environment Setup

### .env.local

```
# Backend API URL
VITE_API_URL=http://localhost:8000/api/v1/indiafy

# Optional: Debugging
VITE_DEBUG=true
```

### Accessing Environment Variables in Code

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Debugging Commands

### Test Signup (curl)

```bash
curl -X POST http://localhost:8000/api/v1/indiafy/customer/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Test12345"
  }'
```

### Test Login (curl)

```bash
curl -X POST http://localhost:8000/api/v1/indiafy/customer/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Test12345"
  }'
```

### Check API Health

```bash
curl http://localhost:8000/api/v1/indiafy/health
# Should return some response (error is okay, means server is running)
```

---

## JavaScript Console Examples

### Check Auth Store

```javascript
// In browser console:
const store = useAuthStore.getState();
console.log(store);
// Output: { user: {...}, token: null, isAuthenticated: true }
```

### Manually Make API Call

```javascript
const response = await fetch(
  "http://localhost:8000/api/v1/indiafy/customer/auth/login",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Important: includes cookies
    body: JSON.stringify({
      email: "john@example.com",
      password: "Test12345",
    }),
  },
);

const data = await response.json();
console.log(data);
```

### Check localStorage

```javascript
// In browser console:
const auth = JSON.parse(localStorage.getItem("indiafy-auth-storage"));
console.log(auth);
```

### Check Cookies

```javascript
// In browser console:
console.log(document.cookie);
```

---

## Common Issues & Solutions

| Problem                    | Solution                       | Code                                        |
| -------------------------- | ------------------------------ | ------------------------------------------- |
| "Cannot find user"         | Check email exists in DB       | See curl examples                           |
| "Invalid credentials"      | Verify password matches        | Check DB directly                           |
| "Email already exists"     | Use unique email               | Change email in form                        |
| "CORS error"               | Backend may not be running     | Start backend: `npm start`                  |
| "API URL not found"        | Check VITE_API_URL env var     | `console.log(import.meta.env.VITE_API_URL)` |
| "Token not storing"        | Check withCredentials in axios | See axiosInstance.js                        |
| "Role-based routing fails" | Check role is lowercase        | Check auth store normalization              |

---

## Useful Links

- **Zod Docs:** https://zod.dev/
- **Zustand Docs:** https://github.com/pmndrs/zustand
- **React Hook Form:** https://react-hook-form.com/
- **Axios Docs:** https://axios-http.com/
- **Express.js Docs:** https://expressjs.com/
- **MongoDB Docs:** https://docs.mongodb.com/

---

## Quick Reference for Developers

### Add New Auth Field

1. Update MongoDB schema
2. Add to Zod validation
3. Update form input
4. Add to API request body
5. Update response handling

### Change Password Requirements

**File:** `/backend/controllers/customers/auth.controllers.js`

```javascript
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
```

Edit regex to change rules.

### Modify Response Format

**File:** `/backend/utils/apiResponse.js`

```javascript
// See how ApiResponse structures data
// Must match frontend parsing
```

### Add Middleware

**File:** `/backend/routers/customer/auth.route.js`

```javascript
router.route("/login").post(
  loginValidation, // validation
  validateResult, // check errors
  customer, // add custom middleware here
  Login, // controller
);
```

---

**Last Updated:** April 28, 2024
**API Version:** 1.0
**Auth Method:** JWT (httpOnly Cookies)
