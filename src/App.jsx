import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/reducers/userReducer";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Loading from "./components/Loading";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import { PuffLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import AuthCallback from "./components/AuthCallback";

// Lazy load components individually
const Clients = lazy(() => import("./pages/Clients/clients"));
const Content = lazy(() => import("./pages/Content/Content"));
const Uncontacted = lazy(() => import("./pages/Clients/Uncontacted"));
const FollowUps = lazy(() => import("./pages/Clients/FollowUps"));
const RecentlyContacted = lazy(() => import("./pages/Clients/RecentlyContacted"));
const AllClients = lazy(() => import("./pages/Clients/AllClients"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ClientDetails = lazy(() => import("./pages/Clients/ClientDetails"));
const Messages = lazy(() => import("./pages/Content/Messages"));
const Files = lazy(() => import("./pages/Content/Files"));
const Pages = lazy(() => import("./pages/Content/Pages"));
const MessageTemplate = lazy(() => import("./pages/Content/MessageTemplate"));
const FileDetails = lazy(() => import("./pages/Content/FileDetails"));
const PageDetails = lazy(() => import("./pages/Content/PageDetails"));
const CreatePage = lazy(() => import("./pages/Content/CreatePage"));
const TeamLayout = lazy(() => import("./pages/Team/TeamLayout"));
const TeamDashboard = lazy(() => import("./pages/Team/TeamDashboard"));
const TeamMembers = lazy(() => import("./pages/Team/TeamMembers"));
const LeadAssignment = lazy(() => import("./pages/Team/LeadAssignment"));
const IntegrationsLayout = lazy(() => import("./pages/Integrations/IntegrationsLayout"));
const ImportExportClients = lazy(() => import("./pages/Integrations/ImportExportClients"));
const DashboardLayout = lazy(() => import("./pages/Admin/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const ManageUsers = lazy(() => import("./pages/Admin/ManageUsers"));
const ManageContent = lazy(() => import("./pages/Admin/ManageContent"));
const ManageTeams = lazy(() => import("./pages/Admin/ManageTeams"));
const Profile = lazy(() => import("./pages/Profile"));
const NoInternetPage = lazy(() => import("./pages/NoInternetPage"));

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const shouldShowHeader = useMemo(() => {
    const noHeaderPaths = ["/login", "/register", "/admin", "/auth-callback"];
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
    return <NoInternetPage />;
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
                <Clients />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth-callback"
            element={<AuthCallback />}
          />

          <Route
            path="/clients"
            element={
              <PublicRoute>
                <Clients />
              </PublicRoute>
            }
          >
            <Route index element={<AllClients />} />
            <Route path="uncontacted" element={<Uncontacted />} />
            <Route path="follow-ups" element={<FollowUps />} />
            <Route
              path="recently-contacted"
              element={<RecentlyContacted />}
            />
          </Route>

          <Route
            path="/content"
            element={
              <PublicRoute>
                <Content />
              </PublicRoute>
            }
          >
            <Route index path="messages" element={<Messages />} />
            <Route path="files" element={<Files />} />
            <Route path="pages" element={<Pages />} />
          </Route>

          <Route
            path="/client/:id"
            element={
              <PublicRoute>
                <ClientDetails />
              </PublicRoute>
            }
          />
          <Route
            path="/content/message/:id"
            element={
              <PublicRoute>
                <MessageTemplate />
              </PublicRoute>
            }
          />
          <Route
            path="/content/file/:id"
            element={
              <PublicRoute>
                <FileDetails />
              </PublicRoute>
            }
          />
          <Route
            path="/content/page/:id"
            element={
              <PublicRoute>
                <PageDetails />
              </PublicRoute>
            }
          />
          <Route
            path="/content/pages/new"
            element={
              <PublicRoute>
                <CreatePage />
              </PublicRoute>
            }
          />

          <Route
            path="/team"
            element={
              <PublicRoute>
                <TeamLayout />
              </PublicRoute>
            }
          >
            <Route
              index
              path="dashboard"
              element={<TeamDashboard />}
            />
            <Route path="manage" element={<TeamMembers />} />
            <Route
              path="lead-assignment"
              element={<LeadAssignment />}
            />
          </Route>

          <Route
            path="/integrations"
            element={
              <PublicRoute>
                <IntegrationsLayout />
              </PublicRoute>
            }
          >
            <Route path="" element={<ImportExportClients />} />
          </Route>

          <Route
            path="/admin/dashboard"
            element={
              <PublicRoute>
                <DashboardLayout />
              </PublicRoute>
            }
          >
            <Route index path="" element={<Dashboard />} />
            <Route path="Users" element={<ManageUsers />} />
            <Route path="Content" element={<ManageContent />} />
            <Route path="Teams" element={<ManageTeams />} />
          </Route>

          <Route
            path="/account/profile"
            element={
              <PublicRoute>
                <Profile />
              </PublicRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
};

export default App;