# NewtonBotics Frontend Authentication System

This document provides a comprehensive guide to the authentication system implementation for the NewtonBotics Frontend application.

## 🚀 Features Implemented

### Core Authentication
- ✅ User Registration with role-based fields
- ✅ User Login with JWT tokens
- ✅ User Logout
- ✅ Password Reset (Forgot Password + Reset Password)
- ✅ Email Verification
- ✅ Token Refresh
- ✅ Protected Routes
- ✅ Role-based Access Control
- ✅ Permission-based Access Control

### User Management
- ✅ Profile Management
- ✅ Password Change
- ✅ User Settings
- ✅ Role-specific Fields (Student, Team Member, Mentor, Researcher, Community)

### Security Features
- ✅ JWT Token Management
- ✅ Automatic Token Refresh
- ✅ Secure Password Requirements
- ✅ Input Validation
- ✅ Protected API Endpoints

## 📁 File Structure

```
src/
├── lib/
│   └── auth.js                 # Authentication service
├── contexts/
│   └── AuthContext.jsx         # React context for auth state
├── components/
│   └── ProtectedRoute.jsx      # Route protection component
└── app/
    ├── auth/
    │   ├── page.jsx            # Main auth page (login/register)
    │   ├── forgot/
    │   │   └── page.jsx        # Forgot password page
    │   └── reset/
    │       └── page.jsx        # Reset password page
    ├── ProfileCompletion/
    │   └── page.jsx            # Profile management page
    ├── components/
    │   └── navbar.jsx          # Updated navbar with auth
    └── layout.js               # Root layout with AuthProvider
```

## 🛠️ Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in your project root:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3005/api

# Authentication Configuration
NEXT_PUBLIC_AUTH_ENABLED=true

# Development Configuration
NODE_ENV=development
```

### 2. Backend API Requirements

Ensure your backend implements these authentication endpoints:

#### Base URL: `http://localhost:3000/api/auth`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/register` | POST | User registration |
| `/login` | POST | User login |
| `/logout` | POST | User logout |
| `/refresh` | POST | Token refresh |
| `/forgot-password` | POST | Request password reset |
| `/reset-password` | POST | Reset password |
| `/verify-email/:token` | GET | Email verification |
| `/me` | GET | Get current user profile |
| `/me` | PUT | Update user profile |
| `/change-password` | POST | Change password |

### 3. API Response Format

All API responses should follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### 4. User Registration Data Structure

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student",
  "studentId": "STU001",
  "department": "Computer Science",
  "yearOfStudy": 2,
  "phone": "+1234567890"
}
```

### 5. Password Requirements

- Minimum 8 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain number
- Must contain special character

## 🔐 Authentication Flow

### 1. User Registration
1. User fills out registration form
2. Form validation (client-side)
3. API call to `/register`
4. JWT tokens received and stored
5. User redirected to dashboard

### 2. User Login
1. User enters credentials
2. API call to `/login`
3. JWT tokens received and stored
4. User redirected to dashboard

### 3. Token Management
- Access tokens stored in localStorage
- Automatic token refresh before expiration
- Automatic logout on authentication failure

### 4. Protected Routes
- Routes wrapped with `ProtectedRoute` component
- Automatic redirect to login if not authenticated
- Role and permission-based access control

## 🎯 Usage Examples

### Using Authentication Context

```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      {hasRole('student') && <StudentDashboard />}
      {hasRole('mentor') && <MentorDashboard />}
    </div>
  );
}
```

### Protecting Routes

```jsx
import ProtectedRoute from '../components/ProtectedRoute';

function AdminPage() {
  return (
    <ProtectedRoute requiredRole="mentor">
      <div>Admin content here</div>
    </ProtectedRoute>
  );
}
```

### Making Authenticated API Calls

```jsx
import authService from '../lib/auth';

// The service automatically handles authentication headers
const response = await authService.getCurrentUserProfile();
```

## 🔒 Security Considerations

### 1. Token Storage
- Tokens stored in localStorage (consider httpOnly cookies for production)
- Automatic cleanup on logout
- Token expiration handling

### 2. Input Validation
- Client-side validation for immediate feedback
- Server-side validation for security
- XSS protection through proper escaping

### 3. Rate Limiting
- Implement rate limiting on authentication endpoints
- Consider CAPTCHA for repeated failed attempts

### 4. HTTPS
- Use HTTPS in production
- Secure cookie flags
- HSTS headers

## 🧪 Testing

### 1. Test User Accounts
Create test accounts with different roles:
- Student: `student@test.com`
- Mentor: `mentor@test.com`
- Researcher: `researcher@test.com`

### 2. Test Scenarios
- Registration with valid/invalid data
- Login with correct/incorrect credentials
- Password reset flow
- Token expiration and refresh
- Role-based access control
- Protected route access

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend allows requests from frontend domain
   - Check CORS configuration

2. **Token Issues**
   - Verify token format and expiration
   - Check localStorage for token storage

3. **API Connection**
   - Verify `NEXT_PUBLIC_API_URL` environment variable
   - Check backend server status

4. **Authentication State**
   - Clear localStorage and refresh page
   - Check browser console for errors

### Debug Mode

Enable debug logging in the auth service:

```javascript
// In src/lib/auth.js
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('Auth operation:', operation, data);
}
```

## 📚 Additional Resources

- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [React Context API](https://react.dev/reference/react/createContext)
- [Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)

## 🤝 Contributing

When adding new authentication features:

1. Update this documentation
2. Add proper error handling
3. Include loading states
4. Add appropriate tests
5. Follow security best practices

## 📞 Support

For authentication-related issues:
1. Check this documentation
2. Review browser console errors
3. Verify API endpoint responses
4. Check environment configuration

---

**Note**: This authentication system is designed for development and can be enhanced for production use with additional security measures like 2FA, session management, and audit logging.
