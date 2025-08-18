import { Outlet } from "react-router-dom";
// import "./UserAuth.css";

function UserAuthLayout() {
  return (
    <div className="user-auth-container UserAuthLayout">{<Outlet />} </div>
  );
}

export default UserAuthLayout;
