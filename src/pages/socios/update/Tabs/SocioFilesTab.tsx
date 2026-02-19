import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToast,
    Button,
    Card,
    Input,
    Pagination,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import { RootState } from "../../../../store/configStore/store";
import { PaginatedState } from "../../../../types/commons";
import { SearchSocioFilesParams, SocioFile } from "../../../../types/socioFiles";
import DynamicFaIcon from "../../../../components/DynamicFaIcon";
import { perPageOptions } from "../../../../types/combos";
import { paginatedSocioFilesRequest } from "../../../../store/features/socioFiles/socioFilesSlice";
import { TABLE_COLUMN_CLASSNAME } from "../../../../helper/utils/Constants";
import { getFileExtension } from "../../../../helper/utils/Format";
import { getSocioFileBlobAPI } from "../../../../helper/api/backend";
import StoreSocioFileModal from "../modals/socioFiles/StoreSocioFileModal";
import DestroySocioFileModal from "../modals/socioFiles/DestroySocioFileModal";


interface Props {
    socioId: number;
    editable: boolean
}

const SocioFilesTab: React.FC<Props> = ({ socioId, editable = false }) => {
    const dispatch = useDispatch();
    const socioFiles = useSelector(
        (state: RootState) => state.socioFiles as PaginatedState<SocioFile>
    );

    // paginado + búsqueda
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");

    // modales
    const [openStore, setOpenStore] = useState<boolean>(false);
    const [openDestroy, setOpenDestroy] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SocioFile | null>(null);


    // refresco
    const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);

    useEffect(() => {
        makeSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, perPage]);

    // si el modal se cerró y marcó refresh => recargar y resetear flag
    useEffect(() => {
        if (!openStore && shouldRefresh) {
            makeSearch();
            setShouldRefresh(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openStore, shouldRefresh]);

    const buildParams = (): SearchSocioFilesParams => ({
        page,
        body: {
            socio_id: socioId,
            socio_file_type_id: undefined, // como pediste, sin filtro por type de momento
            search: search.trim() !== "" ? search : undefined,
            per_page: perPage,
            order: undefined,
        },
    });

    const makeSearch = () => {
        dispatch(paginatedSocioFilesRequest(buildParams()));
    };

    const downloadSocioFile = async (item: SocioFile) => {
        try {
            // inline=false => attachment
            const res = await getSocioFileBlobAPI(String(item.id), false);

            const blob = res.data as Blob;

            const cd =
                (res.headers?.["content-disposition"] as string | undefined) ??
                (res.headers?.["Content-Disposition"] as string | undefined);

            const filenameFromHeader = getFilenameFromDisposition(cd);

            const ext = getFileExtension(item.path);
            const fallbackName = ext ? `${item.name}.${ext}` : item.name;

            const filename = filenameFromHeader ?? fallbackName;

            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(blobUrl);
        } catch (error: any) {
            addToast({
                title: "Error",
                description:
                    error?.response?.data?.message ||
                    error?.customMessage ||
                    error?.message ||
                    "No se pudo descargar",
                color: "danger",
            });
        }
    };

    return (
        <>
            {/* MODALS */}
            <StoreSocioFileModal
                socioId={socioId}
                value={openStore}
                setValue={setOpenStore}
                setShouldRefresh={setShouldRefresh}
            />
            <DestroySocioFileModal
                value={openDestroy}
                setValue={setOpenDestroy}
                setShouldRefresh={setShouldRefresh}
                item={selectedItem}
                setItem={setSelectedItem}
            />


            <Card className="w-full flex flex-col gap-8 p-10">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-4">
                        <Input
                            size="sm"
                            variant="flat"
                            placeholder="Búsqueda por nombre"
                            className="w-96"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    setPage(1);
                                    makeSearch();
                                }
                            }}
                            endContent={
                                <DynamicFaIcon
                                    name="FaSearch"
                                    size={16}
                                    btnInput={true}
                                    onClick={() => {
                                        setPage(1);
                                        makeSearch();
                                    }}
                                />
                            }
                        />

                        {/* ✅ Botón abrir modal */}
                        {
                            !editable ? <></> :
                                <Button
                                    size="sm"
                                    variant="solid"
                                    className="text-white bg-emerald-500 hover:bg-emerald-400"
                                    onPress={() => setOpenStore(true)}
                                >
                                    Subir archivo
                                </Button>
                        }
                    </div>

                    {/* Pagination + items per page */}
                    {!socioFiles.loading && !socioFiles.error && (
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-sm text-gray-500">
                                {`${socioFiles.data?.from ?? 0} - ${socioFiles.data?.to ?? 0} de ${socioFiles.data?.total ?? 0
                                    }`}
                            </span>

                            <Pagination
                                size="sm"
                                variant="flat"
                                classNames={{ wrapper: "gap-2", cursor: "bg-emerald-500 text-white" }}
                                total={socioFiles.data?.last_page ?? 1}
                                page={page}
                                onChange={(v) => setPage(v)}
                            />

                            <Select
                                size="sm"
                                variant="flat"
                                className="w-20"
                                selectedKeys={[String(perPage)]}
                                onChange={(e) => {
                                    setPage(1);
                                    setPerPage(parseInt(e.target.value));
                                }}
                            >
                                {perPageOptions.map((item) => (
                                    <SelectItem key={item.key} className="text-xs">
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    )}
                </div>

                {/* Tabla */}
                <Table removeWrapper>
                    <TableHeader>
                        <TableColumn className={TABLE_COLUMN_CLASSNAME}>Nombre de archivo</TableColumn>
                        <TableColumn className={TABLE_COLUMN_CLASSNAME}>Formato</TableColumn>
                        <TableColumn className={TABLE_COLUMN_CLASSNAME}>Tipo</TableColumn>
                        <TableColumn className={TABLE_COLUMN_CLASSNAME}>{""}</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {socioFiles.loading ? (
                            <TableRow>
                                <TableCell>{""}</TableCell>
                                <TableCell>Cargando...</TableCell>
                                <TableCell>{""}</TableCell>
                                <TableCell>{""}</TableCell>
                            </TableRow>
                        ) : (
                            (socioFiles.data?.data ?? []).map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-100 cursor-pointer">
                                    <TableCell className="rounded-l-xl w-1/3">{item.name}</TableCell>
                                    <TableCell className="font-semibold w-1/4">
                                        {getFileExtension(item.path).toUpperCase()}
                                    </TableCell>
                                    <TableCell className="w-1/4">{item.socio_file_type?.name ?? "-"}</TableCell>

                                    <TableCell className="rounded-r-xl w-full flex flex-row gap-2">
                                        <Button
                                            size="sm"
                                            className="bg-emerald-500 text-white text-center"
                                            startContent={
                                                <DynamicFaIcon name={"FaFileDownload"} className="text-white" size={14} />
                                            }
                                            onPress={() => downloadSocioFile(item)}
                                        >
                                            Descargar
                                        </Button>

                                        {
                                            !editable ? <></> :
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="danger"
                                                    onPress={() => {
                                                        setSelectedItem(item);
                                                        setOpenDestroy(true);
                                                    }}
                                                >
                                                    <DynamicFaIcon name={"FaTrash"} className="text-rose-600" size={14} />
                                                </Button>
                                        }

                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
};

export default SocioFilesTab;


export const getFilenameFromDisposition = (contentDisposition?: string | null) => {
    if (!contentDisposition) return null;

    // filename*=UTF-8''...
    const matchUtf = contentDisposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
    if (matchUtf?.[1]) return decodeURIComponent(matchUtf[1].replace(/"/g, ""));

    // filename="..."
    const match = contentDisposition.match(/filename\s*=\s*"?([^"]+)"?/i);
    if (match?.[1]) return match[1];

    return null;
};