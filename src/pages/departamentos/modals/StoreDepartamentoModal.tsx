import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { Departamento, DepartamentoBody } from "../../../types/departamentos";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { storeDepartamentoRequest } from "../../../store/features/departamentos/departamentosSlice";

const StoreDepartamentoModal: React.FC<ControlledModal> = ({ value, setValue, setShouldRefresh }) => {
    const dispatch = useDispatch();

    const departamentos = useSelector((state: RootState) => state.departamentos as ItemState<Departamento>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(undefined);

    useEffect(() => {
        if (departamentos.storeSuccess !== null) {
            if (departamentos.storeSuccess) {
                addToast({
                    title: "OK",
                    description: departamentos.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: departamentos.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [departamentos.storeSuccess]);

    const closeModal = () => {
        setNombre(undefined);
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

        var body: DepartamentoBody = {
            nombre: nombre ?? "",
        }

        dispatch(storeDepartamentoRequest(body));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="sm">
            <ModalContent>
                <ModalHeader>Agregar Departamento</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <div className="w-full grid grid-cols-1 gap-8">
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
                    </div>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleStore}
                        isLoading={departamentos.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreDepartamentoModal;