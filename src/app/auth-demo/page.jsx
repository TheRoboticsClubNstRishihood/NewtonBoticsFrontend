"use client";

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, Shield, Key, LogOut, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AnimatePresence } from 'framer-motion';

export default function AuthDemoPage() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    register, 
    logout, 
    hasRole, 
    hasPermission,
    clearError 
  } = useAuth();

  const [demoCredentials] = useState({
    email: 'demo@newtonbotics.com',
    password: 'DemoPass123!'
  });

  const [testData, setTestData] = useState({
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@newtonbotics.com',
    password: 'DemoPass123!',
    confirmPassword: 'DemoPass123!',
    role: 'student',
    studentId: 'DEMO001',
    department: 'Computer Science',
    yearOfStudy: '2'
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [actionResult, setActionResult] = useState(null);

  const handleDemoLogin = async () => {
    setActionResult(null);
    try {
      const result = await login(demoCredentials);
      if (result.success) {
        setActionResult({ type: 'success', message: 'Demo login successful!' });
      } else {
        setActionResult({ type: 'error', message: result.error });
      }
    } catch (error) {
      setActionResult({ type: 'error', message: error.message });
    }
  };

  const handleDemoRegister = async () => {
    setActionResult(null);
    try {
      const result = await register(testData);
      if (result.success) {
        setActionResult({ type: 'success', message: 'Demo registration successful!' });
      } else {
        setActionResult({ type: 'error', message: result.error });
      }
    } catch (error) {
      setActionResult({ type: 'error', message: error.message });
    }
  };

  const handleDemoLogout = async () => {
    setActionResult(null);
    try {
      await logout();
      setActionResult({ type: 'success', message: 'Demo logout successful!' });
    } catch (error) {
      setActionResult({ type: 'error', message: error.message });
    }
  };

  const clearActionResult = () => {
    setActionResult(null);
    clearError();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070b12] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Initializing authentication..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b12] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Authentication System Demo
          </h1>
          <p className="text-white/70 text-lg">
            Test and explore the NewtonBotics authentication system
          </p>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Authentication Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
                </div>
                {user && (
                  <>
                    <div>User: {user.firstName} {user.lastName}</div>
                    <div>Email: {user.email}</div>
                    <div>Role: {user.role}</div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Permissions & Roles
              </h3>
              <div className="space-y-2">
                <div>Student Role: {hasRole('student') ? '✅' : '❌'}</div>
                <div>Mentor Role: {hasRole('mentor') ? '✅' : '❌'}</div>
                <div>Researcher Role: {hasRole('researcher') ? '✅' : '❌'}</div>
                <div>Admin Access: {hasPermission('admin:access') ? '✅' : '❌'}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Results */}
        {actionResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-6 p-4 rounded-xl border ${
              actionResult.type === 'success' 
                ? 'bg-green-500/20 border-green-500/30' 
                : 'bg-red-500/20 border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              {actionResult.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
              <span className={actionResult.type === 'success' ? 'text-green-300' : 'text-red-300'}>
                {actionResult.message}
              </span>
              <button
                onClick={clearActionResult}
                className="ml-auto text-white/60 hover:text-white transition"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300">{error}</span>
              <button
                onClick={clearActionResult}
                className="ml-auto text-white/60 hover:text-white transition"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/5 rounded-xl p-1 mb-6">
          {['overview', 'actions', 'testing'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab 
                  ? 'bg-white/15 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                  <h3 className="text-lg font-semibold mb-4">Features Implemented</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>✅ User Registration & Login</li>
                    <li>✅ JWT Token Management</li>
                    <li>✅ Password Reset Flow</li>
                    <li>✅ Role-based Access Control</li>
                    <li>✅ Protected Routes</li>
                    <li>✅ Profile Management</li>
                    <li>✅ Automatic Token Refresh</li>
                    <li>✅ Error Handling</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                  <h3 className="text-lg font-semibold mb-4">Security Features</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>✅ Password Complexity Requirements</li>
                    <li>✅ Input Validation</li>
                    <li>✅ Secure Token Storage</li>
                    <li>✅ CORS Protection</li>
                    <li>✅ Rate Limiting Ready</li>
                    <li>✅ XSS Protection</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'actions' && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                  <h3 className="text-lg font-semibold mb-4">Demo Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={handleDemoLogin}
                      disabled={isAuthenticated}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition"
                    >
                      Demo Login
                    </button>
                    <button
                      onClick={handleDemoRegister}
                      disabled={isAuthenticated}
                      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed rounded-lg transition"
                    >
                      Demo Register
                    </button>
                    <button
                      onClick={handleDemoLogout}
                      disabled={!isAuthenticated}
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed rounded-lg transition"
                    >
                      Demo Logout
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                  <h3 className="text-lg font-semibold mb-4">Current State</h3>
                  <div className="space-y-2 text-sm">
                    <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
                    <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
                    <div>User ID: {user?.id || 'None'}</div>
                    <div>Role: {user?.role || 'None'}</div>
                    <div>Email Verified: {user?.emailVerified ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'testing' && (
            <motion.div
              key="testing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4">Testing Instructions</h3>
                <div className="space-y-4 text-white/80">
                  <div>
                    <h4 className="font-medium text-white mb-2">1. Test Registration</h4>
                    <p>Use the demo registration button to create a test account. This will test the full registration flow.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">2. Test Login</h4>
                    <p>Use the demo login button to authenticate with the test credentials.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">3. Test Protected Routes</h4>
                    <p>Navigate to other pages to see how the authentication system protects routes.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">4. Test Logout</h4>
                    <p>Use the logout button to test the logout functionality and route protection.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4">API Endpoints to Test</h3>
                <div className="space-y-2 text-sm font-mono text-white/80">
                  <div>POST /api/auth/register</div>
                  <div>POST /api/auth/login</div>
                  <div>POST /api/auth/logout</div>
                  <div>POST /api/auth/refresh</div>
                  <div>GET /api/auth/me</div>
                  <div>POST /api/auth/forgot-password</div>
                  <div>POST /api/auth/reset-password</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-white/50"
        >
          <p>This is a demonstration of the NewtonBotics authentication system.</p>
          <p className="text-sm mt-2">Check the browser console for detailed logs and the Network tab for API calls.</p>
        </motion.div>
      </div>
    </div>
  );
}
