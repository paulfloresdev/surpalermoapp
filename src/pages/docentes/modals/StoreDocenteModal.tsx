import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { Docente, DocenteBody } from "../../../types/docentes";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { storeDocenteRequest } from "../../../store/features/docentes/docentesSlice";

const StoreDocenteModal: React.FC<ControlledModal> = ({ value, setValue, setShouldRefresh }) => {
    const dispatch = useDispatch();

    const docentes = useSelector((state: RootState) => state.docentes as ItemState<Docente>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(undefined);
    const [apellido, setApellido] = useState<undefined | string>(undefined);
    const [telefono, setTelefono] = useState<undefined | string>(undefined);
    const [celular, setCelular] = useState<undefined | string>(undefined);
    const [email, setEmail] = useState<undefined | string>(undefined);
    const [direccion, setDireccion] = useState<undefined | string>(undefined);
    const [dni, setDni] = useState<undefined | string>(undefined);
    const [valorHora, setValorHora] = useState<undefined | string>(undefined);

    useEffect(() => {
        if (docentes.storeSuccess !== null) {
            if (docentes.storeSuccess) {
                addToast({
                    title: "OK",
                    description: docentes.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: docentes.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [docentes.storeSuccess]);

    const handleValorHoraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Permitir solo números y punto decimal
        if (!/^\d*\.?\d*$/.test(value)) return;

        // Limitar a 2 decimales
        const parts = value.split(".");
        if (parts[1]?.length > 2) return;

        setValorHora(value);
    };

    const closeModal = () => {
        setNombre(undefined);
        setApellido(undefined);
        setTelefono(undefined);
        setCelular(undefined);
        setEmail(undefined);
        setDireccion(undefined);
        setDni(undefined);
        setValorHora(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleStore = () => {
        const ckNombre = !nombre?.trim();
        setCheckNombre(ckNombre);

        const check = ckNombre;

        if (check) return;

        var body: DocenteBody = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            celular: celular,
            email: email,
            direccion: direccion,
            dni: dni,
            valor_hora: valorHora ? parseFloat(valorHora) : undefined,
            activo: true,
        }

        dispatch(storeDocenteRequest(body));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Agregar Docente</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <div className="w-full grid grid-cols-2 gap-8">
                        <Input
                            required
                            isInvalid={checkNombre}
                            placeholder="Nombre"
                            label="Nombre*"
                            labelPlacement="outside"
                            value={nombre}
                            onChange={(e) => {
                                setNombre(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Apellido"
                            label="Apellido"
                            labelPlacement="outside"
                            value={apellido}
                            onChange={(e) => {
                                setApellido(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Teléfono"
                            label="Teléfono"
                            labelPlacement="outside"
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
                        <Input
                            placeholder="Celular"
                            label="Celular"
                            labelPlacement="outside"
                            value={celular}
                            inputMode="numeric"
                            pattern="\d*"
                            onChange={(e) => {
                                const soloNumeros = e.target.value.replace(/\D/g, "");

                                setCelular(soloNumeros);
                            }}
                            onPaste={(e) => {
                                const pasted = e.clipboardData.getData("Text");
                                if (/\D/.test(pasted)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <Input
                            required
                            placeholder="Email"
                            label="Email"
                            labelPlacement="outside"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Dirección"
                            label="Dirección"
                            labelPlacement="outside"
                            value={direccion}
                            onChange={(e) => {
                                setDireccion(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="DNI"
                            label="DNI"
                            labelPlacement="outside"
                            value={dni}
                            onChange={(e) => {
                                setDni(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Valor hora"
                            label="Valor hora"
                            labelPlacement="outside"
                            value={valorHora}
                            onChange={handleValorHoraChange}
                            startContent={<span>$</span>}
                            inputMode="decimal"
                        />
                    </div>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleStore}
                        isLoading={docentes.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreDocenteModal;