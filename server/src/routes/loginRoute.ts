import express, { Request, Response } from "express";
import { ISchool, School } from "../models/School";
import { IUser, User } from "../models/User";

const loginRouter = express.Router();

loginRouter.post("/login", async (req: Request, res: Response) => {
  try {
    //let accountDetails:ISchool|{} = {};
    let accountDetails: ISchool | null;

    const { username = "", password = "" } = req.body;
    console.log({ postData: req.body });
    if (username.includes("@")) {
      accountDetails =
        (await User.findOne({ email: username, password })) || null;
    } else {
      accountDetails = (await School.findOne({ username, password })) || null;
      if (accountDetails) {
        accountDetails.school = accountDetails._id as string;
      }
    }
    if (!accountDetails) {
      throw Error("invaid username or password");
      // res.send({success: true, accountDetails:{name:'user1',email:'user@example.com', role:'Teacher'}})
    } else {
      // const  {password, ...rest} = accountDetails
      // res.json({accountDetails:{...accountDetails,role: 'admin'}, success: true})
      //accountDetails['role'] = "Accountant"
      res.json({ accountDetails, success: true });
    }
  } catch (error: any) {
    console.log({ loginError: error.message });
    res.status(400).send({ message: error.message, success: false });
  }
});

loginRouter.get("/login", async (req: Request, res: Response) => {
  try{
    const users=await School.find()
  res.send(users)

  }catch(error: any)
  {
    res.send({msg:'Something went wrong' + error.message})
  }
  
})

export { loginRouter };
