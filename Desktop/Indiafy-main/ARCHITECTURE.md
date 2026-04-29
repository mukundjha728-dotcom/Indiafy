# 🎯 Authentication System - Visual Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     INDIAFY AUTHENTICATION SYSTEM               │
└─────────────────────────────────────────────────────────────────┘

┌─── FRONTEND (React + Zustand) ───────────────────────────────────┐
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           USER SIGNUP PAGE (/signup)                    │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │  firstName: [_____________]                      │  │   │
│  │  │  lastName:  [_____________]                      │  │   │
│  │  │  email:     [_____________]                      │  │   │
│  │  │  password:  [_____________] [show/hide]          │  │   │
│  │  │  [Create Account Button]                         │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │                      ↓                                  │   │
│  │  Zod Validation (client-side)                         │   │
│  │  ✓ firstName: min 2 chars                            │   │
│  │  ✓ email: valid format                               │   │
│  │  ✓ password: 8+ chars, letters + numbers             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                      ↓                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           USER LOGIN PAGE (/login)                      │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │  email:     [_____________]                      │  │   │
│  │  │  password:  [_____________] [show/hide]          │  │   │
│  │  │  [Sign In Button]                                │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │                      ↓                                  │   │
│  │  Zod Validation (client-side)                         │   │
│  │  ✓ email: valid format                               │   │
│  │  ✓ password: non-empty                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                      ↓                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              AXIOS INSTANCE                            │   │
│  │  POST /customer/auth/signup                           │   │
│  │  POST /customer/auth/login                            │   │
│  │  Headers: Content-Type: application/json              │   │
│  │  Credentials: true (sends cookies)                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                      ↓                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              ZUSTAND AUTH STORE                        │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ user: {                                          │  │   │
│  │  │   _id: "...",                                   │  │   │
│  │  │   firstName: "John",                            │  │   │
│  │  │   lastName: "Doe",                              │  │   │
│  │  │   email: "john@example.com",                    │  │   │
│  │  │   role: "customer" (normalized to lowercase)    │  │   │
│  │  │ }                                                │  │   │
│  │  │ token: "user_id_or_null"                         │  │   │
│  │  │ isAuthenticated: true/false                      │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │  Persisted to: localStorage                           │   │
│  │  Key: "indiafy-auth-storage"                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                      ↓                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         NAVBAR COMPONENT                              │   │
│  │                                                        │   │
│  │  NOT AUTHENTICATED:              AUTHENTICATED:       │   │
│  │  ┌────────────────┐             ┌──────────┐         │   │
│  │  │ [Login] [Join] │             │ [J ▼] ← │         │   │
│  │  └────────────────┘             └──────────┘         │   │
│  │                                    ↓                  │   │
│  │                            ┌───────────────────┐     │   │
│  │                            │ My Profile        │     │   │
│  │                            │ Orders            │     │   │
│  │                            │ Addresses         │     │   │
│  │                            │ ───────────────── │     │   │
│  │                            │ Logout (RED)      │     │   │
│  │                            └───────────────────┘     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                      ↓                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         PROTECTED ROUTES                               │   │
│  │  <ProtectedRoute allowedRoles={['customer']}>          │   │
│  │    <Route path="/profile" element={<Profile />} />    │   │
│  │    <Route path="/orders" element={<Orders />} />      │   │
│  │  </ProtectedRoute>                                     │   │
│  │                                                        │   │
│  │  Check:                                                │   │
│  │  ✓ isAuthenticated === true?                          │   │
│  │  ✓ user exists?                                        │   │
│  │  ✓ user.role in allowedRoles?                         │   │
│  │  If NO → Redirect to /login                           │   │
│  │  If YES → Show page                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─── END FRONTEND ────────────────────────────────────────────────┘

                              ↓
                    (HTTP POST Request)

                              ↓

┌─── BACKEND (Express + MongoDB) ───────────────────────────────┐
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  SIGNUP ROUTE: POST /customer/auth/signup             │    │
│  │                                                       │    │
│  │  Receive:                                            │    │
│  │  {                                                    │    │
│  │    firstName: "John",                                │    │
│  │    lastName: "Doe",                                  │    │
│  │    email: "john@example.com",                        │    │
│  │    password: "Test12345"                             │    │
│  │  }                                                    │    │
│  └───────────────────────────────────────────────────────┘    │
│                      ↓                                         │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  SERVER-SIDE VALIDATION                              │    │
│  │  ✓ All required fields present                        │    │
│  │  ✓ Password regex: 8+ chars, letters + numbers       │    │
│  │  ✓ Email format valid                                │    │
│  │  ✓ Email not already in DB                           │    │
│  └───────────────────────────────────────────────────────┘    │
│                      ↓                                         │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  MONGODB OPERATION                                    │    │
│  │                                                       │    │
│  │  1. Hash password with bcrypt                        │    │
│  │  2. Create new user document                         │    │
│  │  3. Save to customers collection                     │    │
│  │                                                       │    │
│  │  DB Schema:                                           │    │
│  │  {                                                    │    │
│  │    _id: ObjectId,                                    │    │
│  │    firstName: "John",                                │    │
│  │    lastName: "Doe",                                  │    │
│  │    email: "john@example.com",                        │    │
│  │    password: "$2b$10$hashed...", ← bcrypt hash       │    │
│  │    role: "Customer",                                 │    │
│  │    createdAt: Date,                                  │    │
│  │    updatedAt: Date                                   │    │
│  │  }                                                    │    │
│  └───────────────────────────────────────────────────────┘    │
│                      ↓                                         │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  LOGIN ROUTE: POST /customer/auth/login               │    │
│  │                                                       │    │
│  │  1. Find user by email                               │    │
│  │  2. Compare password with bcrypt                     │    │
│  │  3. If match → generate JWT token                    │    │
│  │  4. Set httpOnly cookie with JWT                     │    │
│  │  5. Return user data (no password)                   │    │
│  └───────────────────────────────────────────────────────┘    │
│                      ↓                                         │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  JWT TOKEN & COOKIES                                 │    │
│  │                                                       │    │
│  │  Set-Cookie: jwt_token=eyJhbGc...; HttpOnly; Secure │    │
│  │                                                       │    │
│  │  Token contains: { userId, email, role, iat, exp }  │    │
│  │  Expires: 7 days (configured in backend)            │    │
│  │  HttpOnly: Cannot access via JavaScript              │    │
│  │  Secure: Only sent over HTTPS                        │    │
│  │  SameSite: Strict (CSRF protection)                  │    │
│  └───────────────────────────────────────────────────────┘    │
│                      ↓                                         │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  RESPONSE (for both signup & login)                  │    │
│  │                                                       │    │
│  │  HTTP 200:                                            │    │
│  │  {                                                    │    │
│  │    success: true,                                    │    │
│  │    data: {                                            │    │
│  │      _id: "507f1f77bcf86cd799439011",               │    │
│  │      firstName: "John",                              │    │
│  │      lastName: "Doe",                                │    │
│  │      email: "john@example.com",                      │    │
│  │      role: "Customer"                                │    │
│  │    },                                                 │    │
│  │    message: "Registration Successful"                │    │
│  │  }                                                    │    │
│  │                                                       │    │
│  │  Errors:                                              │    │
│  │  HTTP 400: Missing fields, invalid password          │    │
│  │  HTTP 401: Incorrect password                        │    │
│  │  HTTP 404: Email not found                           │    │
│  │  HTTP 500: Database error                            │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                                 │
└─── END BACKEND ──────────────────────────────────────────────┘

                              ↓
                  (HTTP Response + Cookie)

                              ↓

┌─────────────────────────────────────────────────────────────────┐
│  BROWSER RECEIVES RESPONSE & SETS COOKIE                       │
│                                                                 │
│  Response Body:                    Browser Storage:            │
│  ┌──────────────────────┐         ┌────────────────────┐      │
│  │ success: true        │   →     │ localStorage:      │      │
│  │ data: { user obj }   │         │ indiafy-auth-...   │      │
│  │ message: "Success"   │   →     │                    │      │
│  └──────────────────────┘         │ Cookies:           │      │
│                                    │ jwt_token=...      │      │
│                                    │ (httpOnly)         │      │
│                                    └────────────────────┘      │
│                                                                 │
│  Frontend Updates:                                              │
│  1. Parse response.data                                         │
│  2. Call authStore.login(userData, userId)                    │
│  3. Zustand updates store + persists to localStorage           │
│  4. Show success toast                                          │
│  5. Redirect to home page                                       │
│  6. Future requests automatically include JWT cookie           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Timeline

```
TIME 0:00 ┌─ User lands on /signup page
          │
TIME 0:05 ├─ User fills form (firstName, lastName, email, password)
          │
TIME 0:10 ├─ User clicks "Create Account"
          │
TIME 0:11 ├─ Frontend validates with Zod
          │  ├─ firstName >= 2 chars ✓
          │  ├─ email format ✓
          │  └─ password regex match ✓
          │
TIME 0:12 ├─ AXIOS POST /customer/auth/signup
          │  └─ Sends JSON body + cookies
          │
TIME 0:20 ├─ BACKEND receives request
          │  ├─ Validates on server ✓
          │  ├─ Hashes password
          │  ├─ Saves to MongoDB
          │  ├─ Generates JWT
          │  └─ Sets HttpOnly cookie
          │
TIME 0:25 ├─ BROWSER receives response (200 OK)
          │  ├─ Body: user data
          │  └─ Header: Set-Cookie (JWT)
          │
TIME 0:26 ├─ Frontend processes response
          │  ├─ authStore.login(userData)
          │  ├─ localStorage updated
          │  └─ Shows success toast
          │
TIME 0:30 └─ Redirect to home page
             └─ User is now authenticated!
```

---

## Component Interaction Diagram

```
                    ┌──────────────────┐
                    │   App.jsx        │
                    │  (Route Config)  │
                    └────────┬─────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
      ┌────▼──────┐     ┌────▼──────┐    ┌───▼──────┐
      │  Signup   │     │   Login   │    │ Protected│
      │   Page    │     │   Page    │    │  Route   │
      └────┬──────┘     └────┬──────┘    └───┬──────┘
           │                 │                │
           └─────────────────┼────────────────┘
                             │
                    ┌────────▼────────┐
                    │  WebsiteLayout  │
                    │   + Navbar      │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  WebsiteNavbar  │
                    │ (Auth dropdown) │
                    └────────┬────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
      ┌────▼──────┐     ┌────▼──────┐    ┌───▼──────┐
      │ useAuth   │     │ useAuth   │    │ useAuth  │
      │  Store    │     │  Store    │    │  Store   │
      │           │     │           │    │          │
      │ login()   │     │ logout()  │    │ user obj │
      └────┬──────┘     └────┬──────┘    └───┬──────┘
           │                 │                │
           └─────────────────┼────────────────┘
                             │
                    ┌────────▼────────┐
                    │  localStorage   │
                    │ indiafy-auth... │
                    └─────────────────┘
```

---

## Security Flow

```
PASSWORD FLOW:
┌─────────────────────┐
│ User enters password│  (plain text in browser memory)
└──────────┬──────────┘
           │
           ▼
┌──────────────────────────┐
│ HTTPS Encryption         │  (encrypted during transit)
│ (sent over wire)         │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Backend receives         │  (plain text in request)
│ & compares with bcrypt   │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ NEVER stored plain text  │  (only hash stored in DB)
│ $2b$10$hashed...         │
└──────────────────────────┘

JWT TOKEN FLOW:
┌─────────────────────┐
│ Backend generates   │
│ JWT token           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────┐
│ Set-Cookie with:                │
│ - HttpOnly ✓                    │  (cannot access from JS)
│ - Secure ✓                      │  (HTTPS only)
│ - SameSite=Strict ✓             │  (CSRF protection)
└──────────┬──────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Browser stores cookie            │
│ Auto-sent with every request     │
└──────────────────────────────────┘
```

---

## Error Handling Flow

```
USER INPUT ERROR
│
└─ Zod validates locally (frontend)
   ├─ If invalid → Show field error
   └─ If valid → Send to server

SERVER VALIDATION ERROR
│
└─ Backend validates
   ├─ If invalid → Return 400 + error message
   └─ If valid → Process user

DATABASE ERROR
│
└─ MongoDB fails
   ├─ If duplicate email → Return 400
   ├─ If connection error → Return 500
   └─ Show user-friendly error toast

AUTHENTICATION ERROR
│
└─ User tries protected route
   ├─ If not authenticated → Redirect /login
   └─ If role mismatch → Redirect /home
```

---

This architecture ensures a secure, scalable, and user-friendly authentication system! 🚀
