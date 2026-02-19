import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Departamento } from "../../../types/departamentos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { destroyDepartamentoRequest } from "../../../store/features/departamentos/departamentosSlice";

interface DestroyDepartamentoModalProps extends ControlledModal {
    item: Departamento;
    setItem: React.Dispatch<React.SetStateAction<Departamento | undefined>>
}

const DestroyDepartamentoModal: React.FC<DestroyDepartamentoModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const departamentos = useSelector((state: RootState) => state.departamentos as ItemState<Departamento>);

    useEffect(() => {
        if (departamentos.destroySuccess !== null) {
            if (departamentos.destroySuccess) {
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
    }, [departamentos.destroySuccess]);

    const closeModal = () => {
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleDestroy = () => {
        dispatch(destroyDepartamentoRequest(item.id.toString()));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="xl">
            <ModalContent>
                <ModalHeader>Eliminar Departamento</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <span>{`¿Está seguro que desea eliminar el departamento `}<span className="font-semibold">{item.nombre}</span>?</span>
                    <div className="w-full grid grid-cols-2 gap-8">
                        <Button
                            variant="flat"
                            onPress={abort}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="solid"
                            color="danger"
                            onPress={handleDestroy}
                            isLoading={departamentos.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DestroyDepartamentoModal;