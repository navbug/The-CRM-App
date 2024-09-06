import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/reducers/userReducer";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
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
  PublicRoute: lazyLoad("./routes/PublicRoute"),
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
              <components.PublicRoute>
                <components.Clients />
              </components.PublicRoute>
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
              <components.PublicRoute>
                <components.Clients />
              </components.PublicRoute>
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
              <components.PublicRoute>
                <components.Content />
              </components.PublicRoute>
            }
          >
            <Route index path="messages" element={<components.Messages />} />
            <Route path="files" element={<components.Files />} />
            <Route path="pages" element={<components.Pages />} />
          </Route>

          <Route
            path="/client/:id"
            element={
              <components.PublicRoute>
                <components.ClientDetails />
              </components.PublicRoute>
            }
          />
          <Route
            path="/content/message/:id"
            element={
              <components.PublicRoute>
                <components.MessageTemplate />
              </components.PublicRoute>
            }
          />
          <Route
            path="/content/file/:id"
            element={
              <components.PublicRoute>
                <components.FileDetails />
              </components.PublicRoute>
            }
          />
          <Route
            path="/content/page/:id"
            element={
              <components.PublicRoute>
                <components.PageDetails />
              </components.PublicRoute>
            }
          />
          <Route
            path="/content/pages/new"
            element={
              <components.PublicRoute>
                <components.CreatePage />
              </components.PublicRoute>
            }
          />

          <Route
            path="/team"
            element={
              <components.PublicRoute>
                <components.TeamLayout />
              </components.PublicRoute>
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
              <components.PublicRoute>
                <components.IntegrationsLayout />
              </components.PublicRoute>
            }
          >
            <Route path="" element={<components.ImportExportClients />} />
          </Route>

          <Route
            path="/admin/dashboard"
            element={
              <components.PublicRoute>
                <components.DashboardLayout />
              </components.PublicRoute>
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
              <components.PublicRoute>
                <components.Profile />
              </components.PublicRoute>
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
