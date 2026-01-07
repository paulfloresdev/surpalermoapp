import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { Mutualista, MutualistaBody } from "../../../types/mutualistas";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from "@heroui/react";
import { storeMutualistaRequest } from "../../../store/features/mutualistas/mutualistasSlice";

const StoreMutualistaModal: React.FC<ControlledModal> = ({ value, setValue, setShouldRefresh }) => {
    const dispatch = useDispatch();

    const mutualistas = useSelector((state: RootState) => state.mutualistas as ItemState<Mutualista>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(undefined);
    const [telefono, setTelefono] = useState<undefined | string>(undefined);
    const [direccion, setDireccion] = useState<undefined | string>(undefined);

    useEffect(() => {
        if (mutualistas.storeSuccess !== null) {
            if (mutualistas.storeSuccess) {
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
    }, [mutualistas.storeSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setTelefono(undefined);
        setDireccion(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleStore = () => {
        const check = !nombre?.trim();
        setCheckNombre(check);

        if (check) return;

        var body: MutualistaBody = {
            nombre: nombre ?? "",
            telefono,
            direccion
        }

        dispatch(storeMutualistaRequest(body));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Agregar Mutualista</ModalHeader>
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
                        onPress={handleStore}
                        isLoading={mutualistas.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreMutualistaModal;