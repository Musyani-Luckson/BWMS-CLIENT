import { NavLink } from "react-router-dom";
import { dashboardRoutes } from "../../types/Routes";
import "./NavList.css";
import { userObject } from "../../types/User";

const role = userObject?.data?.role;

const routes = dashboardRoutes[role];

function NavList() {
  return (
    <div className="navList rounded">
      {routes.map((route, index) => {
        const { to, label: name, icon } = route;
        return (
          <NavLink key={index} to={to} className="NavLink m-2">
            <div className="NavLinkIcon">{icon}</div>
            <div className="NavLinkText">
              <span>{name}</span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavList;
