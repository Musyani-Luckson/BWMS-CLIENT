import { createContext, useContext } from "react";
import {
  ErrorResponse,
  FetchedUser,
  UserSignIn,
  UserSignUp,
  AuthUserState,
} from "../types/auth";

type UserContextType = {
  signUp: (userSignUp: UserSignUp) => Promise<void>;
  signIn: (userSignIn: UserSignIn) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: (userDeleteAccount: AuthUserState) => Promise<void>;
  updateUser: (userUpdate: FetchedUser) => Promise<void>;
  getAllUsers: () => Promise<FetchedUser[]>;
  listDepartments: () => Promise<string[]>;
  newDepartment: (departmentName: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  addUser: (user: FetchedUser) => Promise<void>;
  isLoading: boolean;
  error: ErrorResponse | null;
  user: AuthUserState | null;
  users: FetchedUser[] | null;
  departments: string[] | null;
};

const initialState: UserContextType = {
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  deleteAccount: async () => {},
  updateUser: async () => {},
  getAllUsers: async () => [],
  listDepartments: async () => [],
  newDepartment: async () => {},
  deleteUser: async () => {},
  addUser: async () => { },
  isLoading: true,
  error: null,
  user: null,
  users: null,
  departments: null,
};

export const UserContext = createContext<UserContextType>(initialState);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
