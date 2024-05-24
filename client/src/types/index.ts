// // Interface for the Guardian document
// export interface IGuardian {
//   name: string;
//   contact_number: string;
//   email: string;
//   address: string;
//   school: string | ISchool;
//   familyNumber: number;
// }

// Interface for the School document
export interface ISchool {
  _id: string;
  name: string;
  email: string;
  school: string | ISchool,
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
  studentFirstName: string;
  studentLastName: string;
  studentGender: string;
  school: string | ISchool;
  clas: string | IClass;
  previousSchool: string;
  dateOfBirth: Date;
  guardians: string[] | IUser;
  id: string;
  _id?: string;
 
}

// Interface for the Class document

export interface IClass {
  _id?: string;
  school: string | ISchool;
  className: string;
  year: number;
}

// Interface for Attendance document
export interface IAttendance {
  class: string | IClass;
  date: string;
  studentAttendances: IStudentAttendance[]; // Array of student attendance data
}

// Interface for student attendance data
export interface IStudentAttendance {
  // studentName: string;
  isPresent: boolean;
  student: string | IStudent; 
}
export interface IExam {
  examName: string;
  examDate: string;
  _id?: string;
}


export interface IUser {
  id?: string;
  _id?: string;
  school: ISchool | string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  role: string;
  password?: string;
  familyNumber?:string | '';
  className?: string | IClass;
  subject_name?: string |ISubject;
  teachingSubjects?: (string |ISubject)[]; // Optional array of teaching subjects
  isClassTeacher?: boolean; // Optional boolean indicating whether the teacher is a class teacher
}
export interface ISubject {
  _id: any;
  id: any;
  subject_name: string;
  department: string;
  school: ISchool | string;
  schoolClass: string | IClass;
}

export interface ISubjectMarks {
  subjectName: string;
  marks: number;
}
// Interface for the StudentMarks document
export interface IStudentMarks{
  studentId: IStudent;
  examId: IExam;
  subjectMarks: {
    subjectName: string;
    marks: number;
  }[];
}

