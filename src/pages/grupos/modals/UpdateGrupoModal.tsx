import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState, ListState } from "../../../types/commons";
import { Grupo, GrupoBody, UpdateGrupoParams } from "../../../types/grupos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { Programa } from "../../../types/programas";
import { indexProgramasRequest } from "../../../store/features/programas/programasSlice";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Spinner } from "@heroui/react";
import { updateGrupoRequest } from "../../../store/features/grupos/gruposSlice";

interface UpdateGrupoModalProps extends ControlledModal {
    item: Grupo;
    setItem: React.Dispatch<React.SetStateAction<Grupo | undefined>>
}

const UpdateGrupoModal: React.FC<UpdateGrupoModalProps> = ({ item, setItem, value, setValue, setShouldRefresh }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const grupos = useSelector((state: RootState) => state.grupos as ItemState<Grupo>);
    const programas = useSelector((state: RootState) => state.programas as ListState<Programa>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);
    const [checkTipo, setCheckTipo] = useState<boolean>(false);
    const [checkPrograma, setCheckPrograma] = useState<boolean>(false);


    const [nombre, setNombre] = useState<undefined | string>(item.nombre ?? '');
    const [tipo, setTipo] = useState<undefined | string>(item.tipo ?? '');
    const [programaId, setProgramaId] = useState<undefined | number>(item.programa_id ?? undefined);
    const [costoBase, setCostoBase] = useState<undefined | number>(item.costo_base ?? undefined);
    const [description, setDescription] = useState<undefined | string>(item.desripcion ?? undefined);
    const [horaInicio, setHoraInicio] = useState<undefined | string>(item.hora_inicio ?? undefined);
    const [horaFin, setHoraFin] = useState<undefined | string>(item.hora_fin ?? undefined);

    useEffect(() => {
        dispatch(indexProgramasRequest({ socio_id: undefined, inactivos: true }));
    }, []);

    useEffect(() => {
        setNombre(item.nombre ?? "");
        setTipo(item.tipo ?? "");
        setProgramaId(item.programa_id ?? undefined);
        setCostoBase(item.costo_base ?? undefined);
        setDescription(item.desripcion ?? undefined);
        setHoraInicio(item.hora_inicio ?? undefined);
        setHoraFin(item.hora_fin ?? undefined);
    }, [item]);

    useEffect(() => {
        if (grupos.updateSuccess !== null) {
            if (grupos.updateSuccess) {
                addToast({
                    title: "OK",
                    description: grupos.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: grupos.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [grupos.updateSuccess]);

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
        const ckNombre = !nombre?.trim();
        const ckTipo = !tipo?.trim();
        const ckPrograma = programaId === undefined;
        setCheckNombre(ckNombre);
        setCheckTipo(ckTipo);
        setCheckPrograma(ckPrograma);

        const check = ckNombre || ckTipo || ckPrograma;

        if (check) return;

        var body: GrupoBody = {
            nombre: nombre ?? "",
            tipo: tipo ?? "",
            programa_id: programaId ?? undefined,
            costo_base: costoBase ?? undefined,
            descripcion: description ?? undefined,
            hora_inicio: horaInicio ?? undefined,
            hora_fin: horaFin ?? undefined,
            fecha_inicio: undefined,
            fecha_fin: undefined,
            horas_semanales: undefined,
            activo: true
        }

        var params: UpdateGrupoParams = {
            id: item.id.toString(),
            body
        }

        dispatch(updateGrupoRequest(params));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Editar Grupo</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <div className="w-full grid grid-cols-2 gap-8">
                        {
                            programas.loading || programas === null ? <Spinner
                                size='md'
                                color='success'
                            /> :
                                <Select
                                    label="Programa*"
                                    placeholder="Programa"
                                    isInvalid={checkPrograma}
                                    labelPlacement="outside"
                                    value={programaId}
                                    selectedKeys={programaId !== undefined ? [programaId.toString()] : []}
                                    onChange={(e) => {
                                        setProgramaId(parseInt(e.target.value));
                                    }}
                                >
                                    {(programas.data ?? []).map((item) => (
                                        <SelectItem key={item.id}>{item.nombre}</SelectItem>
                                    ))}
                                </Select>
                        }
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
                        <Select
                            required
                            isInvalid={checkTipo}
                            label="Tipo*"
                            placeholder="Tipo"
                            labelPlacement="outside"
                            value={tipo}
                            selectedKeys={tipo ? [tipo] : []}
                            onChange={(e) => {
                                setTipo(e.target.value);
                            }}
                        >
                            <SelectItem key="Matutino">Matutino</SelectItem>
                            <SelectItem key="Vespertino">Vespertino</SelectItem>
                        </Select>
                        <Input
                            placeholder="Descripción"
                            label="Descripción"
                            labelPlacement="outside"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                        <Input
                            type="number"
                            placeholder="Costo base"
                            label="Costo base"
                            labelPlacement="outside"
                            value={costoBase?.toString() ?? ""}
                            min="0"
                            step="0.01"
                            onChange={(e) => {
                                const value = e.target.value;

                                // Permite vacío mientras escribe
                                if (value === "") {
                                    setCostoBase(undefined);
                                    return;
                                }

                                // Solo números positivos enteros o decimales
                                const regex = /^\d*\.?\d*$/;
                                if (!regex.test(value)) return;

                                setCostoBase(parseFloat(value));
                            }}
                        />
                        <Input
                            placeholder="Hora inicio"
                            label="Hora inicio"
                            labelPlacement="outside"
                            value={horaInicio}
                            type="time"
                            onChange={(e) => {
                                setHoraInicio(e.target.value);
                            }}
                        />
                        <Input
                            placeholder="Hora fin"
                            label="Hora fin"
                            labelPlacement="outside"
                            value={horaFin}
                            type="time"
                            onChange={(e) => {
                                setHoraFin(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleUpdate}
                        isLoading={grupos.loading || programas.loading}
                    >
                        Guardar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UpdateGrupoModal;