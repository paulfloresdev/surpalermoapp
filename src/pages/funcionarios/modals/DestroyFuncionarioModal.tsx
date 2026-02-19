import React, { useEffect } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Funcionario } from "../../../types/funcionarios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { destroyFuncionarioRequest } from "../../../store/features/funcionarios/funcionariosSlice";

interface DestroyFuncionarioModalProps extends ControlledModal {
    item: Funcionario;
    setItem: React.Dispatch<React.SetStateAction<Funcionario | undefined>>;
}

const DestroyFuncionarioModal: React.FC<DestroyFuncionarioModalProps> = ({ value, setValue, item, setItem, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const funcionarios = useSelector((state: RootState) => state.funcionarios as ItemState<Funcionario>);

    useEffect(() => {
        if (funcionarios.destroySuccess !== null) {
            if (funcionarios.destroySuccess) {
                addToast({
                    title: "OK",
                    description: funcionarios.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: funcionarios.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [funcionarios.destroySuccess]);

    const closeModal = () => {
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleDestroy = () => {
        dispatch(destroyFuncionarioRequest(item.id.toString()));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="xl">
            <ModalContent>
                <ModalHeader>Eliminar Funcionario</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <span>{`¿Está seguro que desea eliminar al(a la) funcionario(a) `}<span className="font-semibold">{item.nombre}</span>?</span>
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
                            isLoading={funcionarios.loading}
                        >
                            Eliminar
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default DestroyFuncionarioModal;