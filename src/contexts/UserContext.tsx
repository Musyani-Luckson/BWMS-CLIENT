import { useReducer, ReactNode, useEffect, useState } from "react";
import {
  ErrorResponse,
  UserSignIn,
  UserSignUp,
  UserState,
} from "../types/User";

import { userReducer } from "../reducers/UserReducer";
import { UserContext } from "../hooks/UserContextHook";

// import axios from "axios";

const initialUserState: UserState = {
  user: null,
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const checkUserAccessStatus = async () => {
      setIsLoading(true);
      try {
        // const URL = `${
        //   import.meta.env.VITE_SERVER
        // }/api/user/signed?id=${userId}`;

        // const response = await axios.get(URL, {
        //   withCredentials: true,
        //   headers: { "Content-Type": "application/json" },
        // });

        // const user = response.data;

        // if (user) {
        //   dispatch({ type: "SIGNIN", payload: user });
        // } else {
        //   dispatch({ type: "SIGNOUT" });
        // }

        dispatch({
          type: "SIGNIN",
          payload: {
            id: "",
            fullname: "",
            socialSecurityNumber: "",
            role: "admin",
          },
        });
        setIsLoading(false);
      } catch (error) {
        console.error("User access check failed:", error);
        dispatch({ type: "SIGNOUT" });
        setIsLoading(false);
        setError({
          errors: {
            general: {
              message: "Failed to check user access status.",
              type: "server",
              value: "",
            },
          },
        });
      }
    };

    checkUserAccessStatus();
  }, []);

  const signUp = async (userSignUp: UserSignUp) => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}/api/user/signup`;
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
    const URL = `${import.meta.env.VITE_SERVER}/api/user/signin`;
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
    dispatch({ type: "SIGNOUT" });
  };

  const deleteAccount = async (userDeleteAccount: UserState) => {
    dispatch({ type: "DELETE", payload: userDeleteAccount });
  };

  return (
    <UserContext.Provider
      value={{
        user: state,
        signUp,
        signIn,
        signOut,
        deleteAccount,
        isLoading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
