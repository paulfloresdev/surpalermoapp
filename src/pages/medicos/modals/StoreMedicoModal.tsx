import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { Medico, MedicoBody } from "../../../types/medicos";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { storeMedicoRequest } from "../../../store/features/medicos/medicosSlice";

const StoreMedicoModal: React.FC<ControlledModal> = ({ value, setValue, setShouldRefresh }) => {
    const dispatch = useDispatch();

    const medicos = useSelector((state: RootState) => state.medicos as ItemState<Medico>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(undefined);
    const [telefonoConsultorio, setTelefonoConsultorio] = useState<undefined | string>(undefined);
    const [telefonoParticular, setTelefonoParticular] = useState<undefined | string>(undefined);
    const [celular, setCelular] = useState<undefined | string>(undefined);
    const [email, setEmail] = useState<undefined | string>(undefined);
    const [direccion, setDireccion] = useState<undefined | string>(undefined);

    useEffect(() => {
        if (medicos.storeSuccess !== null) {
            if (medicos.storeSuccess) {
                addToast({
                    title: "OK",
                    description: medicos.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: medicos.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [medicos.storeSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setTelefonoConsultorio(undefined);
        setTelefonoParticular(undefined);
        setCelular(undefined);
        setEmail(undefined);
        setDireccion(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleStore = () => {
        const ckNombre = !nombre?.trim();
        setCheckNombre(ckNombre);

        const check = ckNombre;

        if (check) return;

        var body: MedicoBody = {
            nombre: nombre ?? "",
            telefono_consultorio: telefonoConsultorio ?? "",
            telefono_particular: telefonoParticular ?? "",
            celular: celular ?? "",
            email: email ?? "",
            direccion: direccion ?? "",
            eliminado: false,
        }

        dispatch(storeMedicoRequest(body));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Agregar Médico</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <div className="w-full grid grid-cols-2 gap-8">
                        <Input
                            required
                            isInvalid={checkNombre}
                            placeholder="Nombre"
                            label="Nombre*"
                            labelPlacement="outside"
                            value={nombre}
                            onChange={(e) => {
                                setNombre(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Teléfono consultorio"
                            label="Teléfono consultorio"
                            labelPlacement="outside"
                            value={telefonoConsultorio}
                            inputMode="numeric"
                            pattern="\d*"
                            onChange={(e) => {
                                const soloNumeros = e.target.value.replace(/\D/g, "");

                                setTelefonoConsultorio(soloNumeros);
                            }}
                            onPaste={(e) => {
                                const pasted = e.clipboardData.getData("Text");
                                if (/\D/.test(pasted)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <Input
                            placeholder="Teléfono particular"
                            label="Teléfono particular"
                            labelPlacement="outside"
                            value={telefonoParticular}
                            inputMode="numeric"
                            pattern="\d*"
                            onChange={(e) => {
                                const soloNumeros = e.target.value.replace(/\D/g, "");

                                setTelefonoParticular(soloNumeros);
                            }}
                            onPaste={(e) => {
                                const pasted = e.clipboardData.getData("Text");
                                if (/\D/.test(pasted)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <Input
                            placeholder="Celular"
                            label="Celular"
                            labelPlacement="outside"
                            value={celular}
                            inputMode="numeric"
                            pattern="\d*"
                            onChange={(e) => {
                                const soloNumeros = e.target.value.replace(/\D/g, "");

                                setCelular(soloNumeros);
                            }}
                            onPaste={(e) => {
                                const pasted = e.clipboardData.getData("Text");
                                if (/\D/.test(pasted)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <Input
                            required
                            placeholder="Email"
                            label="Email"
                            labelPlacement="outside"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Dirección"
                            label="Dirección*"
                            labelPlacement="outside"
                            value={direccion}
                            onChange={(e) => {
                                setDireccion(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleStore}
                        isLoading={medicos.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreMedicoModal;