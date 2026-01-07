import { addToast, Autocomplete, AutocompleteItem, Button, Code, Divider, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/configStore/store";
import { ControlledModal, ItemState, ListState } from "../../../../../types/commons";
import { Grupo } from "../../../../../types/grupos";
import { SocioGrupoPivot, SocioGrupoPivotBody } from "../../../../../types/socioGrupoPivots";
import { getByProgramasOfSocioRequest } from "../../../../../store/features/grupos/gruposSlice";
import CustomSkeleton from "../../../../../components/CustomSkeleton";
import { storeSocioGrupoPivotRequest } from "../../../../../store/features/socioGrupoPivots/socioGrupoPivotsSlice";

interface IscriptionSocioGroupModalProps extends ControlledModal {
    socioId: number;
}

const InscriptionSocioGroupModal: React.FC<IscriptionSocioGroupModalProps> = ({ socioId, value, setValue }) => {
    const dispatch = useDispatch();

    const grupos = useSelector((state: RootState) => state.grupos as ListState<Grupo>);
    const gruposSocio = useSelector((state: RootState) => state.socioGrupoPivots as ItemState<SocioGrupoPivot>);

    const [checkGrupoId, setCheckGrupoId] = useState<boolean>(false);

    const [grupoId, setGrupoId] = useState<number | undefined>(undefined);
    const [grupo, setGrupo] = useState<Grupo | undefined>(undefined);

    useEffect(() => {
        dispatch(getByProgramasOfSocioRequest(socioId.toString()));
    }, []);

    useEffect(() => {
        if (gruposSocio.storeSuccess !== null) {
            if (gruposSocio.storeSuccess) {
                addToast({
                    title: "OK",
                    description: "Inscipción realizada exitosamente.",
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
    }, [gruposSocio.storeSuccess])

    useEffect(() => {
        if (grupoId !== undefined) {
            var grupo = grupos.data?.find(g => g.id === grupoId);
            if (grupo !== undefined) {
                setGrupo(grupo);
            } else {
                setGrupo(undefined);
            }
        } else {
            setGrupo(undefined);
        }
    }, [grupoId])

    const closeModal = () => {
        setGrupoId(undefined);
        setGrupo(undefined);
        setCheckGrupoId(false);
        setValue(false);
    }

    const handleInscription = () => {
        setCheckGrupoId(grupoId === undefined);
        if (!checkGrupoId) {
            var body: SocioGrupoPivotBody = {
                socio_id: socioId,
                grupo_id: grupoId ?? 0,
                fecha_baja: undefined

            }

            dispatch(storeSocioGrupoPivotRequest(body));
        }
    }

    return (
        <Modal isOpen={value} onClose={() => closeModal()} size="lg">
            <ModalContent>
                <ModalHeader>Inscribir a grupo</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    {
                        grupo !== undefined ?
                            <Code className="font-sans p-3 flex flex-col border-2 gap-2" color="default">
                                <span className="font-semibold w-full">Programa: <span className="font-normal">{grupo.programa?.nombre}</span></span>
                                <span className="font-semibold w-full">Grupo: <span className="font-normal">{grupo.nombre}</span></span>
                                <div className="w-full grid grid-cols-2 gap-2">
                                    <span className="font-semibold w-full">Tipo: <span className="font-normal">{grupo.tipo}</span></span>
                                    <span className="font-semibold w-full">Costo base: <span className="font-normal">${grupo.costo_base}</span></span>
                                    <span className="font-semibold w-full">Horario: <span className="font-normal">{`${grupo.hora_inicio} - ${grupo.hora_fin}`}</span></span>
                                </div>
                            </Code>
                            :
                            <></>
                    }
                    <Divider />
                    <>
                        {
                            grupos.loading ?
                                <CustomSkeleton /> :
                                <Autocomplete
                                    required
                                    placeholder="Grupo"
                                    label="Selecciona un grupo"
                                    labelPlacement="outside"
                                    color={checkGrupoId ? 'danger' : 'default'}
                                    selectedKey={grupoId ? String(grupoId) : undefined}
                                    defaultItems={grupos.data ?? []}
                                    onSelectionChange={(key) => {
                                        if (key) setGrupoId(parseInt(key.toString()));
                                    }}
                                >
                                    {(option) => (
                                        <AutocompleteItem key={option.id} textValue={option.nombre}>
                                            <div className="w-full flex flex-col gap-1">
                                                <span>{option.nombre}</span>
                                                <span className="text-gray-500 text-xs">{option.programa?.nombre}</span>
                                            </div>
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>

                        }
                    </>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleInscription}
                        isLoading={gruposSocio.loading}
                    >
                        Inscribir
                    </Button>
                    <span>{gruposSocio.loading}</span>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default InscriptionSocioGroupModal;