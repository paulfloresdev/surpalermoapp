import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../../types/commons";
import { DocenteGrupoPivot } from "../../../../types/docenteGrupoPivots";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { destroyDocenteGrupoPivotRequest } from "../../../../store/features/docenteGrupoPivots/docenteGrupoPivotsSlice";

interface DestroyDocenteGrupoPivotModalProps extends ControlledModal {
    item: DocenteGrupoPivot;
    setItem: React.Dispatch<React.SetStateAction<DocenteGrupoPivot | undefined>>;
}

const DestroyDocenteGrupoPivotModal: React.FC<DestroyDocenteGrupoPivotModalProps> = ({ value, setValue, item, setItem, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const docentesGrupo = useSelector((state: RootState) => state.docenteGrupoPivots as ItemState<DocenteGrupoPivot>);

    useEffect(() => {
        if (docentesGrupo.destroySuccess !== null) {
            if (docentesGrupo.destroySuccess) {
                addToast({
                    title: "OK",
                    description: docentesGrupo.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: docentesGrupo.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [docentesGrupo.destroySuccess]);

    const closeModal = () => {
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleDestroy = () => {
        dispatch(destroyDocenteGrupoPivotRequest(item.id.toString()));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="xl">
            <ModalContent>
                <ModalHeader>Eliminar Docente</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <span>¿Está seguro que desea eliminar al(a la) docente(a) <span className="font-semibold">{`${item.docente.nombre ?? ''} ${item.docente.apellido ?? ''}`}</span> del grupo <span className="font-semibold">{item.grupo.nombre}</span>?</span>
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
                            isLoading={docentesGrupo.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DestroyDocenteGrupoPivotModal;