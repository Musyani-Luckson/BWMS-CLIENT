export type Role =
  | "admin"
  | "manager"
  | "warehouse_staff"
  | "department_staff"
  | "supplier";

export type User = {
  // data: {
  id: string;
  fullname: string;
  socialSecurityNumber: string;
  role: Role;
  // };
};

export type AuthUserState = {
  user: User | null;
  hasAdmin: boolean;
  users: User[] | null;
  departments: string[] | null;
};

export type UserSignIn = {
  socialSecurityNumber: string;
  password: string;
};
export type UserSignUp = {} & UserSignIn & {
    fullname: string;
    role: string;
    department: string;
    confirmPassword: string;
  };

type ErrorBody = {
  message: string;
  type: string;
  value: string;
};

export type ErrorResponse = {
  errors: {
    [
      key:
        | string
        | "socialSecurityNumber"
        | "fullname"
        | "phone"
        | "role"
        | "password"
        | "confirmPassword"
    ]: ErrorBody;
  };
};

// export const userObject: User = {
//   data: {
//     role: "supplier",
//   },
// };
