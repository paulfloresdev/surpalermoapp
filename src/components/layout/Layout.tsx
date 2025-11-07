import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CustomNavBar from "./CustomNavBar";

const Layout: React.FC = () => {
    const location = useLocation();

    // Determinar el valor de `page` en base a la URL
    const path = location.pathname;
    let page = 0;

    if (path.includes("/dashboard/months")) page = 1;
    else if (path.includes("/dashboard/incomes")) page = 2;
    else if (path.includes("/dashboard/contacts")) page = 3;
    // Añade más condiciones según sea necesario

    console.log("Layout renderizado con page =", page);

    useEffect(() => {
        console.log('Componente montado: Layout');
        return () => {
            console.log('Componente desmontado : Layout');
        };
    }, []);

    return (
        // Contenedor principal que ocupa toda la altura del navegador (viewport)
        <div className="flex flex-col h-screen bg-white">
            {/* ESTE ES EL ENCABEZADO FIJO */}
            <div className="w-full sticky top-0 z-10">
                <CustomNavBar />
            </div>

            {/* Contenedor del contenido principal que crece y permite el scroll */}
            <div className="flex-grow overflow-y-auto">
                <div className="max-w-7xl mx-auto px-2 pt-6 pb-20">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;