import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Divider, Image, Tab, Tabs } from "@heroui/react";
import { Socio, SocioBody, UpdateSocioParams } from "../../../types/socios";
import DynamicFaIcon from "../../../components/DynamicFaIcon";
import { ItemState } from "../../../types/commons";
import { indexDepartamentosRequest } from "../../../store/features/departamentos/departamentosSlice";
import { indexLocalidadesRequest } from "../../../store/features/localidades/localidadesSlice";
import { indexMutualistasRequest } from "../../../store/features/mutualistas/mutualistasSlice";
import { indexEmergenciasRequest } from "../../../store/features/emergencias/emergenciasSlice";
import PersonalSocioTab from "./tabs/PersonalSocioTab";
import { initUpdateSocioForm } from "../../../store/features/forms/UpdateSocioFormSlice";
import FamiliarSocioTab from "./tabs/FamiliarSocioTab";
import MedicalSocioTab from "./tabs/MedicalSocioTab";
import SchoolSocioTab from "./tabs/SchoolSocioTab";
import JobSocioTab from "./tabs/JobSocioTab";
import { GetAge } from "../../../helper/utils/Format";
import LoadingPage from "../../../components/layout/LoadingPage";
import ProgramsSocioTab from "./tabs/ProgramsSocioTab";
import GroupsSocioTab from "./tabs/GroupsSocioTab";
import { showSocioRequest, updateSocioRequest } from "../../../store/features/socios/sociosSlice";
import FichasSocioTab from "./tabs/FichasSocioTab";

const UpdateSociosPage: React.FC = () => {
    const { socioId } = useParams();
    const dispatch = useDispatch();

    const socio = useSelector((state: RootState) => state.socios as ItemState<Socio>);
    const form = useSelector((state: RootState) => state.updateSocioForm);


    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get("tab") ?? "personal-socio.data";

    useEffect(() => {
        dispatch(showSocioRequest(socioId ?? ""));
        dispatch(indexDepartamentosRequest());
        dispatch(indexLocalidadesRequest());
        dispatch(indexMutualistasRequest());
        dispatch(indexEmergenciasRequest());
    }, [])

    useEffect(() => {
        if (socio.data != null) {
            dispatch(initUpdateSocioForm(socio.data as SocioBody));
        }
    }, [socio.data]);

    useEffect(() => {
        if (socio.updateSuccess !== null) {
            if (socio.updateSuccess) {
                addToast({
                    title: "OK",
                    description: socio.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: socio.error,
                    color: 'danger',
                })
            }
        }
    }, [socio.updateSuccess])

    const handleTabChange = (key: string) => {
        setSearchParams({ tab: key });
    };


    if (socio.loading) {
        return (
            <LoadingPage />
        )
    }

    if (!socio.data) {
        return <div>Cargando...</div>;
    }

    if (socio.error) {
        return <div>{socio.error}</div>;
    }

    const handleUpdate = () => {
        var params: UpdateSocioParams = {
            id: socioId ?? "",
            body: form.data as SocioBody
        }

        console.log(params);

        dispatch(updateSocioRequest(params));
    }

    return (
        <form onSubmit={handleUpdate} className="w-full flex-col gap-2">
            <div className="w-full flex flex-row justify-start gap-4  mb-4">
                <div className="flex flex-col gap-4">
                    <div className="w-32 h-32 bg-gray-200 rounded-xl flex flex-col justify-center items-center">
                        {
                            socio.data.image_path ?
                                <Image
                                    src={socio.data.image_path}
                                />
                                :
                                <DynamicFaIcon name='FaUser' />
                        }
                    </div>
                    <Button
                        size="sm"
                        className="bg-cyan-900 text-white"
                        startContent={<DynamicFaIcon name={'FaUpload'} className="text-white" size={14} />}
                    >Subir foto</Button>
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-1">
                            <span className="font-medium">{`${socio.data.apellido_paterno ?? ''} ${socio.data.apellido_materno ?? ''} ${socio.data.nombre ?? ''} ${socio.data.segundo_nombre ?? ''}`}</span>
                            <span className="text-gray-500">{`(${socio.data.dni})`}</span>
                        </div>
                        <span>{`Edad: ${GetAge(socio.data.fecha_nacimiento)}`}</span>
                        <span>{`Celular: ${socio.data.celular ?? ''}`}</span>
                        <span>{`Email: ${socio.data.email ?? ''}`}</span>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Button
                            size="sm"
                            className=" bg-emerald-500 text-white"
                            startContent={<DynamicFaIcon name={'FaSave'} className="text-white" size={14} />}
                            type="submit"
                        >Guardar cambios</Button>
                        <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                        ><DynamicFaIcon name={'FaTrash'} className="text-rose-600" size={14} /></Button>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="w-full flex flex-col mt-4">

                <Tabs
                    selectedKey={initialTab}
                    onSelectionChange={(key) => handleTabChange(String(key))}
                >
                    <Tab key='personal-data' title='Datos Personales'>
                        <PersonalSocioTab />
                    </Tab>
                    <Tab key='familiar-data' title='Datos Familiares'>
                        <FamiliarSocioTab />
                    </Tab>
                    <Tab key='medical-data' title='Datos Médicos'>
                        <MedicalSocioTab />
                    </Tab>
                    <Tab key='education-data' title='Datos educativos'>
                        <SchoolSocioTab />
                    </Tab>
                    <Tab key='job-data' title='Datos Laborales'>
                        <JobSocioTab />
                    </Tab>
                    <Tab key='programs' title='Programas'>
                        <ProgramsSocioTab socioId={parseInt(socioId ?? "0")} />
                    </Tab>
                    <Tab key='groups' title='Grupos'>
                        <GroupsSocioTab socioId={parseInt(socioId ?? "0")} />
                    </Tab>
                    <Tab key='tickets' title='Tickets'></Tab>
                    <Tab key='notes' title='Observación'></Tab>
                    <Tab key='forms' title='Fichas'>
                        <FichasSocioTab socioId={parseInt(socioId ?? "0")} />
                    </Tab>
                </Tabs>
            </div>

        </form >
    );
}

export default UpdateSociosPage;