import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export const useAuthRedirect = (options = {}) => {
  const {
    requireAuth = false,
    redirectTo = '/auth',
    requireRole = null,
    requirePermission = null,
    onUnauthorized = null
  } = options;

  const { isAuthenticated, isLoading, user, hasRole, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait for auth to initialize

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      if (onUnauthorized) {
        onUnauthorized();
      } else {
        router.push(redirectTo);
      }
      return;
    }

    // If user is authenticated but shouldn't be (e.g., already on login page)
    if (!requireAuth && isAuthenticated) {
      router.push('/DashBoard');
      return;
    }

    // Check role requirement
    if (requireRole && user && !hasRole(requireRole)) {
      if (onUnauthorized) {
        onUnauthorized();
      } else {
        router.push('/DashBoard');
      }
      return;
    }

    // Check permission requirement
    if (requirePermission && user && !hasPermission(requirePermission)) {
      if (onUnauthorized) {
        onUnauthorized();
      } else {
        router.push('/DashBoard');
      }
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    user,
    requireAuth,
    redirectTo,
    requireRole,
    requirePermission,
    hasRole,
    hasPermission,
    onUnauthorized,
    router
  ]);

  return {
    isAuthenticated,
    isLoading,
    user,
    hasRole,
    hasPermission
  };
};

// Hook for public pages that should redirect authenticated users
export const usePublicRedirect = (redirectTo = '/DashBoard') => {
  return useAuthRedirect({
    requireAuth: false,
    redirectTo,
    onUnauthorized: () => router.push(redirectTo)
  });
};

// Hook for protected pages that require authentication
export const useProtectedRedirect = (options = {}) => {
  return useAuthRedirect({
    requireAuth: true,
    redirectTo: '/auth',
    ...options
  });
};

// Hook for admin pages that require specific roles
export const useAdminRedirect = (options = {}) => {
  return useAuthRedirect({
    requireAuth: true,
    redirectTo: '/auth',
    requireRole: 'mentor', // Default admin role
    ...options
  });
};
