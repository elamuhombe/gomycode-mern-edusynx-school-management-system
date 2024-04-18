import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

// Define enum for user roles
export enum Role {
  Admin = "admin",
  HeadTeacher = "headteacher",
  Teacher = "teacher",
  Parent = "parent",
  Accountant = "accountant",
  EnrollmentOfficer = "enrollment-officer",
}

// Define types
export interface User {
  name: string;
  email: string;
  password?: string;
  role: Role;
  _id?: string;
}

// Define GlobalState type
export interface GlobalState {
  userRole: Role; // Fix: Change 'any' to 'Role'
  users: User[];
  loggedInUser: User | null;
}

const initialState: GlobalState = {
  userRole: Role.Admin, // Set initial userRole to Admin
  users: [],
  loggedInUser: null,
};

type Action = { type: "UPDATE_USERS" | "UPDATE_USER"; payload: any };

// Create context
const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: React.Dispatch<Action>;
      getUserRole: (state: GlobalState) => Role;
    }
  | undefined
>(undefined);

// Custom hook to access state and update it
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      "useGlobalState must be used within a GlobalStateProvider"
    );
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

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Simulate fetching user data by using the dummy data directly
    // You can update all users here if needed
    const dummyUserData: User[] = [
      {
        name: "Felix G",
        email: "admin@example.com",
        password: "admin123",
        role: Role.Admin,
      },
      {
        name: "Danny H",
        email: "headteacher@example.com",
        password: "headteacher123",
        role: Role.HeadTeacher,
      },
      {
        name: "Teacher User",
        email: "teacher@example.com",
        password: "teacher123",
        role: Role.Teacher,
      },
    ];

    dispatch({ type: "UPDATE_USERS", payload: dummyUserData });
  }, []);

  // Function to get the user role
  const getUserRole = (state: GlobalState) => {
    // Assuming the first user in the state represents the current user
    const currentUser = state.loggedInUser;
    return currentUser ? currentUser.role : Role.Admin; // Default to Admin role if no user is available
  };

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, getUserRole }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
