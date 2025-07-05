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

export type UserState = {
  user: User | null;
};

export type UserSignIn = {
  socialSecurityNumber: string;
  password: string;
};
export type UserSignUp = {} & UserSignIn & {
    fullname: string;
    phone: string;
    role: Role;
    confirm: string;
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
        | "confirm"
    ]: ErrorBody;
  };
};

// export const userObject: User = {
//   data: {
//     role: "supplier",
//   },
// };
