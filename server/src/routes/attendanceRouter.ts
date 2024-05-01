import express, { Router, Request, Response } from "express";
import { Attendance, IAttendance } from "../models/Attendance";
import { IStudent, Student } from "../models/Student";
import { Classes } from "../models/Classes";
import { Types } from "mongoose";
import { Document } from "mongoose";

// Define an interface extending IAttendance to include studentNames property
interface IExtendedAttendance extends IAttendance, Document {
  studentNames: string[];
}

const attendanceRouter: Router = express.Router();
attendanceRouter.get("/attendance", async (req: Request, res: Response) => {
  const attendances = await Attendance.find()
  res.json(attendances)

})
attendanceRouter.post("/attendance", async (req: Request, res: Response) => {
  try {
    const { classId, date, studentAttendances } = req.body;
  

    // Validate request data
    if (
      !classId ||
      !date ||
      !studentAttendances ||
      !Array.isArray(studentAttendances)
    ) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const classDocument = await Classes.findOne({ _id: classId });

    if (!classDocument) {
      return res
        .status(404)
        .json({ error: `Class with name not found` });
    }

    const errors: string[] = [];
    const studentsInClass = await Student.find({ _id: classId  });

    const attendancePromises = studentsInClass.map(async (student: any) => {
      const studentName = `${student.studentFirstName} ${student.studentLastName}`;
      const isPresent = studentAttendances.some((attendance: any) => {
        return attendance.studentName === studentName && attendance.isPresent;
      });

      // Construct studentAttendanceData object
      const studentAttendanceData = {
        student: student,
        isPresent: isPresent,
      };

      console.log("student attendance data", studentAttendanceData);

      const attendance = new Attendance({
        class: classDocument._id,
        date,
        studentAttendances: [studentAttendanceData],
      });

      console.log("attendance is", attendance);

      return attendance.save(); // Return the promise
    });

    const savedAttendance = await Promise.all(attendancePromises);

    res.status(201).json(savedAttendance);
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

attendanceRouter.get("/attendance/view-attendance", async (req: Request, res: Response) => {
  // const data=await Attendance.find()
  // return res.json(data)
  try {
      const className = req.query.className as string | undefined;
      const date = req.query.date as string | undefined;

      let attendanceRecords: IAttendance[];

      if (className && date) {
          attendanceRecords = await Attendance.find().populate("student")} else {
          attendanceRecords = await Attendance.find().populate("student")
              // path: 'studentAttendances', // Populate the studentAttendances field
              // populate: { path: 'student', model: 'Student' } // Populate the student field inside studentAttendances
          
      }

      res.status(200).json(attendanceRecords);
  } catch (error: any) {
      console.error("Error retrieving attendance records:", error);
      console.log(error.message)
      res.status(500).json({ error: "Internal Server Error" });
  }
});

attendanceRouter.delete("/attendance/all",async (req: Request, res: Response) => {
  const attendances = await Attendance.deleteMany()
  res.send(attendances)
})

export default attendanceRouter;
