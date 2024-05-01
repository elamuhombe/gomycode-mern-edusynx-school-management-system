import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { ISchool, IUser } from "../types";
import useUserAuth from "./useUserAuth";

// Define enum for user roles
export enum Role {
  Admin = "admin",
  HeadTeacher = "headteacher",
  Teacher = "teacher",
  Parent = "parent",
  Accountant = "accountant",
  EnrollmentOfficer = "enrollment-officer",
}
/**
 * export interface User {
   name: string;
  email: string;
  password?: string;
  role: Role;
  _id?: string;
}
 
 */


type User = ISchool 
// Define GlobalState type
export interface GlobalState {
  userRole: Role; // Fix: Change 'any' to 'Role'
  users: User[];
  loggedInUser: User | null;
  API_URL:string;
}

const initialState: GlobalState = {
  userRole: Role.Admin, // Set initial userRole to Admin
  users: [],
  loggedInUser: null,
  API_URL:'https://mern-edusynx-school-management-system.onrender.com'
};

type Action = { type: "UPDATE_USERS" | "UPDATE_USER"; payload: any };

// Create context
const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: React.Dispatch<Action>;
     // getUserRole: (state: GlobalState) => Role;
    }
  | undefined
>(undefined);

// Custom hook to access state and update it
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

// Reducer function to update state
const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "UPDATE_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USER":
      return { ...state, loggedInUser: action.payload };
    default:
      return state;
  }
};

// GlobalStateProvider component
interface GlobalStateProviderProps {
  children: ReactNode;
}

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userAuth = useUserAuth();

  useEffect(() => {
    if (userAuth.isLoggedIn) {
      dispatch({
        type: 'UPDATE_USER',
        payload: userAuth.savedUser
      });
    }
  }, [userAuth.isLoggedIn, userAuth.savedUser]);
  
  // Function to get the user role
  const getUserRole = (state: GlobalState) => {
    // Assuming the first user in the state represents the current user
    const currentUser = state.loggedInUser;
    return currentUser ? currentUser.role : Role.Admin; // Default to Admin role if no user is available
  };

  return (
    <GlobalStateContext.Provider value={{ state, dispatch}}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
