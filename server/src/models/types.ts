// types.ts

import { ITeacher } from '../models/Teacher'; 

// Conditional type to include className only if isClassTeacher is true
export type TeacherWithClassName = ITeacher & { className: string };
