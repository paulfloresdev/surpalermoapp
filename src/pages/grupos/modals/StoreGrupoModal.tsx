import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState, ListState } from "../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore/store";
import { Grupo, GrupoBody } from "../../../types/grupos";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Spinner } from "@heroui/react";
import { storeGrupoRequest } from "../../../store/features/grupos/gruposSlice";
import { indexProgramasRequest } from "../../../store/features/programas/programasSlice";
import { Programa } from "../../../types/programas";

const StoreGrupoModal: React.FC<ControlledModal> = ({ value, setValue, setShouldRefresh }) => {
    const dispatch = useDispatch();

    const grupos = useSelector((state: RootState) => state.grupos as ItemState<Grupo>);
    const programas = useSelector((state: RootState) => state.programas as ListState<Programa>);

    const [checkNombre, setCheckNombre] = useState<boolean>(false);
    const [checkTipo, setCheckTipo] = useState<boolean>(false);
    const [checkPrograma, setCheckPrograma] = useState<boolean>(false);


    const [nombre, setNombre] = useState<undefined | string>(undefined);
    const [tipo, setTipo] = useState<undefined | string>(undefined);
    const [programaId, setProgramaId] = useState<undefined | number>(undefined);
    const [costoBase, setCostoBase] = useState<undefined | number>(undefined);
    const [description, setDescription] = useState<undefined | string>(undefined);
    const [horaInicio, setHoraInicio] = useState<undefined | string>(undefined);
    const [horaFin, setHoraFin] = useState<undefined | string>(undefined);

    useEffect(() => {
        dispatch(indexProgramasRequest({ socio_id: undefined, inactivos: true }));
    }, []);

    useEffect(() => {
        if (grupos.storeSuccess !== null) {
            if (grupos.storeSuccess) {
                addToast({
                    title: "OK",
                    description: grupos.message,
                    color: 'success',
                })
                setShouldRefresh(true);
                closeModal();
            } else {
                addToast({
                    title: "Error",
                    description: grupos.error,
                    color: 'danger',
                })
                setShouldRefresh(true);
                closeModal();
            }

        }
    }, [grupos.storeSuccess]);

    const closeModal = () => {
        setNombre(undefined);
        setTipo(undefined);
        setProgramaId(undefined);
        setCostoBase(undefined);
        setDescription(undefined);
        setHoraInicio(undefined);
        setHoraFin(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleStore = () => {
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

        dispatch(storeGrupoRequest(body));
    }

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Agregar Grupo</ModalHeader>
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
                        onPress={handleStore}
                        isLoading={grupos.loading || programas.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreGrupoModal;
