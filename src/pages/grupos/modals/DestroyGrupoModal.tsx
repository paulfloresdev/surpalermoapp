import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Grupo } from "../../../types/grupos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { destroyGrupoRequest } from "../../../store/features/grupos/gruposSlice";

interface DestroyGrupoModalProps extends ControlledModal {
    item: Grupo;
    setItem: React.Dispatch<React.SetStateAction<Grupo | undefined>>
}

const DestroyGrupoModal: React.FC<DestroyGrupoModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const grupos = useSelector((state: RootState) => state.grupos as ItemState<Grupo>);

    useEffect(() => {
        if (grupos.destroySuccess !== null) {
            if (grupos.destroySuccess) {
                addToast({
                    title: "OK",
                    description: grupos.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: grupos.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [grupos.destroySuccess]);

    const closeModal = () => {
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleDestroy = () => {
        dispatch(destroyGrupoRequest(item.id.toString()));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="xl">
            <ModalContent>
                <ModalHeader>Eliminar Grupo</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <span>{`¿Está seguro que desea eliminar el grupo `}<span className="font-semibold">{item.nombre}</span>?</span>
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
                            isLoading={grupos.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DestroyGrupoModal;