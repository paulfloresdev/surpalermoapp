import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound'; // Componente 404
import Login from "../pages/public/Login.tsx";
import DashboardLayout from "../components/layout/DashboardLayout.tsx";

//  DEBUG
const DebugPage = React.lazy(() => import("../pages/DebugPage.tsx"));

//  SOCIOS
const SociosPage = React.lazy(() => import("../pages/socios/SociosPage.tsx"));
const UpdateSociosPage = React.lazy(() => import("../pages/socios/update/UpdateSociosPage.tsx"))
const StoreTicketPage = React.lazy(() => import("../pages/socios/update/tickets/StoreTicketPage.tsx"));
const FacturarByTicketPage = React.lazy(() => import("../pages/socios/update/tickets/FacturarByTicketPage.tsx"));
const UpdateTicketPage = React.lazy(() => import("../pages/socios/update/tickets/UpdateTicketPage.tsx"));

//  EMERGENCIAS
const EmergenciasPage = React.lazy(() => import("../pages/emergencias/EmergenciasPage.tsx"));
// MUTUALISTAS
const MutualistasPage = React.lazy(() => import("../pages/mutualistas/MutualistasPage.tsx"));
//  DEPARTAMENTOS
const DepartamentosPage = React.lazy(() => import("../pages/departamentos/DepartamentosPage.tsx"));
//  PROGRAMAS
const ProgramasPage = React.lazy(() => import("../pages/programas/ProgramasPage.tsx"));
// GRUPOS
const GruposPage = React.lazy(() => import("../pages/grupos/GruposPage.tsx"));
//  GRUPOS DETAIL
const GrupoDetailPage = React.lazy(() => import("../pages/grupos/details/GrupoDetailPage.tsx"));
//  GROUP FORM
const StoreGroupFormPage = React.lazy(() => import("../pages/grupos/details/groupForms/StoreGroupFormPage.tsx"));
const UpdateGroupFormPage = React.lazy(() => import("../pages/grupos/details/groupForms/UpdateGroupFormPage.tsx"));
//  DOCENTE FORM
const StoreDocenteFormPage = React.lazy(() => import("../pages/grupos/details/docenteForms/StoreDocenteFormPage.tsx"));
const UpdateDocenteFormPage = React.lazy(() => import("../pages/grupos/details/docenteForms/UpdateDocenteFormPage.tsx"));
//  FUNCIONARIOS
const FuncionariosPage = React.lazy(() => import("../pages/funcionarios/FuncionariosPage.tsx"));
//  DOCENTES
const DocentesPage = React.lazy(() => import("../pages/docentes/DocentesPage.tsx"));
//  MEDICOS
const MedicosPage = React.lazy(() => import("../pages/medicos/MedicosPage.tsx"));
//  USUARIOS
const UsuariosPage = React.lazy(() => import("../pages/usuarios/UsuariosPage.tsx"));

// FORMS
const AFormPage = React.lazy(() => import("../pages/socios/update/fichas/AFormPage.tsx"));
const BFormPage = React.lazy(() => import("../pages/socios/update/fichas/BFormPage.tsx"));
const CFormPage = React.lazy(() => import("../pages/socios/update/fichas/CFormPage.tsx"));
const DFormPage = React.lazy(() => import("../pages/socios/update/fichas/DFormPage.tsx"));
const EFormPage = React.lazy(() => import("../pages/socios/update/fichas/EFormPage.tsx"));

const AppRoutes = () => (
    <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/sia/login" element={
            <Suspense fallback={<div>Loading...</div>}>
                <Login />
            </Suspense>
        } />

        <Route path="/debug" element={
            <Suspense fallback={<div>Loading...</div>}>
                <DebugPage />
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

            {/* TICKETS SOCIO */}
            <Route path="socios/:socioId/visita" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <StoreTicketPage />
                </Suspense>
            } />
            <Route path="socios/:socioId/facturar-ticket" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <FacturarByTicketPage />
                </Suspense>
            } />
            <Route path="socios/:socioId/actualizar-visita/:ticketId" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <UpdateTicketPage />
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
            {/*  DEPARTAMENTOS  */}
            <Route path="mantenimiento/departamentos" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <DepartamentosPage />
                </Suspense>
            } />
            {/*  PROGRAMAS  */}
            <Route path="mantenimiento/programas" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <ProgramasPage />
                </Suspense>
            } />
            {/*  GRUPOS  */}
            <Route path="mantenimiento/grupos" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <GruposPage />
                </Suspense>
            } />
            {/*  GRUPOS DETAIL  */}
            <Route path="mantenimiento/grupos/:grupoId/detalle" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <GrupoDetailPage />
                </Suspense>
            } />
            {/* STORE GROUP FORM*/}
            <Route path="mantenimiento/grupos/:grupoId/detalle/ficha" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <StoreGroupFormPage />
                </Suspense>
            } />
            {/* UPDATE GROUP FORM*/}
            <Route path="mantenimiento/grupos/:grupoId/detalle/ficha/:formId" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <UpdateGroupFormPage />
                </Suspense>
            } />
            {/* STORE DOCENTE FORM*/}
            <Route path="mantenimiento/grupos/:grupoId/detalle/ficha-docente" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <StoreDocenteFormPage />
                </Suspense>
            } />
            {/* UPDATE DOCENTE FORM*/}
            <Route path="mantenimiento/grupos/:grupoId/detalle/ficha-docente/:formId" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <UpdateDocenteFormPage />
                </Suspense>
            } />
            {/*  FUNCIONARIOS  */}
            <Route path="funcionarios" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <FuncionariosPage />
                </Suspense>
            } />
            {/*  DOCENTES  */}
            <Route path="docentes" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <DocentesPage />
                </Suspense>
            } />
            {/*  MEDICOS  */}
            <Route path="medicos" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <MedicosPage />
                </Suspense>
            } />
            {/*  USUARIOS  */}
            <Route path="usuarios" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <UsuariosPage />
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