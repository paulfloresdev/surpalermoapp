import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound'; // Componente 404
import Login from "../pages/public/Login.tsx";
import DashboardLayout from "../components/layout/DashboardLayout.tsx";

//  Socios
const SociosPage = React.lazy(() => import("../pages/socios/SociosPage.tsx"));
const UpdateSociosPage = React.lazy(() => import("../pages/socios/update/UpdateSociosPage.tsx"))

const AppRoutes = () => (
    <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/sia/login" element={
            <Suspense fallback={<div>Loading...</div>}>
                <Login />
            </Suspense>
        } />

        <Route path="/sia" element={<DashboardLayout />} key={"layout"}>
            <Route path="socios" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <SociosPage />
                </Suspense>
            } />
            <Route path="socios/:socioId" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <UpdateSociosPage />
                </Suspense>
            } />
        </Route>

    </Routes>
);

export default AppRoutes;