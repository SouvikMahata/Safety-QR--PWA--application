// src/routes/index.jsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

import AppLayout   from '../_layouts/AppLayout';
import AuthLayout  from '../_layouts/AuthLayout';
import PageLoader  from '../components/common/PageLoader';

// ── Route constants ────────────────────────────────
export const ROUTES = {
  QR_LANDING:     '/qr/:token',
  LOGIN:          '/auth/login',
  OTP:            '/auth/otp',
  REGISTER:       '/auth/register',
  DASHBOARD:      '/dashboard',
  PROFILE:        '/profile',
  PROFILE_EDIT:   '/profile/edit',
  STUDENTS:       '/students',
  STUDENT_NEW:    '/students/new',
  STUDENT_DETAIL: '/students/:id',
  STUDENT_EDIT:   '/students/:id/edit',
  CARDS:          '/cards',
  CARD_DETAIL:    '/cards/:id',
};

// ── Lazy pages ─────────────────────────────────────
const LoginPage       = lazy(() => import('../pages/auth/LoginPage'));
const OtpPage         = lazy(() => import('../pages/auth/OtpPage'));
const RegisterPage    = lazy(() => import('../pages/auth/RegisterPage'));
const DashboardPage   = lazy(() => import('../pages/dashboard/DashboardPage'));
const ProfilePage     = lazy(() => import('../pages/profile/ProfilePage'));
const ProfileEditPage = lazy(() => import('../pages/profile/ProfileEditPage'));
const StudentsPage    = lazy(() => import('../pages/profile/StudentsPage'));
const StudentDetail   = lazy(() => import('../pages/profile/StudentDetailPage'));
const StudentEdit     = lazy(() => import('../pages/profile/StudentEditPage'));
const CardsPage       = lazy(() => import('../pages/card/CardsPage'));
const CardDetail      = lazy(() => import('../pages/card/CardDetailPage'));
const QrLandingPage   = lazy(() => import('../pages/QrLandingPage'));
const NotFoundPage    = lazy(() => import('../pages/NotFoundPage'));

// ── Route guards ───────────────────────────────────
const RequireAuth = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

const RequireGuest = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.DASHBOARD} replace />;
};

// ── Suspense wrapper ───────────────────────────────
const S = ({ children }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

// ── Router ─────────────────────────────────────────
export const router = createBrowserRouter([
  // Public — QR scan landing (no auth required)
  {
    path: ROUTES.QR_LANDING,
    element: <S><QrLandingPage /></S>,
  },
  // Public home → redirect to login
  {
    path: '/',
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },

  // Guest-only (logged-out) routes
  {
    element: <RequireGuest />,
    children: [{
      element: <AuthLayout />,
      children: [
        { path: ROUTES.LOGIN,    element: <S><LoginPage /></S> },
        { path: ROUTES.OTP,      element: <S><OtpPage /></S> },
        { path: ROUTES.REGISTER, element: <S><RegisterPage /></S> },
      ],
    }],
  },

  // Protected app routes
  {
    element: <RequireAuth />,
    children: [{
      element: <AppLayout />,
      children: [
        { index: true,                 element: <Navigate to={ROUTES.DASHBOARD} replace /> },
        { path: ROUTES.DASHBOARD,      element: <S><DashboardPage /></S> },
        { path: ROUTES.PROFILE,        element: <S><ProfilePage /></S> },
        { path: ROUTES.PROFILE_EDIT,   element: <S><ProfileEditPage /></S> },
        { path: ROUTES.STUDENTS,       element: <S><StudentsPage /></S> },
        { path: ROUTES.STUDENT_NEW,    element: <S><StudentEdit /></S> },
        { path: ROUTES.STUDENT_DETAIL, element: <S><StudentDetail /></S> },
        { path: ROUTES.STUDENT_EDIT,   element: <S><StudentEdit /></S> },
        { path: ROUTES.CARDS,          element: <S><CardsPage /></S> },
        { path: ROUTES.CARD_DETAIL,    element: <S><CardDetail /></S> },
      ],
    }],
  },

  { path: '*', element: <S><NotFoundPage /></S> },
]);