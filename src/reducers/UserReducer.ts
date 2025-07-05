import { User, UserState } from "../types/User";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const SIGNOUT = "SIGNOUT";
export const DELETE = "DELETE";

type AuthActionTypes =
  | { type: typeof SIGNUP; payload: User }
  | { type: typeof SIGNIN; payload: User }
  | { type: typeof SIGNOUT }
  | { type: typeof DELETE; payload: UserState };

export const userReducer = (
  state: UserState,
  action: AuthActionTypes
): UserState => {
  switch (action.type) {
    case SIGNUP:
      // For now we store user in localStorage for persistence
      return { user: action.payload };
    case SIGNIN:
      // For now we store user in localStorage for persistence
      return { user: action.payload };
    case SIGNOUT:
      localStorage.removeItem("user");
      return { user: null };
    case DELETE:
      localStorage.removeItem("user");
      return { user: null };
    default:
      return state;
  }
};
