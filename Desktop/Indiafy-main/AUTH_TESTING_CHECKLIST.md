# ✅ Auth System Testing Checklist

## Pre-Setup

- [ ] Backend running on `http://localhost:8000`
- [ ] Frontend running on `http://localhost:5173` (or your configured port)
- [ ] Check `.env` files exist and are properly configured
- [ ] Database connection verified

## Test Case 1: Signup Flow

**Steps:**

1. Navigate to `http://localhost:5173/signup`
2. Fill the form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@example.com` (use unique email each time)
   - Password: `Test@12345`
3. Click "Create Account" button

**Expected Results:**

- [ ] Form validates without errors
- [ ] "Account created successfully!" toast appears
- [ ] User redirected to home page
- [ ] Navbar shows user initials (J) instead of Login button
- [ ] Browser localStorage contains `indiafy-auth-storage` key
- [ ] Browser cookies show JWT token (if httpOnly, won't see value)

## Test Case 2: Login Flow

**Steps:**

1. Navigate to `http://localhost:5173/login`
2. Enter credentials from Test Case 1:
   - Email: `john@example.com`
   - Password: `Test@12345`
3. Click "Sign In" button

**Expected Results:**

- [ ] Form validates
- [ ] "Welcome back to Indiafy!" toast appears
- [ ] User redirected to home page
- [ ] User profile shows in navbar
- [ ] Can click avatar to see dropdown menu

## Test Case 3: Form Validation

**Test signup validation:**

1. **Empty Fields:**
   - [ ] Submit with empty form → show validation errors

2. **Invalid Email:**
   - [ ] Try `invalidemail` → error: "Invalid email format"
   - [ ] Try `test@` → error: "Invalid email format"

3. **Short Password:**
   - [ ] Try `test12` → error: "Password must be at least 8 characters"

4. **Password Without Numbers:**
   - [ ] Try `TestPassword` → error: "Password must contain letters and numbers"

5. **Password Without Letters:**
   - [ ] Try `12345678` → error: "Password must contain letters and numbers"

6. **Short First Name:**
   - [ ] Try single character → error: "First name must be at least 2 characters"

## Test Case 4: Duplicate Email

**Steps:**

1. Signup with `test@email.com`
2. Try to signup again with same email

**Expected Result:**

- [ ] Error toast: "Email already exists" or similar backend error

## Test Case 5: Protected Routes

**Steps:**

1. Logout (use navbar dropdown → Logout)
2. Try to access `http://localhost:5173/profile`

**Expected Result:**

- [ ] Redirected to `/login` page
- [ ] Cannot access profile without login

## Test Case 6: User Menu (Desktop)

**Steps:**

1. Login successfully
2. Click on avatar in navbar

**Expected Options:**

- [ ] My Profile (clickable)
- [ ] Orders (clickable)
- [ ] Addresses (clickable)
- [ ] Logout (clickable, red text)

## Test Case 7: Mobile Menu

**Steps:**

1. On mobile/small screen, login
2. Click hamburger menu

**Expected Results:**

- [ ] Shows "John Doe" or user name
- [ ] Shows Logout button
- [ ] No Login/Join buttons visible

## Test Case 8: Error Scenarios

**Test incorrect password:**

1. Navigate to login
2. Enter correct email + wrong password
3. Click "Sign In"

**Expected Result:**

- [ ] Error toast: "Incorrect Password"

**Test non-existent email:**

1. Navigate to login
2. Enter non-existent email + password
3. Click "Sign In"

**Expected Result:**

- [ ] Error toast: "Email is not found"

## Test Case 9: Token Persistence

**Steps:**

1. Login successfully
2. Refresh page (`F5`)

**Expected Results:**

- [ ] User stays logged in
- [ ] Profile still shows in navbar
- [ ] No re-login required

## Test Case 10: Cross-Tab Logout (Optional)

**Steps:**

1. Open same app in 2 browser tabs
2. Login on Tab A
3. Logout on Tab B
4. Switch back to Tab A

**Note:** May require additional localStorage sync implementation

## Browser DevTools Checks

### LocalStorage

```javascript
// Open DevTools > Application > Local Storage > localhost:5173
// Should contain key: "indiafy-auth-storage"
// Value should be JSON with user data
```

### Cookies

```javascript
// DevTools > Application > Cookies > localhost:5173
// Should contain JWT token (httpOnly means value not visible)
```

### Console

```javascript
// No errors or warnings related to auth
// No 404 errors for API calls
```

### Network Tab

```
// POST /customer/auth/signup → 200 OK
// POST /customer/auth/login → 200 OK
// Response contains user data in "data" field
```

## Debugging Tips

### If Login/Signup Not Working:

1. **Check Backend is Running:**

   ```bash
   curl http://localhost:8000/api/v1/indiafy/customer/auth/login
   # Should show error about missing body, not 404
   ```

2. **Check Network in DevTools:**
   - Open Network tab
   - Click Login button
   - Look for POST request to `/customer/auth/login`
   - Check Response tab for error details

3. **Check Frontend Logs:**
   - Open DevTools Console
   - Look for `console.error` messages
   - Check for network errors

4. **Verify Environment Variables:**
   - Frontend: `VITE_API_URL` should point to backend
   - Backend: Check DATABASE and JWT_SECRET are set

5. **Test Backend Directly:**
   ```bash
   curl -X POST http://localhost:8000/api/v1/indiafy/customer/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Test12345"}'
   ```

## Common Issues & Solutions

| Issue                                       | Solution                                               |
| ------------------------------------------- | ------------------------------------------------------ |
| "Cannot POST /customer/auth/login"          | Backend not running or wrong URL in env                |
| "Email already exists"                      | Use different email for test                           |
| "Password must contain letters and numbers" | Password needs at least 1 letter + 1 number            |
| "User redirects to login after signup"      | Check console for errors, verify response format       |
| Navbar shows Login button even after signup | Refresh page, check localStorage for auth data         |
| Dropdown menu doesn't appear                | Check z-index CSS, may be hidden behind other elements |

## Success Criteria ✅

All checks should be passing:

- [ ] Signup creates new users
- [ ] Login authenticates users
- [ ] Form validation works
- [ ] Protected routes redirect to login
- [ ] User profile persists on refresh
- [ ] Logout works correctly
- [ ] No console errors
- [ ] Network calls return 200 status
