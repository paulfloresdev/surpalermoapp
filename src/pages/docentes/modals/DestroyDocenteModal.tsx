import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Docente } from "../../../types/docentes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { destroyDocenteRequest } from "../../../store/features/docentes/docentesSlice";

interface DestroyDocenteModalProps extends ControlledModal {
    item: Docente;
    setItem: React.Dispatch<React.SetStateAction<undefined | Docente>>;
}

const DestroyDocenteModal: React.FC<DestroyDocenteModalProps> = ({ value, setValue, item, setItem, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const docentes = useSelector((state: RootState) => state.docentes as ItemState<Docente>);

    useEffect(() => {
        if (docentes.destroySuccess !== null) {
            if (docentes.destroySuccess) {
                addToast({
                    title: "OK",
                    description: docentes.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: docentes.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [docentes.destroySuccess]);

    const closeModal = () => {
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleDestroy = () => {
        dispatch(destroyDocenteRequest(item.id.toString()));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="xl">
            <ModalContent>
                <ModalHeader>Eliminar Docente</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <span>{`¿Está seguro que desea eliminar al(a la) docente(a) `}<span className="font-semibold">{item.nombre}</span>?</span>
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
                            isLoading={docentes.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DestroyDocenteModal;