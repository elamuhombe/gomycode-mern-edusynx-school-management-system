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
    const { classId, ...others } = req.body,
    {date, studentAttendances}=others;


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

      // const attendance = new Attendance({
      //   clas: classId,
      //   date,
      //   studentAttendances: [studentAttendanceData],
      // });
      const attendance = new Attendance({...others, clas:classId});

      console.log("attendance is", attendance);

     let saved = await attendance.save(); // Return the promise
      return res.send(saved)
    });

    const savedAttendance = await Promise.all(attendancePromises);

    res.status(201).json(savedAttendance);
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint to retrieve all attendance records

attendanceRouter.get("/attendance/view-attendance", async (req: Request, res: Response) => {
  // const data=await Attendance.find()
  // return res.json(data)

  
  try {
      const clas = req.query.clas as string | undefined;
      const date = req.query.date as string | undefined;

      let attendanceRecords: IAttendance[];

      if (clas && date) {
          attendanceRecords = await Attendance.find({clas, date}).populate("student")} else {
         
              // path: 'studentAttendances', // Populate the studentAttendances field
              // populate: { path: 'student', model: 'Student' } // Populate the student field inside studentAttendances
          attendanceRecords = []
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
