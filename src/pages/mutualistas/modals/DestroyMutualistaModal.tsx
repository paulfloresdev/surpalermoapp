import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Mutualista } from "../../../types/mutualistas";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { destroyMutualistaRequest } from "../../../store/features/mutualistas/mutualistasSlice";

interface DestroyMutualistaModalProps extends ControlledModal {
    item: Mutualista;
    setItem: React.Dispatch<React.SetStateAction<Mutualista | undefined>>
}

const DestroyMutualistaModal: React.FC<DestroyMutualistaModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const mutualistas = useSelector((state: RootState) => state.mutualistas as ItemState<Mutualista>);

    useEffect(() => {
        if (mutualistas.destroySuccess !== null) {
            if (mutualistas.destroySuccess) {
                addToast({
                    title: "OK",
                    description: mutualistas.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: mutualistas.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [mutualistas.destroySuccess]);

    const closeModal = () => {
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleDestroy = () => {
        dispatch(destroyMutualistaRequest(item.id.toString()));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="xl">
            <ModalContent>
                <ModalHeader>Eliminar Mutualista</ModalHeader>
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
                            isLoading={mutualistas.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DestroyMutualistaModal;