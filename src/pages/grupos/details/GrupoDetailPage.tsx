import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { RootState } from "../../../store/configStore/store";
import { ItemState } from "../../../types/commons";
import { Grupo } from "../../../types/grupos";
import { showGrupoRequest } from "../../../store/features/grupos/gruposSlice";
import { Button, Divider, Tab, Tabs } from "@heroui/react";
import SociosOfGrupoTab from "./tabs/SociosOfGrupoTab";
import GroupFormsTab from "./tabs/GroupFormsTab";
import DocenteGrupoPivotsTab from "./tabs/DocenteGrupoPivotsTab";
import CoordinadoresTab from "./tabs/CoordinadoresTab";
import DocenteFormsTab from "./tabs/DocenteFormsTab";

const GrupoDetailPage: React.FC = () => {
    const { grupoId } = useParams();
    const dispatch = useDispatch();

    const grupo = useSelector((state: RootState) => state.grupos as ItemState<Grupo>);
    const permissions = useSelector((state: RootState) => state.auth.user?.permissions);

    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get("tab") ?? "socios";

    useEffect(() => {
        dispatch(showGrupoRequest(grupoId ?? ""));
    }, [])

    const handleTabChange = (key: string) => {
        setSearchParams({ tab: key });
    };

    if (grupo.loading && !grupo.data) {
        return <div>Cargando...</div>;
    }

    if (!grupo.data) {
        return <div>Grupo no encontrado</div>;
    }

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-col gap-2 mb-4">
                <div className="flex flex-row gap-2 items-center">
                    <span className="font-medium">{grupo.data.nombre}</span>
                    <Button
                        size='sm'
                        variant='flat'
                        color={grupo.data.activo ? "success" : "danger"}
                        className='w-12 font-semibold'
                    >
                        {grupo.data.activo ? "Activo" : "Inactivo"}
                    </Button>
                </div>
                <div className="w-full grid grid-cols-2">
                    <span>{`Tipo: ${grupo.data.tipo ?? '---'}`}</span>
                    <span>{`Hora inicio: ${grupo.data.hora_inicio ?? '---'}`}</span>
                    <span>{`Programa: ${grupo.data.programa?.nombre ?? '---'}`}</span>
                    <span>{`Hora fin: ${grupo.data.hora_fin ?? '---'}`}</span>
                    <span>{`Costo base: $${grupo.data.costo_base ?? '---'}`}</span>
                    <p>{`Descripción: ${grupo.data.desripcion ?? '---'}`}</p>
                </div>
            </div>
            <Divider />
            <div className="w-full flex flex-col mt-4">
                <Tabs selectedKey={initialTab} onSelectionChange={(key) => handleTabChange(String(key))}>
                    <Tab key="socios" title="Socios">
                        <SociosOfGrupoTab grupoId={parseInt(grupoId ?? "0")} />
                    </Tab>
                    <Tab key={'docentes'} title="Docentes">
                        <DocenteGrupoPivotsTab
                            grupoId={parseInt(grupoId ?? "0")}
                            editable={permissions?.includes('grupos-actualizar-docentes')}
                        />
                    </Tab>
                    <Tab key={'coordinadores'} title="Coordinadores">
                        <CoordinadoresTab
                            grupoId={parseInt(grupoId ?? "0")}
                            editable={permissions?.includes('grupos-actualizar-coordinadores')}
                        />
                    </Tab>
                    <Tab key={'forms'} title="Evaluaciones grupales">
                        <GroupFormsTab
                            grupoId={parseInt(grupoId ?? "0")}
                            editable={permissions?.includes('grupos-fichas-grupal')}
                        />
                    </Tab>
                    <Tab key={'forms-docente'} title="Evaluaciones docentes">
                        <DocenteFormsTab
                            grupoId={parseInt(grupoId ?? "0")}
                            editable={permissions?.includes('grupos-fichas-docente')}
                        />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );



}

export default GrupoDetailPage;