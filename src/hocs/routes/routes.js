import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'containers/pages/Home';
import Error404 from 'containers/errors/Error404';
import NewsDetail from 'containers/pages/NewsDetail';
import Category from 'containers/pages/Category';
import Dashboard from 'containers/pages/Dashboard/Dashboard';
import NewsDashboard from 'containers/pages/Dashboard/NewsDashboard';
import HomeDashboard from 'containers/pages/Dashboard/HomeDashboard';
import ResetPassword from 'containers/auth/ResetPassword';
import ResetPasswordConfirm from 'containers/auth/ResetPasswordConfirm';
import EditPost from 'containers/pages/Dashboard/EditPost';

const AppRoutes = () => (
  <Routes>
    <Route path="*" element={<Error404 />} />
    <Route path="/" element={<Home />} />
    <Route path="/noticia/:slug" element={<NewsDetail />} />
    <Route path="/:slug" element={<Category />} />

    <Route path="/administrador/home" element={<HomeDashboard />} />
    <Route path="/administrador/forgot_password" element={<ResetPassword />} />
    <Route path="/administrador/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
    <Route path="/administrador/dashboard" element={<Dashboard />} />
    <Route path="/administrador/news" element={<NewsDashboard />} />
    <Route path="/administrador/news/:slug" element={<EditPost />} />
  </Routes>
);

export default AppRoutes;