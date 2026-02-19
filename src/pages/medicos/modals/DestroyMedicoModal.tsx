import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Medico } from "../../../types/medicos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { destroyMedicoRequest } from "../../../store/features/medicos/medicosSlice";

interface DestroyMedicoModalProps extends ControlledModal {
    item: Medico;
    setItem: React.Dispatch<React.SetStateAction<Medico | undefined>>;
}

const DestroyMedicoModal: React.FC<DestroyMedicoModalProps> = ({ value, setValue, item, setItem, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const medicos = useSelector((state: RootState) => state.medicos as ItemState<Medico>);

    useEffect(() => {
        if (medicos.destroySuccess !== null) {
            if (medicos.destroySuccess) {
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
    }, [medicos.destroySuccess]);

    const closeModal = () => {
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleDestroy = () => {
        dispatch(destroyMedicoRequest(item.id.toString()));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="xl">
            <ModalContent>
                <ModalHeader>Eliminar Médico</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <span>{`¿Está seguro que desea eliminar al(a la) médico(a) `}<span className="font-semibold">{item.nombre}</span>?</span>
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
                            isLoading={medicos.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DestroyMedicoModal;