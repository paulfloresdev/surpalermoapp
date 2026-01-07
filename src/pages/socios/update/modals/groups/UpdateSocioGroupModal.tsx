import React, { useEffect, useState } from "react";
import { SocioGrupoPivot, SocioGrupoPivotBody, UpdateSocioGrupoPivotParams } from "../../../../../types/socioGrupoPivots";
import { addToast, Button, Code, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/configStore/store";
import { ControlledModal, ItemState } from "../../../../../types/commons";
import { DateToInput } from "../../../../../helper/utils/Format";
import { updateSocioGrupoPivotRequest } from "../../../../../store/features/socioGrupoPivots/socioGrupoPivotsSlice";

interface UpdateSocioGroupProps extends ControlledModal {
    item: SocioGrupoPivot;
}

const UpdateSocioGroupModal: React.FC<UpdateSocioGroupProps> = ({ item, value, setValue }) => {
    if (!item) {
        return null;
    }

    const dispatch = useDispatch();

    const gruposSocio = useSelector((state: RootState) => state.socioGrupoPivots as ItemState<SocioGrupoPivot>);

    const [checkFechaBaja, setCheckFechaBaja] = useState<boolean>(false);

    const [fechaBaja, setFechaBaja] = useState<Date | undefined>(undefined);

    useEffect(() => {
        if (gruposSocio.updateSuccess !== null) {
            if (gruposSocio.updateSuccess) {
                addToast({
                    title: "OK",
                    description: "Inscipción actualizada exitosamente.",
                    color: 'success',
                })

                closeModal();
            } else {
                addToast({
                    title: "Error",
                    description: gruposSocio.error,
                    color: 'danger',
                })

                closeModal();
            }
        }
    }, [gruposSocio.updateSuccess])

    const closeModal = () => {
        setValue(false);
    }

    const handleUpdate = () => {
        setCheckFechaBaja(fechaBaja === undefined);

        if (!checkFechaBaja) {
            var body: SocioGrupoPivotBody = {
                fecha_baja: fechaBaja ?? new Date(),
                socio_id: item.socio_id,
                grupo_id: item.grupo_id,
            }

            var params: UpdateSocioGrupoPivotParams = {
                id: item.id.toString(),
                body: body,
            }

            dispatch(updateSocioGrupoPivotRequest(params));
        }
    }

    return (
        <Modal isOpen={value} onClose={() => closeModal()} size="lg">
            <ModalContent>
                <ModalHeader>Actualizar inscripción a grupo</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    {
                        item !== undefined ?
                            <Code className="font-sans p-3 flex flex-col border-2 gap-2" color="default">
                                <span className="font-semibold w-full">Programa: <span className="font-normal">{item.grupo.programa?.nombre}</span></span>
                                <span className="font-semibold w-full">Grupo: <span className="font-normal">{item.grupo.nombre}</span></span>
                                <div className="w-full grid grid-cols-2 gap-2">
                                    <span className="font-semibold w-full">Tipo: <span className="font-normal">{item.grupo.tipo}</span></span>
                                    <span className="font-semibold w-full">Costo base: <span className="font-normal">${item.grupo.costo_base}</span></span>
                                    <span className="font-semibold w-full">Horario: <span className="font-normal">{`${item.grupo.hora_inicio} - ${item.grupo.hora_fin}`}</span></span>
                                </div>
                            </Code>
                            :
                            <></>
                    }
                    <Divider />
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
                            }
                        }}
                    />
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleUpdate}
                        isLoading={gruposSocio.loading}
                    >
                        Actualizar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UpdateSocioGroupModal;