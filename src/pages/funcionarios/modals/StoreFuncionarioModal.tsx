import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { Funcionario, FuncionarioBody } from "../../../types/funcionarios";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from "@heroui/react";
import { storeFuncionarioRequest } from "../../../store/features/funcionarios/funcionariosSlice";

const StoreFuncionarioModal: React.FC<ControlledModal> = ({ value, setValue, setShouldRefresh }) => {
    const dispatch = useDispatch();

    const funcionarios = useSelector((state: RootState) => state.funcionarios as ItemState<Funcionario>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);
    const [checkFechaIngreso, setCheckFechaIngreso] = useState<boolean>(false);
    const [checkDireccion, setCheckDireccion] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(undefined);
    const [fechaIngreso, setFechaIngreso] = useState<undefined | string>(undefined);
    const [direccion, setDireccion] = useState<undefined | string>(undefined);
    const [telefono, setTelefono] = useState<undefined | string>(undefined);
    const [email, setEmail] = useState<undefined | string>(undefined);
    const [celular, setCelular] = useState<undefined | string>(undefined);
    const [observacion, setObservacion] = useState<undefined | string>(undefined);

    useEffect(() => {
        if (funcionarios.storeSuccess !== null) {
            if (funcionarios.storeSuccess) {
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
    }, [funcionarios.storeSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setFechaIngreso(undefined);
        setDireccion(undefined);
        setTelefono(undefined);
        setEmail(undefined);
        setCelular(undefined);
        setObservacion(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleStore = () => {
        const ckNombre = !nombre?.trim();
        const ckFechaIngreso = !fechaIngreso?.trim();
        const ckDireccion = !direccion?.trim();
        setCheckNombre(ckNombre);
        setCheckFechaIngreso(ckFechaIngreso);
        setCheckDireccion(ckDireccion);

        const check = ckNombre || ckFechaIngreso || ckDireccion;

        if (check) return;

        var body: FuncionarioBody = {
            nombre: nombre ?? "",
            fecha_ingreso: fechaIngreso ?? "",
            direccion: direccion ?? "",
            telefono: telefono ?? "",
            email: email ?? "",
            celular: celular ?? "",
            observacion: observacion ?? "",
            eliminado: false,
        }

        dispatch(storeFuncionarioRequest(body));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Agregar Funcionario</ModalHeader>
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
                            required
                            isInvalid={checkFechaIngreso}
                            placeholder="Fecha de ingreso"
                            label="Fecha de ingreso*"
                            labelPlacement="outside"
                            type="date"
                            value={fechaIngreso}
                            onChange={(e) => {
                                setFechaIngreso(e.target.value);
                            }}
                        />
                        <Input
                            required
                            isInvalid={checkDireccion}
                            placeholder="Dirección"
                            label="Dirección*"
                            labelPlacement="outside"
                            value={direccion}
                            onChange={(e) => {
                                setDireccion(e.target.value);
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
                    </div>
                    <Textarea
                        placeholder="Observación"
                        label="Observación"
                        labelPlacement="outside"
                        value={observacion}
                        onChange={(e) => {
                            setObservacion(e.target.value);
                        }}
                    />
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleStore}
                        isLoading={funcionarios.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreFuncionarioModal;