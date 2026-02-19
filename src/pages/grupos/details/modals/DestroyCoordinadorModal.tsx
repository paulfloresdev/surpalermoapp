import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../../types/commons";
import { Coordinador } from "../../../../types/coordinadores";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { destroyCoordinadorRequest } from "../../../../store/features/coordinadores/coordinadoresSlice";

interface DestroyCoordinadorModalProps extends ControlledModal {
    item: Coordinador;
    setItem: React.Dispatch<React.SetStateAction<Coordinador | undefined>>;
}

const DestroyCoordinadorModal: React.FC<DestroyCoordinadorModalProps> = ({ value, setValue, item, setItem, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const coordinadores = useSelector((state: RootState) => state.coordinadores as ItemState<Coordinador>);

    useEffect(() => {
        if (coordinadores.destroySuccess !== null) {
            if (coordinadores.destroySuccess) {
                addToast({
                    title: "OK",
                    description: coordinadores.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: coordinadores.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [coordinadores.destroySuccess]);

    const closeModal = () => {
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleDestroy = () => {
        dispatch(destroyCoordinadorRequest(item.id.toString()));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="xl">
            <ModalContent>
                <ModalHeader>Eliminar Coordinador</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <span>¿Está seguro que desea eliminar al(a la) coordinador(a) <span className="font-semibold">{`${item.docente.nombre ?? ''} ${item.docente.apellido ?? ''}`}</span> del grupo <span className="font-semibold">{item.grupo.nombre}</span>?</span>
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
                            isLoading={coordinadores.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DestroyCoordinadorModal;