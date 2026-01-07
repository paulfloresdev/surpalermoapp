import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { Emergencia } from "../../../types/emergencias";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { destroyEmergenciaRequest } from "../../../store/features/emergencias/emergenciasSlice";

interface DestroyEmergenciaModalProps extends ControlledModal {
    item: Emergencia;
    setItem: React.Dispatch<React.SetStateAction<Emergencia | undefined>>
}

const DestroyEmergenciaModal: React.FC<DestroyEmergenciaModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const emergencias = useSelector((state: RootState) => state.emergencias as ItemState<Emergencia>);

    useEffect(() => {
        if (emergencias.destroySuccess !== null) {
            if (emergencias.destroySuccess) {
                addToast({
                    title: "OK",
                    description: "Emergencia eliminada exitosamente.",
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
    }, [emergencias.destroySuccess])

    const closeModal = () => {
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleDestroy = () => {
        dispatch(destroyEmergenciaRequest(item.id.toString()));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="xl">
            <ModalContent>
                <ModalHeader>Eliminar Emergencia</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <span>{`¿Está seguro que desea eliminar la emergencia `}<span className="font-semibold">{item.nombre}</span>?</span>
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
                            isLoading={emergencias.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DestroyEmergenciaModal;