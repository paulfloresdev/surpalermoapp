import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Programa } from "../../../types/programas";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { destroyProgramaRequest } from "../../../store/features/programas/programasSlice";

interface DestroyProgramaModalProps extends ControlledModal {
    item: Programa;
    setItem: React.Dispatch<React.SetStateAction<Programa | undefined>>
}

const DestroyProgramaModal: React.FC<DestroyProgramaModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const programas = useSelector((state: RootState) => state.programas as ItemState<Programa>);

    useEffect(() => {
        if (programas.destroySuccess !== null) {
            if (programas.destroySuccess) {
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
    }, [programas.destroySuccess]);

    const closeModal = () => {
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleDestroy = () => {
        dispatch(destroyProgramaRequest(item.id.toString()));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="xl">
            <ModalContent>
                <ModalHeader>Eliminar Programa</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <span>{`¿Está seguro que desea eliminar el programa `}<span className="font-semibold">{item.nombre}</span>?</span>
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
                            isLoading={programas.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DestroyProgramaModal;