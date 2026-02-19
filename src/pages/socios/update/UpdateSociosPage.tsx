import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Card, Divider, Image, Modal, ModalBody, ModalContent, Tab, Tabs } from "@heroui/react";
import { Socio, SocioBody, UpdateSocioParams, UploadSocioImageParams } from "../../../types/socios";
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
import {
    deleteSocioImageRequest,
    showSocioRequest,
    updateSocioRequest,
    uploadSocioImageRequest,
} from "../../../store/features/socios/sociosSlice";
import FichasSocioTab from "./tabs/FichasSocioTab";
import TicketsSocioTab from "./tabs/TicketsSocioTab";
import SocioFilesTab from "./tabs/SocioFilesTab";

const storageUrl = import.meta.env.VITE_SITE_BASE_STORAGE_URL_BACKEND;

const UpdateSociosPage: React.FC = () => {
    const { socioId } = useParams();
    const dispatch = useDispatch();

    const socio = useSelector((state: RootState) => state.socios as ItemState<Socio>);
    const form = useSelector((state: RootState) => state.updateSocioForm);
    const permissions = useSelector((state: RootState) => state.auth.user?.permissions);

    const [isEditable, setIsEditable] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Para diferenciar: updateSuccess puede ser "guardar" o "upload imagen"
    const [lastAction, setLastAction] = useState<"update" | "uploadImage" | "deleteImage" | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get("tab") ?? "personal-data";

    const [openImageModal, setOpenImageModal] = useState(false);

    useEffect(() => {
        dispatch(showSocioRequest(socioId ?? ""));
        dispatch(indexDepartamentosRequest());
        dispatch(indexLocalidadesRequest());
        dispatch(indexMutualistasRequest());
        dispatch(indexEmergenciasRequest());
        setIsEditable(permissions?.includes('socio-editar') ?? false);
    }, []);

    useEffect(() => {
        if (socio.data != null) {
            dispatch(initUpdateSocioForm(socio.data as SocioBody));
        }
    }, [socio.data]);

    // Toast para update normal o upload imagen (ambos usan updateSuccess)
    useEffect(() => {
        if (socio.updateSuccess !== null) {
            // Si fue upload de imagen
            if (lastAction === "uploadImage") {
                addToast({
                    title: socio.updateSuccess ? "OK" : "Error",
                    description: socio.updateSuccess ? socio.message : socio.error,
                    color: socio.updateSuccess ? "success" : "danger",
                });

                // si por alguna razón el backend no devolvió el socio completo, refetch
                if (socio.updateSuccess) dispatch(showSocioRequest(socioId ?? ""));

                setLastAction(null);
                return;
            }

            // Si fue update normal
            if (lastAction === "update" || lastAction === null) {
                addToast({
                    title: socio.updateSuccess ? "OK" : "Error",
                    description: socio.updateSuccess ? socio.message : socio.error,
                    color: socio.updateSuccess ? "success" : "danger",
                });
                setLastAction(null);
            }
        }
    }, [socio.updateSuccess]);

    // Toast para delete imagen (usa destroySuccess)
    useEffect(() => {
        if (socio.destroySuccess !== null && lastAction === "deleteImage") {
            addToast({
                title: socio.destroySuccess ? "OK" : "Error",
                description: socio.destroySuccess ? socio.message : socio.error,
                color: socio.destroySuccess ? "success" : "danger",
            });

            if (socio.destroySuccess) dispatch(showSocioRequest(socioId ?? ""));

            setLastAction(null);
        }
    }, [socio.destroySuccess]);

    const handleTabChange = (key: string) => {
        setSearchParams({ tab: key });
    };

    if (socio.loading && !socio.data) {
        return <LoadingPage />;
    }

    if (!socio.data) {
        return <div>Cargando...</div>;
    }

    if (socio.error) {
        return <div>{socio.error}</div>;
    }

    const handleUpdate = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const params: UpdateSocioParams = {
            id: socioId ?? "",
            body: form.data as SocioBody,
        };

        setLastAction("update");
        dispatch(updateSocioRequest(params));
    };

    const openFilePicker = () => fileInputRef.current?.click();

    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !socioId) return;

        const payload: UploadSocioImageParams = { id: socioId, file };

        setLastAction("uploadImage");
        dispatch(uploadSocioImageRequest(payload));

        // Permite re-seleccionar el mismo archivo
        e.target.value = "";
    };

    const handleDeleteImage = () => {
        if (!socioId) return;

        setLastAction("deleteImage");
        dispatch(deleteSocioImageRequest(socioId));
    };

    return (
        <form onSubmit={handleUpdate} className="w-full flex flex-col gap-2">
            {/* input hidden para subir imagen */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileSelected}
            />

            <div className="w-full flex flex-row justify-start gap-4  mb-4">
                <Card className="flex flex-col gap-4 p-3">
                    <div className={`${socio.data.image_path ? 'bg-white' : 'bg-gray-200'} w-36 h-36 rounded-md flex flex-col justify-center items-center overflow-hidden`}>
                        {socio.data.image_path ? (
                            <Image
                                className="rounded-md cursor-pointer object-cover"
                                src={`${storageUrl}/${socio.data.image_path}`}
                                onClick={() => setOpenImageModal(true)}
                            />

                        ) : (
                            <DynamicFaIcon name="FaUser" />
                        )}
                    </div>

                    {
                        !isEditable ? <></> :
                            <div className="max-w-36 grid grid-cols-2 gap-2">
                                <Button
                                    size="sm"
                                    className="bg-cyan-900 text-white"
                                    startContent={<DynamicFaIcon name={"FaUpload"} className="text-white" size={14} />}
                                    onPress={openFilePicker}
                                    isLoading={socio.loading && lastAction === "uploadImage"}
                                >
                                </Button>

                                <Button
                                    size="sm"
                                    variant="flat"
                                    color="danger"
                                    isDisabled={!socio.data.image_path}
                                    onPress={handleDeleteImage}
                                    isLoading={socio.loading && lastAction === "deleteImage"}
                                    startContent={<DynamicFaIcon name={"FaTrash"} className="text-rose-600" size={14} />}
                                >
                                </Button>
                            </div>
                    }
                </Card>

                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-1">
                            <span className="font-medium">{`${socio.data.apellido_paterno ?? ""} ${socio.data.apellido_materno ?? ""} ${socio.data.nombre ?? ""} ${socio.data.segundo_nombre ?? ""}`}</span>
                            <span className="text-gray-500">{`${socio.data.dni ? `(${socio.data.dni})` : ``}`}</span>
                        </div>
                        <span>{`Edad: ${GetAge(socio.data.fecha_nacimiento) === "" ? "----" : GetAge(socio.data.fecha_nacimiento)}`}</span>
                        <span>{`Celular: ${socio.data.celular ?? "----"}`}</span>
                        <span>{`Email: ${socio.data.email ?? "----"}`}</span>
                    </div>


                    {
                        !isEditable ? <></> :
                            <div className="flex flex-row gap-4">
                                <Button
                                    size="sm"
                                    className=" bg-emerald-500 text-white"
                                    startContent={<DynamicFaIcon name={"FaSave"} className="text-white" size={14} />}
                                    type="submit"
                                    isLoading={socio.loading && lastAction === "update"}
                                >
                                    Guardar cambios
                                </Button>

                                <Button size="sm" variant="flat" color="danger">
                                    <DynamicFaIcon name={"FaTrash"} className="text-rose-600" size={14} />
                                </Button>
                            </div>
                    }
                </div>
            </div>

            <Divider />

            <div className="w-full flex flex-col mt-4">
                <Tabs selectedKey={initialTab} onSelectionChange={(key) => handleTabChange(String(key))}>
                    <Tab key="personal-data" title="Datos Personales">
                        <PersonalSocioTab editable={isEditable} />
                    </Tab>
                    <Tab key="familiar-data" title="Datos Familiares">
                        <FamiliarSocioTab editable={isEditable} />
                    </Tab>
                    <Tab key="medical-data" title="Datos Médicos">
                        <MedicalSocioTab editable={isEditable} />
                    </Tab>
                    <Tab key="education-data" title="Datos educativos">
                        <SchoolSocioTab editable={isEditable} />
                    </Tab>
                    <Tab key="job-data" title="Datos Laborales">
                        <JobSocioTab editable={isEditable} />
                    </Tab>
                    {
                        !permissions?.includes('socio-programas') ? <></> :
                            <Tab key="programs" title="Programas">
                                <ProgramsSocioTab socioId={parseInt(socioId ?? "0")} />
                            </Tab>
                    }
                    {
                        !permissions?.includes('socio-grupos') ? <></> :
                            <Tab key="groups" title="Grupos">
                                <GroupsSocioTab socioId={parseInt(socioId ?? "0")} />
                            </Tab>
                    }
                    {
                        !permissions?.includes('socio-visitas') ? <></> :
                            <Tab key="tickets" title="Visitas">
                                <TicketsSocioTab socioId={parseInt(socioId ?? "0")} />
                            </Tab>
                    }
                    {
                        !permissions?.includes('socio-fichas') ? <></> :
                            <Tab key="forms" title="Fichas">
                                <FichasSocioTab socioId={parseInt(socioId ?? "0")} />
                            </Tab>
                    }
                    {
                        !permissions?.includes('socio-ver-archivos') ? <></> :
                            <Tab key="files" title="Archivos">
                                <SocioFilesTab
                                    socioId={parseInt(socioId ?? "0")}
                                    editable={permissions?.includes('socio-actualizar-archivos')}
                                />
                            </Tab>
                    }
                </Tabs>
            </div>
            <Modal
                isOpen={openImageModal}
                onOpenChange={setOpenImageModal}
                size="xl"
            >
                <ModalContent>
                    <ModalBody className="flex justify-center items-center p-4">
                        <img
                            src={`${storageUrl}/${socio.data.image_path}`}
                            alt="Imagen socio"
                            className="max-w-full max-h-[80vh] rounded-lg object-contain"
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>

        </form>
    );
};

export default UpdateSociosPage;
