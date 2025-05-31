import React, { ReactNode } from "react";
import type { Role } from "../types/User";

type ProtectedRouteProps = {
  role: Role;
  allowedRoles: Role[];
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role,
  allowedRoles,
  children,
}) => {
  if (!allowedRoles.includes(role)) {
    return (
      <div className="">
        ACCESS DENIED: You do not have permission to view this page.
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
