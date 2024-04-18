// Interface for the Guardian document
export interface IGuardian {
  name: string;
  contact_number: string;
  email: string;
  address: string;
  school: string | ISchool;
  familyNumber: number;
}

// Interface for the School document
export interface ISchool {
  name: string;
  email: string;
  username: string;
  city: string;
  password: string;
  role: string;
  status: { type: String; default: "inactive" }; // Default status is 'inactive'
  paymentID: String; // New field for payment ID
  paymentUsername: String; // New field for username associated with payment
}

// Interface for the Student document
export interface IStudent {
  firstName: string;
  lastName: string;
  gender: string;
  school: string | ISchool;
  schoolClass: string | IClass;
  previousSchool: string;
  registrationDate: Date;
  dateOfBirth: Date;
  guardians: string[] | IGuardian;
 
}

// Interface for the Class document

export interface IClass {
  school: string | ISchool;
  className: string;
  year: number;

}

export interface IUser {
  id: void;
  _id: any;
  school: string | ISchool;
  firstName: string;
  lastName: string;
  gender: string;
  // username: string;
  email: string;
  role: string;
  password?: string;
  familyNumber?: number | ""

  teachingSubjects?: string[]; // Optional array of teaching subjects
  isClassTeacher?: boolean; // Optional boolean indicating whether the teacher is a class teacher
}
