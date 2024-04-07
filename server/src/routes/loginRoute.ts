import express, { Request, Response } from "express";
import { ISchool, School } from "../models/School";

const loginRouter = express.Router();

loginRouter.post("/login", async (req: Request, res: Response) => {
  try {
    let accountDetails:ISchool|{} = {};
    const { username ="", password = "" } = req.body;
    console.log({postData:req.body})
    if (username.includes("@")) {
    } else {
      accountDetails = await School.findOne({ username, password })|| {};
    }
    if (!accountDetails) {
      throw Error("invaid username or password");
    } else {
      // const  {password, ...rest} = accountDetails
      // res.json({accountDetails:{...accountDetails,role: 'admin'}, success: true})
      
      res.json({accountDetails, success: true})
    }
  } catch (error: any) {
    console.log({ loginError: error.message });
    res.status(400).send({ message: error.message, success: false });
  }
});

export { loginRouter };
