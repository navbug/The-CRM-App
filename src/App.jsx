import React from 'react'
import Header from './components/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Clients from './pages/Clients/clients';
import Content from './pages/Content/Content';
import Uncontacted from './pages/Clients/Uncontacted';
import FollowUps from './pages/Clients/FollowUps';
import RecentlyViewed from './pages/Clients/RecentlyViewed';
import AllClients from './pages/Clients/AllClients';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import PublicRoute from './routes/PublicRoute';
import ClientDetails from './pages/Clients/ClientDetails';
import Messages from './pages/Content/Messages';
import Files from './pages/Content/Files';
import Pages from './pages/Content/Pages';
import MessageTemplate from './pages/Content/MessageTemplate';

const App = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/login' && <Header />}
      {/* Later: Add Suspense  */}
      <Routes>
        <Route path='/' element={<PublicRoute />} />
        <Route path='/login' element={<SignIn />} />

        <Route path="/clients" element={<Clients />}>
          <Route index element={<AllClients />} />
          <Route path="uncontacted" element={<Uncontacted />} />
          <Route path="follow-ups" element={<FollowUps />} />
          <Route path="recently-viewed" element={<RecentlyViewed />} />
        </Route>
        <Route path="/content" element={<Content />}>
          <Route index path='messages' element={<Messages />} />
          <Route path='files' element={<Files />} />
          <Route path='pages' element={<Pages />} />
        </Route>

        <Route path='/client/:id' element={<ClientDetails />} />
        <Route path="/content/message/:id" element={<MessageTemplate />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App;