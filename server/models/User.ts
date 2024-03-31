interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole; // Assume UserRole is an enum defining possible roles
    // Add more fields as needed
  }
  
  enum UserRole {
    ADMIN = 'admin',
    HEADTEACHER = 'headteacher',
    TEACHER = 'teacher',
    PARENT = 'parent',
    ENROLLMENTOFFICER = 'enrollmentOfficer'
    // Add more roles as needed
  }
  
  export default User;
  
  