import { createContext, useContext } from "react";
import {
  ErrorResponse,
  UserSignIn,
  UserSignUp,
  UserState,
} from "../types/User";

type UserContextType = {
  signUp: (userSignUp: UserSignUp) => Promise<void>;
  signIn: (userSignIn: UserSignIn) => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: (userDeleteAccount: UserState) => Promise<void>;
  isLoading: boolean;
  error: ErrorResponse | null;
  user: UserState | null;
};

const initialState: UserContextType = {
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  deleteAccount: async () => {},
  isLoading: true,
  error: null,
  user: null,
};

export const UserContext = createContext<UserContextType>(initialState);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
