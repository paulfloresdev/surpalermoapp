import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Funcionario, FuncionarioBody, UpdateFuncionarioParams } from "../../../types/funcionarios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react";
import { updateFuncionarioRequest } from "../../../store/features/funcionarios/funcionariosSlice";
import { BoolParse, YNParse } from "../../../helper/utils/Format";
import { YNCombo } from "../../../types/combos";

interface UpdateFuncionarioModalProps extends ControlledModal {
    item: Funcionario;
    setItem: React.Dispatch<React.SetStateAction<Funcionario | undefined>>
}

const UpdateFuncionarioModal: React.FC<UpdateFuncionarioModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const funcionarios = useSelector((state: RootState) => state.funcionarios as ItemState<Funcionario>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);
    const [checkFechaIngreso, setCheckFechaIngreso] = useState<boolean>(false);
    const [checkDireccion, setCheckDireccion] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(item.nombre ?? '');
    const [fechaIngreso, setFechaIngreso] = useState<undefined | string>(item.fecha_ingreso ?? '');
    const [direccion, setDireccion] = useState<undefined | string>(item.direccion ?? '');
    const [telefono, setTelefono] = useState<undefined | string>(item.telefono);
    const [email, setEmail] = useState<undefined | string>(item.email);
    const [celular, setCelular] = useState<undefined | string>(item.celular);
    const [observacion, setObservacion] = useState<undefined | string>(item.obervacion);
    const [activo, setActivo] = useState<undefined | boolean>(!item.eliminado);

    useEffect(() => {
        if (funcionarios.updateSuccess !== null) {
            if (funcionarios.updateSuccess) {
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
    }, [funcionarios.updateSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setFechaIngreso(undefined);
        setDireccion(undefined);
        setTelefono(undefined);
        setEmail(undefined);
        setCelular(undefined);
        setObservacion(undefined);
        setActivo(undefined);
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleUpdate = () => {
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
            eliminado: !activo,
        }

        var params: UpdateFuncionarioParams = {
            id: item.id.toString(),
            body
        }

        dispatch(updateFuncionarioRequest(params));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Editar Funcionario</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <div className="w-full grid grid-cols-2 gap-8">
                        <Select
                            required
                            placeholder="Activo"
                            label="Activo"
                            labelPlacement="outside"
                            value={YNParse(activo)}
                            selectedKeys={YNParse(activo)}
                            onChange={(e) => {
                                setActivo(BoolParse(e.target.value))
                            }}
                        >
                            {YNCombo.map((option) => (
                                <SelectItem key={option.key}>{option.label}</SelectItem>
                            ))}
                        </Select>
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
                        onPress={handleUpdate}
                        isLoading={funcionarios.loading}
                    >
                        Guardar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UpdateFuncionarioModal;