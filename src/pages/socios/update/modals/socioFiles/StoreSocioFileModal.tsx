import React, { useEffect, useMemo, useState } from "react";
import { ControlledModal, ItemState } from "../../../../../types/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/configStore/store";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Spinner } from "@heroui/react";
import { SocioFile } from "../../../../../types/socioFiles";
import { SocioFileType } from "../../../../../types/socioFileType";

// actions (ajusta rutas/nombres a tu proyecto)
import { indexSocioFileTypesRequest } from "../../../../../store/features/socioFileTypes/socioFileTypesSlice";
import { storeSocioFileRequest } from "../../../../../store/features/socioFiles/socioFilesSlice";

interface Props extends ControlledModal {
    socioId: number;
}

const StoreSocioFileModal: React.FC<Props> = ({ socioId, value, setValue, setShouldRefresh }) => {
    const dispatch = useDispatch();

    const files = useSelector((state: RootState) => state.socioFiles as ItemState<SocioFile>);
    const fileTypes = useSelector((state: RootState) => state.socioFileTypes as ItemState<SocioFileType>);

    const [checkNombre, setCheckNombre] = useState(false);
    const [checkTipo, setCheckTipo] = useState(false);
    const [checkFile, setCheckFile] = useState(false);

    const [nombre, setNombre] = useState<string>("");
    const [tipoId, setTipoId] = useState<number | undefined>(undefined);
    const [file, setFile] = useState<File | null>(null);

    // carga tipos al abrir
    useEffect(() => {
        if (value) {
            dispatch(indexSocioFileTypesRequest());
        }
    }, [value]);

    // escuchar resultado del store
    useEffect(() => {
        if (files.storeSuccess !== null) {
            if (files.storeSuccess) {
                addToast({
                    title: "OK",
                    description: files.message ?? "Archivo subido",
                    color: "success",
                });
                setShouldRefresh(true);
                closeModal();
            } else {
                addToast({
                    title: "Error",
                    description: files.error ?? "No se pudo subir el archivo",
                    color: "danger",
                });
            }
        }
    }, [files.storeSuccess]);

    const closeModal = () => {
        setNombre("");
        setTipoId(undefined);
        setFile(null);
        setValue(false);
    };

    const abort = () => {
        setShouldRefresh(false);
        closeModal();
    };

    const onPickFile = (f: File | null) => {
        setFile(f);
        // si no hay nombre y el usuario sube archivo, autollenar (opcional)
        if (!nombre.trim() && f?.name) {
            // quitar extensión para el "name visible"
            const base = f.name.replace(/\.[^/.]+$/, "");
            setNombre(base);
        }
    };

    const handleStore = () => {
        const ckNombre = !nombre.trim();
        const ckTipo = tipoId === undefined;
        const ckFile = file === null;

        setCheckNombre(ckNombre);
        setCheckTipo(ckTipo);
        setCheckFile(ckFile);

        if (ckNombre || ckTipo || ckFile) return;

        // IMPORTANT: aquí mandamos file para saga/API multipart
        dispatch(
            storeSocioFileRequest({
                socio_id: socioId,
                socio_file_type_id: tipoId!,
                name: nombre.trim(),
                file: file!,
            })
        );
    };

    const typesList = useMemo(() => {
        // Si tu slice devuelve array en fileTypes.data o en fileTypes.data.data,
        // ajústalo aquí según tu estructura real.
        // Como lo estás tipando ItemState<SocioFileType>, lo usual es:
        // fileTypes.data => SocioFileType | null (item)
        // pero para index necesitas lista.
        // Si tu socioFileTypes slice maneja listas, probablemente debería ser ListState.
        // Para que te funcione AHORA con tu tipado, asumo que en fileTypes.data viene un array.
        const anyData: any = fileTypes.data as any;
        return Array.isArray(anyData) ? (anyData as SocioFileType[]) : (anyData?.data ?? []);
    }, [fileTypes.data]);

    return (
        <Modal isOpen={value} onClose={abort} size="3xl">
            <ModalContent>
                <ModalHeader>Subir archivo</ModalHeader>

                <ModalBody className="w-full flex flex-col gap-6 pb-6">
                    {/* Nombre visible */}
                    <Input
                        required
                        isInvalid={checkNombre}
                        label="Nombre*"
                        placeholder="Nombre visible del archivo"
                        labelPlacement="outside"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    {/* Tipo */}
                    {fileTypes.loading ? (
                        <div className="w-full flex items-center gap-2">
                            <Spinner size="sm" color="success" />
                            <span className="text-sm text-gray-500">Cargando tipos...</span>
                        </div>
                    ) : (
                        <Select
                            required
                            isInvalid={checkTipo}
                            label="Tipo de documento*"
                            placeholder="Selecciona el tipo"
                            labelPlacement="outside"
                            selectedKeys={tipoId !== undefined ? [String(tipoId)] : []}
                            onChange={(e) => setTipoId(parseInt(e.target.value))}
                            className="font-medium min-w-0 w-full"
                        >
                            {(typesList ?? []).map((t: SocioFileType) => (
                                <SelectItem key={t.id}>{t.name}</SelectItem>
                            ))}
                        </Select>
                    )}

                    {/* Archivo */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                            Archivo*{" "}
                            {checkFile && (
                                <span className="text-rose-600 font-normal"> (requerido)</span>
                            )}
                        </label>

                        <input
                            type="file"
                            onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                            className="block w-full text-sm
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-emerald-50 file:text-emerald-700
                         hover:file:bg-emerald-100"
                        />

                        {file && (
                            <div className="text-xs text-gray-500">
                                Seleccionado: <span className="font-medium">{file.name}</span>
                            </div>
                        )}
                    </div>

                    {/* Botones */}
                    <div className="w-full flex flex-row justify-end gap-3 pt-2">
                        <Button size="sm" variant="flat" color="danger" onPress={abort}>
                            Cancelar
                        </Button>

                        <Button
                            size="sm"
                            variant="solid"
                            className="text-white bg-emerald-500 hover:bg-emerald-400"
                            onPress={handleStore}
                            isLoading={files.loading}
                        >
                            Subir
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default StoreSocioFileModal;
