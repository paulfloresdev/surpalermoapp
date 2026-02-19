import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState } from "../../../types/commons";
import { Programa, ProgramaBody, UpdateProgramaParams } from "../../../types/programas";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from "@heroui/react";
import { updateProgramaRequest } from "../../../store/features/programas/programasSlice";
import { BoolParse, YNParse } from "../../../helper/utils/Format";
import { YNCombo } from "../../../types/combos";

interface UpdateProgramaModalProps extends ControlledModal {
    item: Programa;
    setItem: React.Dispatch<React.SetStateAction<Programa | undefined>>
}

const UpdateProgramaModal: React.FC<UpdateProgramaModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const programas = useSelector((state: RootState) => state.programas as ItemState<Programa>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);

    const [nombre, setNombre] = useState<undefined | string>(item.nombre ?? '');
    const [valorHora, setValorHora] = useState<undefined | number>(item.valor_hora ?? 0);
    const [activo, setActivo] = useState<undefined | boolean>(item.activo ?? false);

    useEffect(() => {
        if (programas.updateSuccess !== null) {
            if (programas.updateSuccess) {
                addToast({
                    title: "OK",
                    description: programas.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: programas.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [programas.updateSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setItem(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleUpdate = () => {
        const check = !nombre?.trim();
        setCheckNombre(check);

        if (check) return;

        var body: ProgramaBody = {
            nombre: nombre ?? "",
            valor_hora: valorHora ?? undefined,
            activo: activo ?? false
        }

        var params: UpdateProgramaParams = {
            id: item.id.toString(),
            body
        }

        dispatch(updateProgramaRequest(params));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Editar Programa</ModalHeader>
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
                            placeholder="Nombre"
                            label="Nombre*"
                            labelPlacement="outside"
                            color={checkNombre ? 'danger' : 'default'}
                            value={nombre}
                            onChange={(e) => {
                                setNombre(e.target.value);
                            }}
                        />
                        <Input
                            type="number"
                            placeholder="Valor hora"
                            label="Valor hora*"
                            labelPlacement="outside"
                            value={valorHora?.toString() ?? ""}
                            min="0"
                            step="0.01"
                            onChange={(e) => {
                                const value = e.target.value;

                                // Permite vacío mientras escribe
                                if (value === "") {
                                    setValorHora(undefined);
                                    return;
                                }

                                // Solo números positivos enteros o decimales
                                const regex = /^\d*\.?\d*$/;
                                if (!regex.test(value)) return;

                                setValorHora(parseFloat(value));
                            }}
                        />
                    </div>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleUpdate}
                        isLoading={programas.loading}
                    >
                        Guardar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UpdateProgramaModal;