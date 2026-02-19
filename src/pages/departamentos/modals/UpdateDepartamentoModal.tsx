import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Departamento, DepartamentoBody, UpdateDepartamentoParams } from "../../../types/departamentos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { updateDepartamentoRequest } from "../../../store/features/departamentos/departamentosSlice";

interface UpdateDepartamentoModalProps extends ControlledModal {
    item: Departamento;
    setItem: React.Dispatch<React.SetStateAction<Departamento | undefined>>
}

const UpdateDepartamentoModal: React.FC<UpdateDepartamentoModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const departamentos = useSelector((state: RootState) => state.departamentos as ItemState<Departamento>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(item.nombre ?? '');

    useEffect(() => {
        if (departamentos.updateSuccess !== null) {
            if (departamentos.updateSuccess) {
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
    }, [departamentos.updateSuccess])

    const closeModal = () => {
        setNombre(undefined);
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleUpdate = () => {
        const check = !nombre?.trim();
        setCheckNombre(check);

        if (check) return;

        var body: DepartamentoBody = {
            nombre: nombre ?? "",
        }

        var params: UpdateDepartamentoParams = {
            id: item.id.toString(),
            body
        }

        dispatch(updateDepartamentoRequest(params));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="sm">
            <ModalContent>
                <ModalHeader>Editar Departamento</ModalHeader>
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
                        onPress={handleUpdate}
                        isLoading={departamentos.loading}
                    >
                        Guardar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UpdateDepartamentoModal;