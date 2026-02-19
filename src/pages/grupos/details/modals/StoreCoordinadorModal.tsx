import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState, ListState } from "../../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { Coordinador, CoordinadorBody } from "../../../../types/coordinadores";
import { Docente } from "../../../../types/docentes";
import { indexDocentesRequest } from "../../../../store/features/docentes/docentesSlice";
import { addToast, Autocomplete, AutocompleteItem, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { storeCoordinadorRequest } from "../../../../store/features/coordinadores/coordinadoresSlice";
import { commonLeftLabelClassNames } from "../../../socios/update/fichas/AFormPage";

interface StoreCoordinadorModalProps extends ControlledModal {
    grupoId: number;
}

const StoreCoordinadorModal: React.FC<StoreCoordinadorModalProps> = ({ value, setValue, setShouldRefresh, grupoId }) => {
    const dispatch = useDispatch();

    const coordinadores = useSelector((state: RootState) => state.coordinadores as ItemState<Coordinador>);
    const opciones = useSelector((state: RootState) => state.docentes as ListState<Docente>);

    const [checkDocenteId, setCheckDocenteId] = useState<boolean>(false);

    const [docenteId, setDocenteId] = useState<undefined | string>(undefined);

    useEffect(() => {
        dispatch(indexDocentesRequest());
    }, []);

    useEffect(() => {
        if (coordinadores.storeSuccess !== null) {
            if (coordinadores.storeSuccess) {
                addToast({
                    title: "OK",
                    description: coordinadores.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: coordinadores.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [coordinadores.storeSuccess]);

    const closeModal = () => {
        setDocenteId(undefined);
        setValue(false);
    }

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    }

    const handleStore = () => {
        const check = docenteId === undefined || docenteId === "";
        setCheckDocenteId(check);

        if (check) return;

        var body: CoordinadorBody = {
            grupo_id: grupoId,
            docente_id: parseInt(docenteId),
        }

        dispatch(storeCoordinadorRequest(body));
    }

    if (opciones.loading || coordinadores.loading) {
        return <div>Cargando...</div>;
    }

    return (
        <Modal isOpen={value} onClose={abort} size="lg">
            <ModalContent>
                <ModalHeader>Agregar Coordinador</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <Autocomplete
                        required
                        isInvalid={checkDocenteId}
                        placeholder="Coordinador"
                        label="Coordinador"
                        labelPlacement="outside"
                        value={docenteId}
                        defaultItems={opciones.data ?? []}
                        classNames={commonLeftLabelClassNames}
                        className="w-full font-medium pl-2"
                        onSelectionChange={(key) => {
                            if (key) setDocenteId(key.toString());
                        }}
                    >
                        {(option) => (
                            <AutocompleteItem key={option.id} textValue={`${option.nombre} ${option.apellido}`}>{`${option.nombre} ${option.apellido}`}</AutocompleteItem>
                        )}
                    </Autocomplete>
                    <Button
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={handleStore}
                        isLoading={coordinadores.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreCoordinadorModal;