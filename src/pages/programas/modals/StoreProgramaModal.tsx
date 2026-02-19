import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { Programa, ProgramaBody } from "../../../types/programas";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { storeProgramaRequest } from "../../../store/features/programas/programasSlice";

const StoreProgramaModal: React.FC<ControlledModal> = ({ value, setValue, setShouldRefresh }) => {
    const dispatch = useDispatch();

    const programas = useSelector((state: RootState) => state.programas as ItemState<Programa>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(undefined);
    const [valorHora, setValorHora] = useState<undefined | number>(undefined);

    useEffect(() => {
        if (programas.storeSuccess !== null) {
            if (programas.storeSuccess) {
                addToast({
                    title: "OK",
                    description: programas.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: programas.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [programas.storeSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setValorHora(undefined);
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

        var body: ProgramaBody = {
            nombre: nombre ?? "",
            valor_hora: valorHora ?? undefined,
            activo: true
        }

        dispatch(storeProgramaRequest(body));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Agregar Programa</ModalHeader>
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
                            type="number"
                            placeholder="Valor hora"
                            label="Valor hora*"
                            labelPlacement="outside"
                            value={valorHora?.toString() ?? ""}
                            min="0"
                            step="0.01"
                            onChange={(e) => {
                                const value = e.target.value;

                                // Permite vacío mientras escribe
                                if (value === "") {
                                    setValorHora(undefined);
                                    return;
                                }

                                // Solo números positivos enteros o decimales
                                const regex = /^\d*\.?\d*$/;
                                if (!regex.test(value)) return;

                                setValorHora(parseFloat(value));
                            }}
                        />
                    </div>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleStore}
                        isLoading={programas.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreProgramaModal;