import { useGlobalState, Role } from '../../context/useGlobalState'

// Function to handle redirection based on user role
export const handleRedirect = () => {
  const { state, getUserRole } = useGlobalState(); // Access state and getUserRole function using the hook

  const userRole = getUserRole(state); // Get the current user role

  // Determine the appropriate dashboard based on the user role
  switch (userRole) {
    case Role.Admin:
      // Redirect to admin dashboard
      return '/admin-dashboard';
    case Role.Teacher:
      // Redirect to teacher dashboard
      return '/teacher-dashboard';
    default:
      // Redirect to default dashboard or handle according to your application logic
      return '/default-dashboard';
  }
};
