"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null, requiredPermission = null }) => {
  const { isAuthenticated, isLoading, user, hasRole, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
      return;
    }

    // Check role requirement
    if (requiredRole && user && !hasRole(requiredRole)) {
      router.push('/DashBoard');
      return;
    }

    // Check permission requirement
    if (requiredPermission && user && !hasPermission(requiredPermission)) {
      router.push('/DashBoard');
      return;
    }
  }, [isAuthenticated, isLoading, user, requiredRole, requiredPermission, hasRole, hasPermission, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070b12] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Check role requirement
  if (requiredRole && !hasRole(requiredRole)) {
    return null;
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
