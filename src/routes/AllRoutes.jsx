import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// import all pages
const LandingPage = lazy(() => import('../pages/landing'))
const Login = lazy(() => import('../pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'))

function AllRoutes() {
    return (
        // <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterPage />} />
        </Routes>
        // </Suspense>
    )
}

export default AllRoutes