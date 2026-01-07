import { addToast, Alert, Button, Code, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/configStore/store";
import { ControlledModal, ItemState } from "../../../../../types/commons";
import { SocioProgramaPivot, SocioProgramaPivotBody, UpdateSocioProgramaPivotParams } from "../../../../../types/socioProgramaPivots";
import { updateSocioProgramaPivotRequest } from "../../../../../store/features/socioProgramaPivots/socioProgramaPivotsSlice";
import { BoolParse, DateToInput, YNParse } from "../../../../../helper/utils/Format";
import { MotivoBajaPrograma, YNCombo } from "../../../../../types/combos";
import { commonLeftLabelClassNames } from "../../../../fichas/AFormPage";

interface UpdateSocioProgramProps extends ControlledModal {
    item: SocioProgramaPivot;
}

const UpdateSocioProgramModal: React.FC<UpdateSocioProgramProps> = ({ item, value, setValue }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const programasSocio = useSelector((state: RootState) => state.socioProgramaPivots as ItemState<SocioProgramaPivot>);

    const [checkFechaInscripcion, setCheckFechaInscripcion] = useState<boolean>(false)
    const [checkMotivoBaja, setCheckMotivoBaja] = useState<boolean>(false);

    const [fechaInscripcion, setFechaInscripcion] = useState<Date | undefined>(item.fecha_inscripcion);
    const [costoMensual, setCostoMensual] = useState<string | undefined>(item.costo_mensual?.toString());
    const [bajaActividad, setBajaActividad] = useState<boolean>(item.baja_actividad);
    const [fechaBaja, setFechaBaja] = useState<Date | undefined>(item.fecha_baja ?? undefined);
    const [motivoBaja, setMotivoBaja] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (programasSocio.updateSuccess !== null) {
            if (programasSocio.updateSuccess) {
                addToast({
                    title: "OK",
                    description: "Inscipción actualizada exitosamente.",
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
    }, [programasSocio.updateSuccess]);

    const closeModal = () => {
        setFechaInscripcion(undefined);
        setCostoMensual(undefined);
        setBajaActividad(false);
        setCheckFechaInscripcion(false);
        setValue(false);
    }

    const handleUpdate = () => {
        setCheckFechaInscripcion(fechaInscripcion === undefined);

        if (fechaBaja) {
            setCheckMotivoBaja(motivoBaja === undefined || motivoBaja === 0);
            if (motivoBaja === undefined || motivoBaja === 0) {
                return;
            }
        }


        if (!checkFechaInscripcion) {
            var body: SocioProgramaPivotBody = {
                fecha_inscripcion: fechaInscripcion ?? new Date(),
                costo_mensual: costoMensual ? parseFloat(costoMensual) : 0,
                baja_actividad: bajaActividad,
                socio_id: item.socio_id,
                programa_id: item.programa_id,
                fecha_baja: fechaBaja,
                motivo_baja: motivoBaja,
            }

            var params: UpdateSocioProgramaPivotParams = {
                id: item.id.toString(),
                body: body
            }

            dispatch(updateSocioProgramaPivotRequest(params));
        }
    }

    return (
        <Modal isOpen={value} onClose={() => closeModal()} size="3xl">
            <ModalContent>
                <ModalHeader>Actualizar inscripción a programa</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <Code className="font-sans p-3 flex flex-row justify-between border-2" color="default">
                        <span className="font-semibold w-full">Programa: <span className="font-normal">{item.programa?.nombre}</span></span>
                        <span className="font-semibold w-full">Valor hora: <span className="font-normal">{`$${item.programa?.valor_hora}`}</span></span>
                    </Code>
                    <Divider />
                    <div className="w-full grid grid-cols-2 gap-8">
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
                        <Input
                            required
                            placeholder="Fecha Baja"
                            label="Fecha Baja"
                            labelPlacement="outside"
                            type="date"
                            value={DateToInput(fechaBaja)}
                            onChange={(e) => {
                                if (e.target.value !== "" || e.target.value !== null) {
                                    setFechaBaja(new Date(e.target.value));
                                } else {
                                    setFechaBaja(undefined);
                                    setMotivoBaja(undefined);
                                    setCheckMotivoBaja(false);
                                }
                            }}
                        />
                        {
                            fechaBaja && (
                                <Select
                                    isInvalid={checkMotivoBaja}
                                    label="Motivo de baja"
                                    labelPlacement="outside-left"
                                    value={motivoBaja?.toString()}
                                    selectedKeys={motivoBaja?.toString()}
                                    onChange={(e) => {
                                        setMotivoBaja(Number(e.target.value));
                                        if (motivoBaja) {
                                            setCheckMotivoBaja(false);
                                        }
                                    }}
                                    className="font-medium pl-2"
                                    classNames={commonLeftLabelClassNames}
                                >
                                    {MotivoBajaPrograma.map((option) => (
                                        <SelectItem key={option.key}>{option.label}</SelectItem>
                                    ))}
                                </Select>
                            )
                        }

                    </div>
                    {
                        programasSocio.error ?
                            <div className="w-full flex flex-row justify-center">
                                <Code className="font-sans" color="danger">{programasSocio.error}</Code>
                            </div>
                            :
                            <></>
                    }
                    <Alert color='warning' title={`NOTA: Al establecer una fecha de baja, automaticamente se asignará esta también a los grupos actualmente inscritos pertenecientes al programa.`} />
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleUpdate}
                        isLoading={programasSocio.loading}
                    >
                        Actualizar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UpdateSocioProgramModal;
