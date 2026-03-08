import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../_layouts/AppLayout";
import AuthLayout from "../_layouts/AuthLayout";
import PageLoader from "../components/common/PageLoader";

// Lazy pages
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const OtpPage = lazy(() => import("../pages/auth/OtpPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const ProfileEditPage = lazy(() => import("../pages/profile/ProfileEditPage"));
const StudentsPage = lazy(() => import("../pages/profile/StudentsPage"));
const StudentDetail = lazy(() => import("../pages/profile/StudentDetailPage"));
const StudentEdit = lazy(() => import("../pages/profile/StudentEditPage"));
const CardsPage = lazy(() => import("../pages/card/CardsPage"));
const CardDetail = lazy(() => import("../pages/card/CardDetailPage"));
const QrLandingPage = lazy(() => import("../pages/QrLandingPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Suspense wrapper
const S = ({ children }) => (
    <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export const AllRoutes = createBrowserRouter([
    {
        path: "/qr/:id",
        element: (
            <S>
                <QrLandingPage />
            </S>
        ),
    },

    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: (
                    <S>
                        <LoginPage />
                    </S>
                ),
            },
            {
                path: "/otp",
                element: (
                    <S>
                        <OtpPage />
                    </S>
                ),
            },
            {
                path: "/register",
                element: (
                    <S>
                        <RegisterPage />
                    </S>
                ),
            },
        ],
    },

    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: (
                    <S>
                        <DashboardPage />
                    </S>
                ),
            },
            {
                path: "/dashboard",
                element: (
                    <S>
                        <DashboardPage />
                    </S>
                ),
            },
            {
                path: "/profile",
                element: (
                    <S>
                        <ProfilePage />
                    </S>
                ),
            },
            {
                path: "/profile/edit",
                element: (
                    <S>
                        <ProfileEditPage />
                    </S>
                ),
            },
            {
                path: "/students",
                element: (
                    <S>
                        <StudentsPage />
                    </S>
                ),
            },
            {
                path: "/students/new",
                element: (
                    <S>
                        <StudentEdit />
                    </S>
                ),
            },
            {
                path: "/students/:id",
                element: (
                    <S>
                        <StudentDetail />
                    </S>
                ),
            },
            {
                path: "/students/:id/edit",
                element: (
                    <S>
                        <StudentEdit />
                    </S>
                ),
            },
            {
                path: "/cards",
                element: (
                    <S>
                        <CardsPage />
                    </S>
                ),
            },
            {
                path: "/cards/:id",
                element: (
                    <S>
                        <CardDetail />
                    </S>
                ),
            },
        ],
    },

    {
        path: "*",
        element: (
            <S>
                <NotFoundPage />
            </S>
        ),
    },
]);