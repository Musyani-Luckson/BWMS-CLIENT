// dashboardRoutes.ts
import { MdDashboard, MdPeople, MdInventory, MdListAlt } from "react-icons/md";
import {
  FaBoxes,
  FaCheckCircle,
  FaTruck,
  FaHistory,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";
import { IoIosSync } from "react-icons/io";
import {
  // BiEditAlt,
BiMailSend
} from "react-icons/bi";
import { Role } from "./User";

export type Route = {
  to: string;
  value: string;
  label: string;
  icon: React.ReactNode; // <-- React component, not a string
};

// type Role =
//   | "admin"
//   | "manager"
//   | "warehouse_staff"
//   | "department_staff"
//   | "supplier";

export type DashboardRoutes = {
  [key in Role]: Route[];
};

export const dashboardRoutes: DashboardRoutes = {
  admin: [
    { to: "/admin", value: "home", label: "Dashboard", icon: <MdDashboard /> },
    { to: "/admin/users", value: "users", label: "Users", icon: <MdPeople /> },
    {
      to: "/admin/stocks",
      value: "stocks",
      label: "Stocks",
      icon: <MdInventory />,
    },
    {
      to: "/admin/activity_logs",
      value: "activity_logs",
      label: "Activity Logs",
      icon: <MdListAlt />,
    },
  ],
  manager: [
    {
      to: "/manager",
      value: "home",
      label: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      to: "/manager/users",
      value: "users",
      label: "Users",
      icon: <MdPeople />,
    },
    {
      to: "/manager/stock_management",
      value: "stock_management",
      label: "Stock Management",
      icon: <FaBoxes />,
    },
    {
      to: "/manager/stocks",
      value: "stocks",
      label: "Stocks",
      icon: <MdInventory />,
    },
    {
      to: "/manager/requests",
      value: "requests",
      label: "Request Approvals",
      icon: <FaCheckCircle />,
    },
    {
      to: "/manager/deliveries",
      value: "deliveries",
      label: "Delivery Oversight",
      icon: <FaTruck />,
    },
    {
      to: "/manager/activity_logs",
      value: "activity_logs",
      label: "Activity Logs",
      icon: <MdListAlt />,
    },
  ],
  warehouse_staff: [
    {
      to: "/warehouse",
      value: "home",
      label: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      to: "/warehouse/stock_movement",
      value: "stock_movement",
      label: "Stock Movement",
      icon: <IoIosSync />,
    },
    // {
    //   to: "/warehouse/update_stock",
    //   value: "update_stock",
    //   label: "Update Stock",
    //   icon: <BiEditAlt />,
    // },
    {
      to: "/warehouse/request_status",
      value: "request_status",
      label: "Request Status",
      icon: <BiMailSend />,
    },
  ],
  department_staff: [
    {
      to: "/department",
      value: "home",
      label: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      to: "/department/request_history",
      value: "request_history",
      label: "Request History",
      icon: <FaHistory />,
    },
    {
      to: "/department/request_summary",
      value: "request_summary",
      label: "Status Summary",
      icon: <FaChartLine />,
    },
  ],
  supplier: [
    {
      to: "/supplier",
      value: "home",
      label: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      to: "/supplier/deliver_stock",
      value: "deliver_stock",
      label: "Deliver New Stock",
      icon: <FaBoxes />,
    },
    {
      to: "/supplier/feedback",
      value: "feedback",
      label: "Feedback & Alerts",
      icon: <FaExclamationTriangle />,
    },
  ],
};
