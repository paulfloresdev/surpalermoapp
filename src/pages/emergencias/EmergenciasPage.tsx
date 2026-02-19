import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configStore/store";
import { PaginatedParams, PaginatedState } from "../../types/commons";
import { paginatedEmergenciasRequest } from "../../store/features/emergencias/emergenciasSlice";
import { addToast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { Emergencia, PaginatedEmergenciasParams } from "../../types/emergencias";
import { perPageOptions } from "../../types/combos";
import StoreEmergenciaModal from "./modals/StoreEmergenciaModal";
import UpdateEmergenciaModal from "./modals/UpdateEmergenciaModal";
import DestroyEmergenciaModal from "./modals/DestroyEmergenciaModal";
import { paginatedEmergenciasAPI } from "../../helper/api/backend";
import { getFilenameFromDisposition } from "../socios/update/tabs/SocioFilesTab";
import LoadingReport from "../../components/layout/LoadingReport";

const EmergenciasPage: React.FC = () => {
    const dispatch = useDispatch();

    const columnClassname = "bg-transparent border-b !rounded-none"

    const emergencias = useSelector((state: RootState) => state.emergencias as PaginatedState<Emergencia>);

    const [page, setPage] = useState<undefined | number>(undefined);
    const [perPage, setPerPage] = useState<undefined | number>(10);
    const [search, setSearch] = useState<string>("");

    const [openStore, setOpenStore] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openDestroy, setOpenDestroy] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const [updateEmergency, setUpdateEmergency] = useState<undefined | Emergencia>(undefined);
    const [destroyEmergency, setDestroyEmergency] = useState<undefined | Emergencia>(undefined);

    useEffect(() => {
        if (!openStore && !openUpdate && !openDestroy) {
            if (shouldRefresh) {
                makeSearch();
            }
        }
    }, [page, perPage, openStore, openUpdate, openDestroy]);

    useEffect(() => {
        if (updateEmergency !== undefined && updateEmergency !== null) {
            setOpenUpdate(true);
        }
    }, [updateEmergency]);

    useEffect(() => {
        if (destroyEmergency !== undefined && destroyEmergency !== null) {
            setOpenDestroy(true);
        }
    }, [destroyEmergency])

    const buildParams = (excel = false): PaginatedEmergenciasParams => {
        const params: PaginatedEmergenciasParams = {
            page,
            body: {
                order: undefined,
                per_page: perPage,
                search: search === "" ? undefined : search,
                excel: excel
            }
        }

        return params;
    }

    const makeSearch = () => {
        var params = buildParams();
        dispatch(paginatedEmergenciasRequest(params));
    }

    const downloadExcel = async () => {
        setDownloading(true);

        try {
            const params = buildParams(true);
            const res = await paginatedEmergenciasAPI(params);

            const contentType = String(
                res.headers?.["content-type"] ?? res.headers?.["Content-Type"] ?? ""
            );

            // Si NO es xlsx, seguramente es JSON/HTML (error). Léelo y muestra mensaje.
            if (!contentType.includes("application/vnd.openxmlformats-officedocument")) {
                const data = res.data;

                const text =
                    data instanceof Blob
                        ? await data.text()
                        : typeof data === "string"
                            ? data
                            : JSON.stringify(data);

                let message = text;

                try {
                    const json = JSON.parse(text);
                    message = json?.message ?? message;
                } catch { }

                throw new Error(message);
            }

            // Normaliza a Blob real
            const data = res.data;
            const blob =
                data instanceof Blob
                    ? data
                    : new Blob([data], {
                        type:
                            contentType ||
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    });

            const cd =
                (res.headers?.["content-disposition"] as string | undefined) ??
                (res.headers?.["Content-Disposition"] as string | undefined);

            const filenameFromHeader = getFilenameFromDisposition(cd);
            const filename = filenameFromHeader ?? "emergencias.xlsx";

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
                description: error?.message || "No se pudo descargar",
                color: "danger",
            });
        } finally {
            setDownloading(false);
        }
    };


    if (downloading) {
        return <LoadingReport />;
    }

    return (
        <div className="w-3/4 mx-auto h-full flex flex-col gap-2">
            <span className="font-semibold text-lg">Emergencias</span>
            <div className="w-full flex flex-row items-center justify-between gap-4">
                <Input
                    size='sm'
                    variant='flat'
                    placeholder="Búsqueda"
                    className=""
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
                <Button
                    disableRipple
                    className="min-w-fit bg-emerald-500 text-white"
                    endContent={<DynamicFaIcon name="FaPlus" size={12} className="text-white" />}
                    variant="solid"
                    size="sm"
                    onPress={() => setOpenStore(true)}
                >
                    Agregar
                </Button>
                {/* Dropdown export */}
                <Dropdown size="sm">
                    <DropdownTrigger>
                        <Button
                            disableRipple
                            className="min-w-fit bg-cyan-900 text-white"
                            endContent={<DynamicFaIcon name="FaAngleDown" size={16} className="!text-white" />}
                            variant="solid"
                            size="sm"
                        >
                            Exportar
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem
                            key={1}
                            endContent={<DynamicFaIcon name="FaFileExcel" className="!text-emerald-500" />}
                            onPress={downloadExcel}
                        >
                            Exportar a Excel
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div className="w-full">
                    {
                        emergencias.loading ?
                            <div className="w-80  h-8 bg-gray-100 rounded-xl"></div>
                            : emergencias.error ? <span>{emergencias.error}</span>
                                : <div className="w-full flex flex-row items-center justify-end gap-2">
                                    <span className="text-sm text-gray-500">{`${emergencias.data?.from} - ${emergencias.data?.to} de ${emergencias.data?.total}`}</span>
                                    <Pagination
                                        size="sm"
                                        variant="flat"
                                        classNames={{
                                            wrapper: "gap-2",
                                            cursor: "bg-emerald-500 text-white"
                                        }}
                                        total={emergencias.data?.last_page ?? 1}
                                        page={emergencias.data?.current_page}
                                        onChange={(v) => setPage(v)}
                                    >

                                    </Pagination>
                                    <Select
                                        size="sm"
                                        variant="flat"
                                        className="w-20"
                                        labelPlacement="outside"
                                        selectedKeys={[String(perPage)]}
                                        onChange={(e) => {
                                            setPerPage(parseInt(e.target.value));
                                        }}
                                    >
                                        {perPageOptions.map((item) => (
                                            <SelectItem
                                                className="text-xs"
                                                key={item.key}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                    }
                </div>
            </div>
            <Table className="mt-4">
                <TableHeader>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Nombre</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Teléfono</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Dirección</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname} w-10`}>
                        {""}
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {emergencias.loading ?
                        <TableRow>
                            <TableCell>{""}</TableCell>
                            <TableCell className='text-center'>
                                <Spinner
                                    size='md'
                                    color='success'
                                />
                            </TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                        :
                        (emergencias.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className='hover:bg-gray-100 cursor-pointer !rounded-lg text-gray-600 hover:text-black'
                                onClick={() => setUpdateEmergency(item)}
                            >
                                <TableCell className='rounded-l-xl'>{item.nombre}</TableCell>
                                <TableCell>{item.telefono}</TableCell>
                                <TableCell>{item.direccion}</TableCell>
                                <TableCell className='rounded-r-xl p-2'>
                                    <Button
                                        variant="flat"
                                        color="danger"
                                        className="w-10 min-w-10 p-0"
                                        onPress={() => setDestroyEmergency(item)}
                                    >
                                        <DynamicFaIcon name="FaTrash" size={16} className="text-rose-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {
                openStore && <StoreEmergenciaModal
                    value={openStore}
                    setValue={setOpenStore}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openUpdate && <UpdateEmergenciaModal
                    item={updateEmergency!}
                    setItem={setUpdateEmergency}
                    value={openUpdate}
                    setValue={setOpenUpdate}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openDestroy && <DestroyEmergenciaModal
                    item={destroyEmergency!}
                    setItem={setDestroyEmergency}
                    value={openDestroy}
                    setValue={setOpenDestroy}
                    setShouldRefresh={setShouldRefresh}
                />
            }
        </div>
    );
}

export default EmergenciasPage;