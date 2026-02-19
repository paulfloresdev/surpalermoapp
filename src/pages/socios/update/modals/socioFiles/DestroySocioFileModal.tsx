import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/configStore/store";
import { SocioFile } from "../../../../../types/socioFiles";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import DynamicFaIcon from "../../../../../components/DynamicFaIcon";
import { destroySocioFileRequest } from "../../../../../store/features/socioFiles/socioFilesSlice";

interface Props extends ControlledModal {
    item: SocioFile | null;
    setItem: React.Dispatch<React.SetStateAction<SocioFile | null>>;
}

const DestroySocioFileModal: React.FC<Props> = ({
    value,
    setValue,
    setShouldRefresh,
    item,
    setItem,
}) => {
    const dispatch = useDispatch();
    const socioFiles = useSelector(
        (state: RootState) => state.socioFiles as ItemState<SocioFile>
    );

    useEffect(() => {
        if (socioFiles.destroySuccess !== null) {
            if (socioFiles.destroySuccess) {
                addToast({
                    title: "OK",
                    description: socioFiles.message ?? "Archivo eliminado correctamente",
                    color: "success",
                });
                setShouldRefresh(true);
                closeModal();
            } else {
                addToast({
                    title: "Error",
                    description: socioFiles.error ?? "No se pudo eliminar el archivo",
                    color: "danger",
                });
            }
        }
    }, [socioFiles.destroySuccess]);

    const closeModal = () => {
        setItem(null);
        setValue(false);
    };

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    };

    const confirmDelete = () => {
        if (!item) return;
        dispatch(destroySocioFileRequest(String(item.id)));
    };

    return (
        <Modal isOpen={value} onClose={abort} size="md">
            <ModalContent>
                <ModalHeader>Eliminar archivo</ModalHeader>

                <ModalBody className="flex flex-col gap-4 pb-6">
                    <div className="text-sm text-gray-600">
                        ¿Estás seguro de eliminar el archivo:
                        <span className="font-semibold"> {item?.name}</span>?
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="flat" onPress={abort}>
                            Cancelar
                        </Button>

                        <Button
                            color="danger"
                            startContent={<DynamicFaIcon name="FaTrash" className="text-white" size={14} />}
                            onPress={confirmDelete}
                            isLoading={socioFiles.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default DestroySocioFileModal;
