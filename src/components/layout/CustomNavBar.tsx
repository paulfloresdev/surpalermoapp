import React, { useCallback, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, DropdownItem, DropdownMenu, Dropdown, NavbarItem, DropdownTrigger, Button, Image, Link } from "@heroui/react";
import DynamicFaIcon from "../DynamicFaIcon";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configStore/store";
import { logOutRequest, meRequest } from "../../store/features/auth/authSlice";

const CustomNavBar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector(
        (state: RootState) => ({
            user: state.auth.user,
            loading: state.auth.loading,
        }),
        shallowEqual
    );

    const didRequestRef = React.useRef(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token && !user && !didRequestRef.current) {
            dispatch(meRequest());
            didRequestRef.current = true;
        }
    }, [dispatch, user]);

    useEffect(() => {
        console.log('Componente montado: SideBar');

        return () => {
            console.log('Componente desmontado: SideBar');
        };
    }, []);


    const handleLogout = useCallback(() => {
        dispatch(logOutRequest());
        navigate('/login');
    }, [dispatch, navigate]);

    return (
        <Navbar className="bg-white shadow-lg shadow-gray-200">
            <NavbarBrand className="gap-2">
                <Image src='/assets/favicon.png' className='w-12 rounded-none' />
            </NavbarBrand>
            <NavbarContent className="gap-4" justify="center">
                <NavbarItem>
                    <Link aria-current="page" color="foreground" href="/sia/socios" className="hover:text-emerald-500 text-sm mr-3">Socios</Link>
                </NavbarItem>
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className=" bg-gray-50 px-3 data-[hover=true]:bg-emerald-500 data-[hover=true]:text-white cursor-pointer"
                                startContent={<DynamicFaIcon name="FaAngleDown" size={20} className="group-data-[hover=true]:text-white" />}
                                variant="light"
                            >
                                Reportes
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="Reportes"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="socios-por"
                            description="Filtros avanzados de búsqueda"
                            onClick={() => navigate('/sia/reportes/socios')}
                        >
                            Socios
                        </DropdownItem>
                        <DropdownItem
                            key="tickets"
                            description="Filtros avanzados de búsqueda"
                            onClick={() => navigate('/sia/reportes/tickets')}
                        >
                            Tickets
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className=" bg-gray-50 px-3 data-[hover=true]:bg-emerald-500 data-[hover=true]:text-white cursor-pointer"
                                startContent={<DynamicFaIcon name="FaAngleDown" size={20} className="group-data-[hover=true]:text-white" />}
                                variant="light"
                            >
                                Salud
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="Salud"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="emergencias"
                            onClick={() => navigate('/sia/salud/emergencias')}
                        >
                            Emergencias
                        </DropdownItem>
                        <DropdownItem
                            key="sociedades-medicas"
                            onClick={() => navigate('/sia/salud/mutualistas')}
                        >
                            Mutualistas
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className=" bg-gray-50 px-3 data-[hover=true]:bg-emerald-500 data-[hover=true]:text-white cursor-pointer"
                                startContent={<DynamicFaIcon name="FaAngleDown" size={20} className="group-data-[hover=true]:text-white" />}
                                variant="light"
                            >
                                Usuarios y personal
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="usuarios-personal"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="usuarios"
                            onClick={() => navigate('/sia/usuarios')}
                        >
                            Usuarios
                        </DropdownItem>
                        <DropdownItem
                            key="funcionarios"
                            onClick={() => navigate('/sia/funcionarios')}
                        >
                            Funcionarios
                        </DropdownItem>
                        <DropdownItem
                            key="medicos"
                            onClick={() => navigate('/sia/medicos')}
                        >
                            Médicos
                        </DropdownItem>
                        <DropdownItem
                            key="docentes"
                            onClick={() => navigate('/sia/docentes')}
                        >
                            Docentes
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className=" bg-gray-50 px-3 data-[hover=true]:bg-emerald-500 data-[hover=true]:text-white cursor-pointer"
                                startContent={<DynamicFaIcon name="FaAngleDown" size={20} className="group-data-[hover=true]:text-white" />}
                                variant="light"
                            >
                                Mantenimiento
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="mantenimiento"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="grupos"
                            onClick={() => navigate('/sia/mantenimiento/grupos')}
                        >
                            Grupos
                        </DropdownItem>
                        <DropdownItem
                            key="programas"
                            onClick={() => navigate('/sia/mantenimiento/programas')}
                        >
                            Programas
                        </DropdownItem>
                        <DropdownItem
                            key="departamentos"
                            onClick={() => navigate('/sia/mantenimiento/departamentos')}
                        >
                            Departamentos
                        </DropdownItem>
                        <DropdownItem
                            key="hogares"
                            onClick={() => navigate('/sia/mantenimiento/hogares')}
                        >
                            Hogares
                        </DropdownItem>
                        <DropdownItem
                            key="tipo-profesional"
                            onClick={() => navigate('/sia/mantenimiento/tipo-profesional')}
                        >
                            Tipo de profesional
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
            <NavbarContent as="div" justify="end">
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className=" data-[hover=true]:bg-white data-[hover=true]:text-emerald-500 cursor-pointer"
                                endContent={<DynamicFaIcon name="FaUser" size={15} className="text-gray-900 group-data-[hover=true]:text-emerald-500" />}
                                variant="light"
                            >
                                {user ? user.name : 'Invitado'}
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="perfil"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="socios-por"
                            onClick={() => navigate('/sia/reportes/socios')}
                        >
                            Editar perfil
                        </DropdownItem>
                        <DropdownItem
                            key="tickets"
                            color="danger"
                            className="text-danger"
                            onClick={() => navigate('/sia/reportes/tickets')}
                        >
                            Cerrar sesión
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar >
    );
}

export default CustomNavBar;