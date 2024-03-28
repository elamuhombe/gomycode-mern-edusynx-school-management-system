import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Step 1: Define types
interface User {
  // Define your User type
  name: string
  email: string
  password?: string
  role: 'admin' |'user'
}

interface Student {
  // Define your Student type
}

interface Teacher {
  // Define your Teacher type
}

interface Subject {
  // Define your Subject type
}

interface Guardian {
  // Define your Guardian type
}

interface GlobalState {
  user: User | null;
  students: Student[];
  teachers: Teacher[];
  subjects: Subject[];
  guardians: Guardian[];
}
const initialState:GlobalState={
  user:null,
  students:[],
  teachers:[],
  subjects:[],
  guardians:[]
}
type Action =
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'UPDATE_STUDENTS'; payload: Student[] }
  | { type: 'UPDATE_TEACHERS'; payload: Teacher[] }
  | { type: 'UPDATE_SUBJECTS'; payload: Subject[] }
  | { type: 'UPDATE_GUARDIANS'; payload: Guardian[] };

// Step 2: Create context
const GlobalStateContext = createContext<{ state: GlobalState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Step 3: Custom hook to access state and update it
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

// Step 4: Reducer function to update state
const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_STUDENTS':
      return { ...state, students: action.payload };
    case 'UPDATE_TEACHERS':
      return { ...state, teachers: action.payload };
    case 'UPDATE_SUBJECTS':
      return { ...state, subjects: action.payload };
    case 'UPDATE_GUARDIANS':
      return { ...state, guardians: action.payload };
    default:
      return state;
  }
};

// Step 4: GlobalStateProvider component
interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
