import React from "react";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Clients from "./pages/Clients/clients";
import Content from "./pages/Content/Content";
import Uncontacted from "./pages/Clients/Uncontacted";
import FollowUps from "./pages/Clients/FollowUps";
import RecentlyViewed from "./pages/Clients/RecentlyViewed";
import AllClients from "./pages/Clients/AllClients";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import PublicRoute from "./routes/PublicRoute";
import ClientDetails from "./pages/Clients/ClientDetails";
import Messages from "./pages/Content/Messages";
import Files from "./pages/Content/Files";
import Pages from "./pages/Content/Pages";
import MessageTemplate from "./pages/Content/MessageTemplate";
import FileDetails from "./pages/Content/FileDetails";
import PageDetails from "./pages/Content/PageDetails";
import CreateEditPage from "./pages/Content/CreateEditPage";
import TeamLayout from "./pages/Team/TeamLayout";
import TeamDashboard from "./pages/Team/TeamDashboard";
import TeamMembers from "./pages/Team/TeamMembers";
import LeadAssignment from "./pages/Team/LeadAssignment";
import IntegrationsLayout from "./pages/Integrations/IntegrationsLayout";
import LeadSources from "./pages/Integrations/LeadSources";
import ImportExportClients from "./pages/Integrations/ImportExportClients";
import DashboardLayout from "./pages/Admin/DashboardLayout";
import Dashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageContent from "./pages/Admin/ManageContent";
import ManageTeams from "./pages/Admin/ManageTeams";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const location = useLocation();

  return (
      <div>
        {/* <Header /> */}
        {!location.pathname.includes("admin") && <Header />}
        {/* Later: Add Suspense  */}
        <Routes>
          <Route path="/" element={<PublicRoute />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          <Route path="/clients" element={<Clients />}>
            <Route index element={<AllClients />} />
            <Route path="uncontacted" element={<Uncontacted />} />
            <Route path="follow-ups" element={<FollowUps />} />
            <Route path="recently-viewed" element={<RecentlyViewed />} />
          </Route>
          <Route path="/content" element={<Content />}>
            <Route index path="messages" element={<Messages />} />
            <Route path="files" element={<Files />} />
            <Route path="pages" element={<Pages />} />
          </Route>

          <Route path="/client/:id" element={<ClientDetails />} />
          <Route path="/content/message/:id" element={<MessageTemplate />} />
          <Route path="/content/file/:id" element={<FileDetails />} />
          <Route path="/content/page/:id" element={<PageDetails />} />
          <Route path="/content/pages/new" element={<CreateEditPage />} />

          <Route path="/team" element={<TeamLayout />}>
            <Route index path="dashboard" element={<TeamDashboard />} />
            <Route path="manage" element={<TeamMembers />} />
            <Route path="lead-assignment" element={<LeadAssignment />} />
          </Route>

          <Route path="/integrations" element={<IntegrationsLayout />}>
            <Route index path="" element={<LeadSources />} />
            <Route path="other" element={<ImportExportClients />} />
          </Route>

          <Route path="/admin/dashboard" element={<DashboardLayout />}>
            <Route index path="" element={<Dashboard />} />
            <Route path="Users" element={<ManageUsers />} />
            <Route path="Content" element={<ManageContent />} />
            <Route path="Teams" element={<ManageTeams />} />
          </Route>

          <Route path="/account/profile" element={<Profile />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
  );
};

export default App;
