import { useReducer, ReactNode, useEffect, useState } from "react";
import {
  ErrorResponse,
  UserSignIn,
  UserSignUp,
  AuthUserState,
  User,
} from "../types/User";

import { userReducer } from "../reducers/UserReducer";
import { UserContext } from "../hooks/UserContextHook";

// import axios from "axios";
const initialAuthUserState: AuthUserState = {
  user: null,
  hasAdmin: false,
  users: null,
  departments: null,
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialAuthUserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const checkUserAccessStatus = async () => {
      setIsLoading(true);
      try {
        const URL = `${(import.meta as any).env.VITE_SERVER}/api/user/signup`;
        const isAdmin = true;
        dispatch({
          type: "HAS_ADMIN",
          payload: isAdmin,
        });
        dispatch({
          type: "SIGNIN",
          payload: {
            id: "1",
            fullname: "Test Subject",
            socialSecurityNumber: "12345678",
            role: "manager",
          },
        });
      } catch (error) {
        console.error("User access check failed:", error);
        dispatch({ type: "SIGNOUT" });
        setError({
          errors: {
            general: {
              message: "Failed to check user access status.",
              type: "server",
              value: "",
            },
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAccessStatus();
  }, []);

  const signUp = async (userSignUp: UserSignUp) => {
    setIsLoading(true);
    const URL = `${(import.meta as any).env.VITE_SERVER}/api/user/signup`;
    const response = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userSignUp),
    });

    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return;
    }
    setError(null);
    const user = await response.json();
    dispatch({ type: "SIGNUP", payload: user });
    setIsLoading(false);
  };

  const signIn = async (userSignIn: UserSignIn) => {
    setIsLoading(true);
    const URL = `${(import.meta as any).env.VITE_SERVER}/api/user/signin`;
    const response = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userSignIn),
    });

    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return;
    }
    setError(null);
    const user = await response.json();
    dispatch({ type: "SIGNIN", payload: user });
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    dispatch({ type: "SIGNOUT" });
  };

  const deleteAccount = async (userDeleteAccount: AuthUserState) => {
    dispatch({ type: "DELETE", payload: userDeleteAccount });
  };

  //
  const updateUser = async (user: User) => {
    dispatch({ type: "UPDATE_USER", payload: user });
  };
  const getAllUsers = async (): Promise<User[]> => {
    setIsLoading(true);
    const URL = `${(import.meta as any).env.VITE_SERVER}/api/user/all`;
    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return [];
    }
    setError(null);
    const users: User[] = await response.json();
    dispatch({ type: "GET_ALL_USERS", payload: users });
    setIsLoading(false);
    return users;
  };
  const listDepartments = async (): Promise<string[]> => {
    setIsLoading(true);
    const URL = `${(import.meta as any).env.VITE_SERVER}/api/department/all`;
    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return [];
    }
    setError(null);
    const departments: string[] = await response.json();
    dispatch({ type: "LIST_DEPARTMENTS", payload: departments });
    setIsLoading(false);
    return departments;
  };
  const newDepartment = async (department: string) => {
    dispatch({ type: "NEW_DEPARTMENT", payload: department });
  };

  return (
    <UserContext.Provider
      value={{
        user: state,
        signUp,
        signIn,
        signOut,
        deleteAccount,
        updateUser,
        getAllUsers,
        listDepartments,
        newDepartment,
        isLoading,
        error,
        users: state.users,
        departments: state.departments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
