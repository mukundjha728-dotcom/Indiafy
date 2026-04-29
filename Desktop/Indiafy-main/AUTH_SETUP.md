# Indiafy Auth System - Setup & Testing Guide

## ✅ What Was Fixed

### Frontend Changes

1. **Signup Form** - Now correctly sends `firstName`, `lastName`, `email`, `password` to backend
2. **Login Page** - Created separate login page at `/login` route
3. **Auth Store** - Normalized user role to lowercase for proper routing
4. **Axios Instance** - Improved response handling
5. **Protected Routes** - Fixed redirect logic and role validation

### Backend (Already Working)

- Signup endpoint validates password (8+ chars, letters + numbers)
- Login endpoint validates credentials
- JWT tokens stored in httpOnly cookies
- User data returned in response

## 🚀 How to Test

### 1. Start Backend

```bash
cd backend
npm start
# Should run on http://localhost:8000
```

### 2. Start Frontend

```bash
cd frontend
npm run dev
# Should run on http://localhost:5173 or similar
```

### 3. Test Signup

- Navigate to: `http://localhost:5173/signup`
- Fill in form:
  - First Name: e.g., "John"
  - Last Name: e.g., "Doe" (optional)
  - Email: e.g., "john@example.com"
  - Password: e.g., "Test12345" (must have letter + number, 8+ chars)
- Click "Create Account"
- ✅ Should see success toast and redirect to home

### 4. Test Login

- Navigate to: `http://localhost:5173/login`
- Enter email and password from signup
- Click "Sign In"
- ✅ Should see success toast and redirect to home

### 5. Test Protected Route

- Navigate to: `http://localhost:5173/profile`
- ✅ If logged in, should show profile page
- ❌ If not logged in, should redirect to login

## 🔧 Environment Variables

### Frontend (.env.local or .env)

```
VITE_API_URL=http://localhost:8000/api/v1/indiafy
```

### Backend (.env)

Make sure these are set:

```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
```

## 📊 User Flow

### Signup

1. User fills form with firstName, lastName, email, password
2. Frontend validates with Zod schema
3. POST to `/customer/auth/signup`
4. Backend validates, hashes password, saves to DB
5. Backend returns user data and sets httpOnly JWT cookie
6. Frontend stores user in Zustand store
7. Redirect to home page

### Login

1. User enters email & password
2. POST to `/customer/auth/login`
3. Backend finds user, verifies password
4. Returns user data with JWT cookie
5. Frontend stores user in Zustand store
6. Redirect to home page

### Protected Pages

- Check `useAuthStore` for `isAuthenticated` and `user.role`
- Wrap routes with `<ProtectedRoute allowedRoles={['customer']} />`
- Auto-redirects to `/login` if not authenticated

## 🐛 Troubleshooting

### Issue: "Cannot POST /customer/auth/signup"

- Make sure backend is running on port 8000
- Check `VITE_API_URL` in frontend environment

### Issue: "Email already exists"

- Email must be unique in database
- Use a different email for testing

### Issue: "Password must contain letters and numbers"

- Password needs at least one letter AND one number
- Example: ✅ "Test12345" ❌ "test12345" (no uppercase, but ok), ❌ "TestTest" (no numbers)

### Issue: "Login succeeded but redirects to login page"

- Check browser console for errors
- Verify JWT cookie is being set (DevTools > Application > Cookies)
- Check that user role is "customer" (should be auto-normalized)

### Issue: "Form shows validation errors but data looks correct"

- Zod validation requirements:
  - First Name: min 2 characters
  - Email: valid email format
  - Password: min 8 characters + letters + numbers

## 📱 Roles & Routing

| Role     | Redirect On Auth  | Protected Routes                                             |
| -------- | ----------------- | ------------------------------------------------------------ |
| customer | home (/)          | /profile, /addresses, /order-history, /track-order, /support |
| seller   | /seller/dashboard | /seller/\*                                                   |
| admin    | /admin/dashboard  | /admin/\*                                                    |

## 💾 Local Storage

Zustand stores auth data in localStorage under key: `indiafy-auth-storage`

```javascript
{
  state: {
    user: { _id, firstName, lastName, email, role: "customer", ... },
    token: null,
    isAuthenticated: true
  },
  version: 0
}
```

## 🔐 Security Notes

- Passwords are hashed using bcrypt on backend
- JWT tokens stored in httpOnly cookies (cannot access via JS)
- CORS enabled for frontend domain
- Credentials sent with requests via withCredentials: true
