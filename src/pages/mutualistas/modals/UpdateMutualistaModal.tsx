import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Mutualista, MutualistaBody, UpdateMutualistaParams } from "../../../types/mutualistas";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from "@heroui/react";
import { updateMutualistaRequest } from "../../../store/features/mutualistas/mutualistasSlice";

interface UpdateMutualistaModalProps extends ControlledModal {
    item: Mutualista;
    setItem: React.Dispatch<React.SetStateAction<Mutualista | undefined>>
}

const UpdateMutualistaModal: React.FC<UpdateMutualistaModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const mutualistas = useSelector((state: RootState) => state.mutualistas as ItemState<Mutualista>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(item.nombre ?? '');
    const [telefono, setTelefono] = useState<undefined | string>(item.telefono ?? undefined);
    const [direccion, setDireccion] = useState<undefined | string>(item.direccion ?? undefined);

    useEffect(() => {
        if (mutualistas.updateSuccess !== null) {
            if (mutualistas.updateSuccess) {
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
    }, [mutualistas.updateSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setTelefono(undefined);
        setDireccion(undefined);
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        console.log('ejecutado');
        setShouldRefresh(false);
        closeModal();
    }

    const handleUpdate = () => {
        const check = !nombre?.trim();
        setCheckNombre(check);

        if (check) return;

        var body: MutualistaBody = {
            nombre: nombre ?? "",
            telefono,
            direccion
        }

        var params: UpdateMutualistaParams = {
            id: item.id.toString(),
            body
        }

        dispatch(updateMutualistaRequest(params));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Editar Mutualista</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <div className="w-full grid grid-cols-2 gap-8">
                        <Input
                            required
                            placeholder="Nombre"
                            label="Nombre*"
                            labelPlacement="outside"
                            value={nombre}
                            onChange={(e) => {
                                setNombre(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Teléfono"
                            label="Teléfono"
                            labelPlacement="outside"
                            color={checkNombre ? 'danger' : 'default'}
                            value={telefono}
                            inputMode="numeric"
                            pattern="\d*"
                            onChange={(e) => {
                                const soloNumeros = e.target.value.replace(/\D/g, "");

                                setTelefono(soloNumeros);
                            }}
                            onPaste={(e) => {
                                const pasted = e.clipboardData.getData("Text");
                                if (/\D/.test(pasted)) {
                                    e.preventDefault();
                                }
                            }}
                        />


                    </div>
                    <Textarea
                        placeholder="Dirección"
                        label="Dirección"
                        labelPlacement="outside"
                        value={direccion}
                        onChange={(e) => {
                            setDireccion(e.target.value);
                        }}
                    />
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleUpdate}
                        isLoading={mutualistas.loading}
                    >
                        Guardar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UpdateMutualistaModal;