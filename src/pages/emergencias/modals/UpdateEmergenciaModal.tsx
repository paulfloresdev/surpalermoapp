import React, { useEffect, useState } from "react";
import { Emergencia, EmergenciaBody, UpdateEmergenciaParams } from "../../../types/emergencias";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { ControlledModal, ItemState } from "../../../types/commons";
import { updateEmergenciaRequest } from "../../../store/features/emergencias/emergenciasSlice";

interface UpdateEmergenciaModalProps extends ControlledModal {
    item: Emergencia;
    setItem: React.Dispatch<React.SetStateAction<Emergencia | undefined>>
}

const UpdateEmergenciaModal: React.FC<UpdateEmergenciaModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const emergencias = useSelector((state: RootState) => state.emergencias as ItemState<Emergencia>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(item.nombre ?? '');
    const [telefono, setTelefono] = useState<undefined | string>(item.telefono ?? undefined);
    const [direccion, setDireccion] = useState<undefined | string>(item.direccion ?? undefined);

    useEffect(() => {
        if (emergencias.updateSuccess !== null) {
            if (emergencias.updateSuccess) {
                addToast({
                    title: "OK",
                    description: "Emergencia actualizada exitosamente.",
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
    }, [emergencias.updateSuccess])

    const closeModal = () => {
        setNombre(undefined);
        setTelefono(undefined);
        setDireccion(undefined);
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        console.log('ejecutado');
        setShouldRefresh(false);
        closeModal();
    }

    const handleUpdate = () => {
        const check = !nombre?.trim();
        setCheckNombre(check);

        if (check) return;

        var body: EmergenciaBody = {
            nombre: nombre ?? "",
            telefono,
            direccion
        }

        var params: UpdateEmergenciaParams = {
            id: item.id.toString(),
            body
        }

        dispatch(updateEmergenciaRequest(params));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Editar Emergencia</ModalHeader>
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
                        onPress={handleUpdate}
                        isLoading={emergencias.loading}
                    >
                        Guardar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UpdateEmergenciaModal;