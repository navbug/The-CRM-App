import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";

// Lazy load components
const SignIn = lazy(() => import("./pages/SignIn"));
const Clients = lazy(() => import("./pages/Clients/clients"));
const Content = lazy(() => import("./pages/Content/Content"));
const Uncontacted = lazy(() => import("./pages/Clients/Uncontacted"));
const FollowUps = lazy(() => import("./pages/Clients/FollowUps"));
const RecentlyViewed = lazy(() => import("./pages/Clients/RecentlyViewed"));
const AllClients = lazy(() => import("./pages/Clients/AllClients"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PublicRoute = lazy(() => import("./routes/PublicRoute"));
const ClientDetails = lazy(() => import("./pages/Clients/ClientDetails"));
const Messages = lazy(() => import("./pages/Content/Messages"));
const Files = lazy(() => import("./pages/Content/Files"));
const Pages = lazy(() => import("./pages/Content/Pages"));
const MessageTemplate = lazy(() => import("./pages/Content/MessageTemplate"));
const FileDetails = lazy(() => import("./pages/Content/FileDetails"));
const PageDetails = lazy(() => import("./pages/Content/PageDetails"));
const CreateEditPage = lazy(() => import("./pages/Content/CreateEditPage"));
const TeamLayout = lazy(() => import("./pages/Team/TeamLayout"));
const TeamDashboard = lazy(() => import("./pages/Team/TeamDashboard"));
const TeamMembers = lazy(() => import("./pages/Team/TeamMembers"));
const LeadAssignment = lazy(() => import("./pages/Team/LeadAssignment"));
const IntegrationsLayout = lazy(() => import("./pages/Integrations/IntegrationsLayout"));
const LeadSources = lazy(() => import("./pages/Integrations/LeadSources"));
const ImportExportClients = lazy(() => import("./pages/Integrations/ImportExportClients"));
const DashboardLayout = lazy(() => import("./pages/Admin/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const ManageUsers = lazy(() => import("./pages/Admin/ManageUsers"));
const ManageContent = lazy(() => import("./pages/Admin/ManageContent"));
const ManageTeams = lazy(() => import("./pages/Admin/ManageTeams"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  const location = useLocation();

  return (
    <div>
      {!location.pathname.includes("admin") && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
};

export default App;