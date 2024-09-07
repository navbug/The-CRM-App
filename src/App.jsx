import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/reducers/userReducer";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Loading from "./components/Loading";
import { PuffLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";

// Lazy load components
const lazyLoad = (path) => lazy(() => import(path));

const components = {
  SignIn: lazyLoad("./pages/SignIn"),
  Clients: lazyLoad("./pages/Clients/clients"),
  Content: lazyLoad("./pages/Content/Content"),
  Uncontacted: lazyLoad("./pages/Clients/Uncontacted"),
  FollowUps: lazyLoad("./pages/Clients/FollowUps"),
  RecentlyContacted: lazyLoad("./pages/Clients/RecentlyContacted"),
  AllClients: lazyLoad("./pages/Clients/AllClients"),
  NotFoundPage: lazyLoad("./pages/NotFoundPage"),
  ClientDetails: lazyLoad("./pages/Clients/ClientDetails"),
  Messages: lazyLoad("./pages/Content/Messages"),
  Files: lazyLoad("./pages/Content/Files"),
  Pages: lazyLoad("./pages/Content/Pages"),
  MessageTemplate: lazyLoad("./pages/Content/MessageTemplate"),
  FileDetails: lazyLoad("./pages/Content/FileDetails"),
  PageDetails: lazyLoad("./pages/Content/PageDetails"),
  CreatePage: lazyLoad("./pages/Content/CreatePage"),
  TeamLayout: lazyLoad("./pages/Team/TeamLayout"),
  TeamDashboard: lazyLoad("./pages/Team/TeamDashboard"),
  TeamMembers: lazyLoad("./pages/Team/TeamMembers"),
  LeadAssignment: lazyLoad("./pages/Team/LeadAssignment"),
  IntegrationsLayout: lazyLoad("./pages/Integrations/IntegrationsLayout"),
  ImportExportClients: lazyLoad("./pages/Integrations/ImportExportClients"),
  DashboardLayout: lazyLoad("./pages/Admin/DashboardLayout"),
  Dashboard: lazyLoad("./pages/Admin/Dashboard"),
  ManageUsers: lazyLoad("./pages/Admin/ManageUsers"),
  ManageContent: lazyLoad("./pages/Admin/ManageContent"),
  ManageTeams: lazyLoad("./pages/Admin/ManageTeams"),
  Register: lazyLoad("./pages/Register"),
  Profile: lazyLoad("./pages/Profile"),
  NoInternetPage: lazyLoad("./pages/NoInternetPage"),
};

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const shouldShowHeader = useMemo(() => {
    const noHeaderPaths = ["/login", "/register", "/admin"];
    return !noHeaderPaths.some((path) => location.pathname.startsWith(path));
  }, [location.pathname]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <components.NoInternetPage />;
  }

  return (
    <div>
      {shouldShowHeader && <Header />}
      <Suspense
        fallback={
          <Loading>
            <PuffLoader color="#09e34f" speedMultiplier={3} />
          </Loading>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <components.Clients />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <components.SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <components.Register />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clients"
            element={
              <PublicRoute>
                <components.Clients />
              </PublicRoute>
            }
          >
            <Route index element={<components.AllClients />} />
            <Route path="uncontacted" element={<components.Uncontacted />} />
            <Route path="follow-ups" element={<components.FollowUps />} />
            <Route
              path="recently-contacted"
              element={<components.RecentlyContacted />}
            />
          </Route>

          <Route
            path="/content"
            element={
              <PublicRoute>
                <components.Content />
              </PublicRoute>
            }
          >
            <Route index path="messages" element={<components.Messages />} />
            <Route path="files" element={<components.Files />} />
            <Route path="pages" element={<components.Pages />} />
          </Route>

          <Route
            path="/client/:id"
            element={
              <PublicRoute>
                <components.ClientDetails />
              </PublicRoute>
            }
          />
          <Route
            path="/content/message/:id"
            element={
              <PublicRoute>
                <components.MessageTemplate />
              </PublicRoute>
            }
          />
          <Route
            path="/content/file/:id"
            element={
              <PublicRoute>
                <components.FileDetails />
              </PublicRoute>
            }
          />
          <Route
            path="/content/page/:id"
            element={
              <PublicRoute>
                <components.PageDetails />
              </PublicRoute>
            }
          />
          <Route
            path="/content/pages/new"
            element={
              <PublicRoute>
                <components.CreatePage />
              </PublicRoute>
            }
          />

          <Route
            path="/team"
            element={
              <PublicRoute>
                <components.TeamLayout />
              </PublicRoute>
            }
          >
            <Route
              index
              path="dashboard"
              element={<components.TeamDashboard />}
            />
            <Route path="manage" element={<components.TeamMembers />} />
            <Route
              path="lead-assignment"
              element={<components.LeadAssignment />}
            />
          </Route>

          <Route
            path="/integrations"
            element={
              <PublicRoute>
                <components.IntegrationsLayout />
              </PublicRoute>
            }
          >
            <Route path="" element={<components.ImportExportClients />} />
          </Route>

          <Route
            path="/admin/dashboard"
            element={
              <PublicRoute>
                <components.DashboardLayout />
              </PublicRoute>
            }
          >
            <Route index path="" element={<components.Dashboard />} />
            <Route path="Users" element={<components.ManageUsers />} />
            <Route path="Content" element={<components.ManageContent />} />
            <Route path="Teams" element={<components.ManageTeams />} />
          </Route>

          <Route
            path="/account/profile"
            element={
              <PublicRoute>
                <components.Profile />
              </PublicRoute>
            }
          />

          <Route path="*" element={<components.NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
};

export default App;
