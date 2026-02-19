import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Medico, MedicoBody, UpdateMedicoParams } from "../../../types/medicos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from "@heroui/react";
import { updateMedicoRequest } from "../../../store/features/medicos/medicosSlice";
import { BoolParse, YNParse } from "../../../helper/utils/Format";
import { YNCombo } from "../../../types/combos";

interface UpdateMedicoModalProps extends ControlledModal {
    item: Medico;
    setItem: React.Dispatch<React.SetStateAction<Medico | undefined>>;
}

const UpdateMedicoModal: React.FC<UpdateMedicoModalProps> = ({ value, setValue, item, setItem, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const medicos = useSelector((state: RootState) => state.medicos as ItemState<Medico>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(item.nombre);
    const [telefonoConsultorio, setTelefonoConsultorio] = useState<undefined | string>(item.telefono_consultorio);
    const [telefonoParticular, setTelefonoParticular] = useState<undefined | string>(item.telefono_particular);
    const [celular, setCelular] = useState<undefined | string>(item.celular);
    const [email, setEmail] = useState<undefined | string>(item.email);
    const [direccion, setDireccion] = useState<undefined | string>(item.direccion);
    const [activo, setActivo] = useState<undefined | boolean>(!item.eliminado);

    useEffect(() => {
        if (medicos.updateSuccess !== null) {
            if (medicos.updateSuccess) {
                addToast({
                    title: "OK",
                    description: medicos.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: medicos.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [medicos.updateSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setTelefonoConsultorio(undefined);
        setTelefonoParticular(undefined);
        setDireccion(undefined);
        setEmail(undefined);
        setCelular(undefined);
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
        setCheckNombre(ckNombre);

        const check = ckNombre;

        if (check) return;

        var body: MedicoBody = {
            nombre: nombre ?? "",
            telefono_consultorio: telefonoConsultorio ?? "",
            telefono_particular: telefonoParticular ?? "",
            celular: celular ?? "",
            email: email ?? "",
            direccion: direccion ?? "",
            eliminado: !activo,
        }

        var params: UpdateMedicoParams = {
            id: item.id.toString(),
            body
        }


        dispatch(updateMedicoRequest(params));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Editar Médico</ModalHeader>
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
                            placeholder="Teléfono consultorio"
                            label="Teléfono consultorio"
                            labelPlacement="outside"
                            value={telefonoConsultorio}
                            inputMode="numeric"
                            pattern="\d*"
                            onChange={(e) => {
                                const soloNumeros = e.target.value.replace(/\D/g, "");

                                setTelefonoConsultorio(soloNumeros);
                            }}
                            onPaste={(e) => {
                                const pasted = e.clipboardData.getData("Text");
                                if (/\D/.test(pasted)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <Input
                            placeholder="Teléfono particular"
                            label="Teléfono particular"
                            labelPlacement="outside"
                            value={telefonoParticular}
                            inputMode="numeric"
                            pattern="\d*"
                            onChange={(e) => {
                                const soloNumeros = e.target.value.replace(/\D/g, "");

                                setTelefonoParticular(soloNumeros);
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
                            label="Dirección*"
                            labelPlacement="outside"
                            value={direccion}
                            onChange={(e) => {
                                setDireccion(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleUpdate}
                        isLoading={medicos.loading}
                    >
                        Guardar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UpdateMedicoModal;