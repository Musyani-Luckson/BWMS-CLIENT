export type Role =
  | "admin"
  | "manager"
  | "warehouse_staff"
  | "department_staff"
  | "supplier";

export type User = {
  data: {
    role: Role;
  };
};

export const userObject: User = {
  data: {
    role: "admin",
  },
};
