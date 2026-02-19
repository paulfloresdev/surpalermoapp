import { addToast, Autocomplete, AutocompleteItem, Button, Code, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";
import CustomSkeleton from "../../../../../components/CustomSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/configStore/store";
import { ControlledModal, ItemState, ListState } from "../../../../../types/commons";
import { Programa } from "../../../../../types/programas";
import { SocioProgramaPivot, SocioProgramaPivotBody } from "../../../../../types/socioProgramaPivots";
import { storeSocioProgramaPivotRequest } from "../../../../../store/features/socioProgramaPivots/socioProgramaPivotsSlice";
import { BoolParse, DateToInput, YNParse } from "../../../../../helper/utils/Format";
import { YNCombo } from "../../../../../types/combos";
import { indexProgramasRequest } from "../../../../../store/features/programas/programasSlice";

interface InscriptionSocioProgramProps extends ControlledModal {
    socioId: number;
}

const InscriptionSocioProgramModal: React.FC<InscriptionSocioProgramProps> = ({ socioId, value, setValue }) => {
    const dispatch = useDispatch();

    const programas = useSelector((state: RootState) => state.programas as ListState<Programa>);
    const programasSocio = useSelector((state: RootState) => state.socioProgramaPivots as ItemState<SocioProgramaPivot>);

    const [checkProgramaId, setCheckProgramaId] = useState<boolean>(false)
    const [checkFechaInscripcion, setCheckFechaInscripcion] = useState<boolean>(false)

    const [programaId, setProgramaId] = useState<number | undefined>(undefined);
    const [programa, setPrograma] = useState<Programa | undefined>(undefined);
    const [fechaInscripcion, setFechaInscripcion] = useState<Date | undefined>(undefined);
    const [costoMensual, setCostoMensual] = useState<string | undefined>(undefined);
    const [bajaActividad, setBajaActividad] = useState<boolean>(false);

    useEffect(() => {
        dispatch(indexProgramasRequest({ socio_id: socioId.toString(), inactivos: undefined }));
    }, []);

    useEffect(() => {
        if (programasSocio.storeSuccess !== null) {
            if (programasSocio.storeSuccess) {
                addToast({
                    title: "OK",
                    description: "Inscipción realizada exitosamente.",
                    color: 'success',
                })

                closeModal();
            } else {
                addToast({
                    title: "Error",
                    description: programasSocio.error,
                    color: 'danger',
                })

                closeModal();
            }
        }
    }, [programasSocio.storeSuccess]);

    useEffect(() => {
        if (programaId !== undefined) {
            var programa = programas.data?.find(p => p.id === programaId);
            if (programa !== undefined) {
                setPrograma(programa);
            } else {
                setPrograma(undefined);
            }
        } else {
            setPrograma(undefined);
        }
    }, [programaId]);

    const closeModal = () => {
        setProgramaId(undefined);
        setPrograma(undefined);
        setFechaInscripcion(undefined);
        setCostoMensual(undefined);
        setBajaActividad(false);
        setCheckProgramaId(false);
        setCheckFechaInscripcion(false);
        setValue(false);
    }

    const handleInscription = () => {
        setCheckProgramaId(programaId === undefined);
        setCheckFechaInscripcion(fechaInscripcion === undefined);

        if (!(checkProgramaId || checkFechaInscripcion)) {
            var body: SocioProgramaPivotBody = {
                fecha_inscripcion: fechaInscripcion ?? new Date(),
                costo_mensual: costoMensual ? parseFloat(costoMensual) : 0,
                baja_actividad: bajaActividad,
                socio_id: socioId,
                programa_id: programaId ?? 0,
                fecha_baja: undefined,
                motivo_baja: undefined
            }

            dispatch(storeSocioProgramaPivotRequest(body));
        }
    }

    return (
        <Modal isOpen={value} onClose={() => closeModal()} size="3xl">
            <ModalContent>
                <ModalHeader>Inscribir a programa</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    {
                        programa !== undefined ?
                            <Code className="font-sans p-3 flex flex-row justify-between border-2 gap-2" color="default">
                                <span className="font-semibold w-full">Programa: <span className="font-normal">{programa.nombre}</span></span>
                                <span className="font-semibold w-full">Valor hora: <span className="font-normal">{`$${programa.valor_hora}`}</span></span>
                            </Code>
                            :
                            <></>
                    }
                    <Divider />
                    <div className="w-full grid grid-cols-2 gap-8">
                        <>
                            {
                                programas.loading ?
                                    <CustomSkeleton /> :
                                    <Autocomplete
                                        required
                                        placeholder="Programa"
                                        label="Programa"
                                        labelPlacement="outside"
                                        color={checkProgramaId ? 'danger' : 'default'}
                                        selectedKey={programaId ? String(programaId) : undefined}
                                        defaultItems={programas.data ?? []}
                                        onSelectionChange={(key) => {
                                            if (key) setProgramaId(parseInt(key.toString()));
                                        }}
                                    >
                                        {(option) => (
                                            <AutocompleteItem key={option.id} textValue={option.nombre}>{option.nombre}</AutocompleteItem>
                                        )}
                                    </Autocomplete>
                            }
                        </>
                        <Input
                            required
                            placeholder="Fecha Inscripción"
                            label="Fecha Inscripción"
                            labelPlacement="outside"
                            color={checkFechaInscripcion ? 'danger' : 'default'}
                            type="date"
                            value={DateToInput(fechaInscripcion)}
                            onChange={(e) => {
                                if (e.target.value !== "" || e.target.value !== null) {
                                    setFechaInscripcion(new Date(e.target.value));
                                } else {
                                    setFechaInscripcion(undefined);
                                }
                            }}
                        />
                        <Input
                            placeholder="Costo Mensual"
                            label="Costo Mensual"
                            labelPlacement="outside"
                            value={costoMensual}
                            onChange={(e) => {
                                setCostoMensual(e.target.value);
                            }}
                        />
                        <Select
                            required
                            placeholder="Baja Actividad"
                            label="Baja Actividad"
                            labelPlacement="outside"
                            value={YNParse(bajaActividad)}
                            selectedKeys={YNParse(bajaActividad)}
                            onChange={(e) => {
                                setBajaActividad(BoolParse(e.target.value));
                            }}
                        >
                            {YNCombo.map((option) => (
                                <SelectItem key={option.key}>{option.label}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleInscription}
                        isLoading={programasSocio.loading}
                    >
                        Inscribir
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default InscriptionSocioProgramModal;
