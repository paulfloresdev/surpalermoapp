import React, { useEffect, useState } from "react";
import { ControlledModal, ItemState, ListState } from "../../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { DocenteGrupoPivot, DocenteGrupoPivotBody } from "../../../../types/docenteGrupoPivots";
import { Docente } from "../../../../types/docentes";
import { indexDocentesRequest } from "../../../../store/features/docentes/docentesSlice";
import { addToast, Autocomplete, AutocompleteItem, Button, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { storeDocenteGrupoPivotRequest } from "../../../../store/features/docenteGrupoPivots/docenteGrupoPivotsSlice";
import { commonLeftLabelClassNames } from "../../../socios/update/fichas/AFormPage";

interface StoreDocenteGrupoPivotModalProps extends ControlledModal {
    grupoId: number;
}

const StoreDocenteGrupoPivotModal: React.FC<StoreDocenteGrupoPivotModalProps> = ({ value, setValue, setShouldRefresh, grupoId }) => {
    const dispatch = useDispatch();

    const docenteGrupo = useSelector((state: RootState) => state.docenteGrupoPivots as ItemState<DocenteGrupoPivot>);
    const opciones = useSelector((state: RootState) => state.docentes as ListState<Docente>);

    const [checkDocenteId, setCheckDocenteId] = useState<boolean>(false);

    const [docenteId, setDocenteId] = useState<undefined | string>(undefined);

    useEffect(() => {
        dispatch(indexDocentesRequest());
    }, []);

    useEffect(() => {
        if (docenteGrupo.storeSuccess !== null) {
            if (docenteGrupo.storeSuccess) {
                addToast({
                    title: "OK",
                    description: docenteGrupo.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: docenteGrupo.error,
                    color: 'danger',
                })
            }
            setShouldRefresh(true);
            closeModal();
        }
    }, [docenteGrupo.storeSuccess]);

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

        var body: DocenteGrupoPivotBody = {
            grupo_id: grupoId,
            docente_id: parseInt(docenteId),
        }

        dispatch(storeDocenteGrupoPivotRequest(body));
    }

    if (opciones.loading || docenteGrupo.loading) {
        return <div>Cargando...</div>;
    }

    return (
        <Modal isOpen={value} onClose={abort} size="lg">
            <ModalContent>
                <ModalHeader>Agregar Docente</ModalHeader>
                <ModalBody className="w-full flex flex-col gap-8 pb-6">
                    <Autocomplete
                        required
                        isInvalid={checkDocenteId}
                        placeholder="Docente"
                        label="Docente"
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
                        isLoading={docenteGrupo.loading}
                    >
                        Agregar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default StoreDocenteGrupoPivotModal;
