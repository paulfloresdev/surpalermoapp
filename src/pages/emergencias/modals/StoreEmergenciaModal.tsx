import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Emergencia, EmergenciaBody } from "../../../types/emergencias";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from "@heroui/react";
import { storeEmergenciaRequest } from "../../../store/features/emergencias/emergenciasSlice";

const StoreEmergenciaModal: React.FC<ControlledModal> = ({ value, setValue, setShouldRefresh }) => {
    const dispatch = useDispatch();

    const emergencias = useSelector((state: RootState) => state.emergencias as ItemState<Emergencia>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(undefined);
    const [telefono, setTelefono] = useState<undefined | string>(undefined);
    const [direccion, setDireccion] = useState<undefined | string>(undefined);

    useEffect(() => {
        if (emergencias.storeSuccess !== null) {
            if (emergencias.storeSuccess) {
                addToast({
                    title: "OK",
                    description: emergencias.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: emergencias.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [emergencias.storeSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setTelefono(undefined);
        setDireccion(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleStore = () => {
        const check = !nombre?.trim();
        setCheckNombre(check);

        if (check) return;

        var body: EmergenciaBody = {
            nombre: nombre ?? "",
            telefono,
            direccion
        }

        dispatch(storeEmergenciaRequest(body));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Agregar Emergencia</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <div className="w-full grid grid-cols-2 gap-8">
                        <Input
                            required
                            placeholder="Nombre"
                            label="Nombre*"
                            labelPlacement="outside"
                            color={checkNombre ? 'danger' : 'default'}
                            value={nombre}
                            onChange={(e) => {
                                setNombre(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Teléfono"
                            label="Teléfono"
                            labelPlacement="outside"
                            value={telefono}
                            inputMode="numeric"
                            pattern="\d*"
                            onChange={(e) => {
                                const soloNumeros = e.target.value.replace(/\D/g, "");

                                setTelefono(soloNumeros);
                            }}
                            onPaste={(e) => {
                                const pasted = e.clipboardData.getData("Text");
                                if (/\D/.test(pasted)) {
                                    e.preventDefault();
                                }
                            }}
                        />


                    </div>
                    <Textarea
                        placeholder="Dirección"
                        label="Dirección"
                        labelPlacement="outside"
                        value={direccion}
                        onChange={(e) => {
                            setDireccion(e.target.value);
                        }}
                    />
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleStore}
                        isLoading={emergencias.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreEmergenciaModal;