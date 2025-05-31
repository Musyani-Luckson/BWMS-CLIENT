import "./Header.css";
import { RiMenuFold2Fill } from "react-icons/ri";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { BsPersonFillGear } from "react-icons/bs";
import { BsPersonFillCheck } from "react-icons/bs";
import { FaClipboardUser } from "react-icons/fa6";

import { NavLink } from "react-router-dom";
import { userObject } from "../../types/User";

const role = userObject?.data?.role;

function Header() {
  return (
    <div id="header" className="layouts border-bottom">
      <div id="headerContainer">
        <div className="headerLeft">
          <RiMenuFold2Fill
            className="headerIcon menuIcon"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          />
          <NavLink to="#">CENTRAL-STORES</NavLink>
        </div>
        <div className="headerRight">
          <IoNotificationsCircleSharp className="headerIcon" />

          {role === "admin" && <MdAdminPanelSettings className="headerIcon" />}
          {role === "manager" && <FaUserTie className="headerIcon" />}
          {role === "warehouse_staff" && (
            <BsPersonFillGear className="headerIcon" />
          )}
          {role === "department_staff" && (
            <BsPersonFillCheck className="headerIcon" />
          )}
          {role === "supplier" && <FaClipboardUser className="headerIcon" />}
        </div>
      </div>
    </div>
  );
}

export default Header;
