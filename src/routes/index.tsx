import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound'; // Componente 404
import Login from "../pages/public/Login.tsx";
import DashboardLayout from "../components/layout/DashboardLayout.tsx";

//  SOCIOS
const SociosPage = React.lazy(() => import("../pages/socios/SociosPage.tsx"));
const UpdateSociosPage = React.lazy(() => import("../pages/socios/update/UpdateSociosPage.tsx"))
//  EMERGENCIAS
const EmergenciasPage = React.lazy(() => import("../pages/emergencias/EmergenciasPage.tsx"));
// MUTUALISTAS
const MutualistasPage = React.lazy(() => import("../pages/mutualistas/MutualistasPage.tsx"));

// FORMS
const AFormPage = React.lazy(() => import("../pages/fichas/AFormPage.tsx"));
const BFormPage = React.lazy(() => import("../pages/fichas/BFormPage.tsx"));
const CFormPage = React.lazy(() => import("../pages/fichas/CFormPage.tsx"));
const DFormPage = React.lazy(() => import("../pages/fichas/DFormPage.tsx"));
const EFormPage = React.lazy(() => import("../pages/fichas/EFormPage.tsx"));

const AppRoutes = () => (
    <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/sia/login" element={
            <Suspense fallback={<div>Loading...</div>}>
                <Login />
            </Suspense>
        } />

        <Route path="/sia" element={<DashboardLayout />} key={"layout"}>
            {/*  SOCIOS  */}
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
            {/*  EMERGENCIAS  */}
            <Route path="salud/emergencias" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <EmergenciasPage />
                </Suspense>
            } />
            {/*  MUTUALISTAS  */}
            <Route path="salud/mutualistas" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <MutualistasPage />
                </Suspense>
            } />
            {/* FICHAS */}
            <Route path="fichas/A/:socioId/:aFormId?" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <AFormPage />
                </Suspense>
            } />
            <Route path="fichas/B/:socioId/:bFormId?" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <BFormPage />
                </Suspense>
            } />
            <Route path="fichas/C/:socioId/:cFormId?" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <CFormPage />
                </Suspense>
            } />
            <Route path="fichas/D/:socioId/:dFormId?" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <DFormPage />
                </Suspense>
            } />
            <Route path="fichas/E/:socioId/:eFormId?" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <EFormPage />
                </Suspense>
            } />
        </Route>

    </Routes>
);

export default AppRoutes;