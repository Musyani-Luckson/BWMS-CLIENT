import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminDashboardHome from "./pages/Admin/AdminDashboardHome";
import AdminStockOverviewPage from "./pages/Admin/AdminStockOverviewPage";
import ManageUsersPage from "./pages/AdminAndManager/ManageUsersPage";
import ActivityLogsPage from "./pages/AdminAndManager/ActivityLogsPage";
import ManagerDashboardHome from "./pages/Manager/ManagerDashboardHome";
import StockManagementPage from "./pages/Manager/StockManagementPage";
import RequestManagementPage from "./pages/Manager/RequestManagementPage";
import DeliveryOversightPage from "./pages/Manager/DeliveryOversightPage";
import WarehouseDashboardHome from "./pages/WarehouseStaff/WarehouseDashboardHome";
import StockMovementPage from "./pages/WarehouseStaff/StockMovementPage";
import MoveStockFormPage from "./pages/WarehouseStaff/MoveStockFormPage";
import DepartmentDashboardHome from "./pages/DepartmentStaff/DepartmentDashboardHome";
import RequestHistoryPage from "./pages/DepartmentStaff/RequestHistoryPage";
import RequestSummaryPage from "./pages/DepartmentStaff/RequestSummaryPage";
import SupplierDashboardHome from "./pages/Supplier/SupplierDashboardHome";
import DeliverStockFormPage from "./pages/Supplier/DeliverStockFormPage";
import IssueFeedbackPanelPage from "./pages/Supplier/IssueFeedbackPanelPage";

import RequestStatusPage from "./pages/WarehouseStaff/RequestStatusPage";
// import { userObject } from "./types/User";
import "./App.css";
import NotFoundPage from "./components/other/NotFoundPage";
import { useUserContext } from "./hooks/UserContextHook";
import Loading from "./components/other/Loading";

// Dashboard Layout Wrappers
const AdminDashboard = () => <Outlet />;
const ManagerDashboard = () => <Outlet />;
const WarehouseDashboard = () => <Outlet />;
const DepartmentDashboard = () => <Outlet />;
const SupplierDashboard = () => <Outlet />;

// Mock authenticated user
function App() {
  const { user, isLoading } = useUserContext();
  const role = user?.user?.role;
  
  // Role-based redirection
  const getRedirectPath = (role: string): string => {
    switch (role) {
      case "admin":
        return "/admin";
      case "manager":
        return "/manager";
      case "warehouse_staff":
        return "/warehouse";
      case "department_staff":
        return "/department";
      case "supplier":
        return "/supplier";
      default:
        return "/";
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (role) {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<Layout />}>
            {/* Admin Dashboard Routes */}
            <Route
              path="admin"
              element={
                <ProtectedRoutes role={role} allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoutes>
              }
            >
              <Route index element={<AdminDashboardHome />} />
              <Route path="users" element={<ManageUsersPage />} />
              <Route path="stocks" element={<AdminStockOverviewPage />} />
              <Route path="activity_logs" element={<ActivityLogsPage />} />
            </Route>

            {/* Manager Dashboard Routes */}
            <Route
              path="manager"
              element={
                <ProtectedRoutes role={role} allowedRoles={["manager"]}>
                  <ManagerDashboard />
                </ProtectedRoutes>
              }
            >
              <Route index element={<ManagerDashboardHome />} />
              <Route
                path="stock_management"
                element={<StockManagementPage />}
              />
              <Route path="users" element={<ManageUsersPage />} />
              <Route path="requests" element={<RequestManagementPage />} />
              <Route path="stocks" element={<AdminStockOverviewPage />} />
              <Route path="deliveries" element={<DeliveryOversightPage />} />
              <Route path="activity_logs" element={<ActivityLogsPage />} />
            </Route>

            {/* Warehouse Staff Dashboard Routes */}
            <Route
              path="warehouse"
              element={
                <ProtectedRoutes role={role} allowedRoles={["warehouse_staff"]}>
                  <WarehouseDashboard />
                </ProtectedRoutes>
              }
            >
              <Route index element={<WarehouseDashboardHome />} />
              <Route path="stock_movement" element={<StockMovementPage />} />
              <Route path="move_stock" element={<MoveStockFormPage />} />
              <Route path="request_status" element={<RequestStatusPage />} />
            </Route>

            {/* Department Staff Dashboard Routes */}
            <Route
              path="department"
              element={
                <ProtectedRoutes
                  role={role}
                  allowedRoles={["department_staff"]}
                >
                  <DepartmentDashboard />
                </ProtectedRoutes>
              }
            >
              <Route index element={<DepartmentDashboardHome />} />
              <Route path="request_history" element={<RequestHistoryPage />} />
              <Route path="request_summary" element={<RequestSummaryPage />} />
            </Route>

            {/* Supplier Dashboard Routes */}
            <Route
              path="supplier"
              element={
                <ProtectedRoutes role={role} allowedRoles={["supplier"]}>
                  <SupplierDashboard />
                </ProtectedRoutes>
              }
            >
              <Route index element={<SupplierDashboardHome />} />
              <Route path="deliver_stock" element={<DeliverStockFormPage />} />
              <Route path="feedback" element={<IssueFeedbackPanelPage />} />
            </Route>

            {/* Role-Based Redirect on Root */}
            <Route index element={<Navigate to={getRedirectPath(role)} />} />
          </Route>

          {/* Fallback Route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </>
      )
    );

    return <RouterProvider router={router} />;
  }
}

export default App;
