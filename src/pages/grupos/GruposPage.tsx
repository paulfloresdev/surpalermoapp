import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configStore/store";
import { PaginatedState } from "../../types/commons";
import { Grupo, PaginatedGruposParams } from "../../types/grupos";
import { paginatedGruposRequest } from "../../store/features/grupos/gruposSlice";
import { addToast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { perPageOptions } from "../../types/combos";
import { formatMoney } from "../../helper/utils/Format";
import StoreGrupoModal from "./modals/StoreGrupoModal";
import UpdateGrupoModal from "./modals/UpdateGrupoModal";
import DestroyGrupoModal from "./modals/DestroyGrupoModal";
import { useNavigate } from "react-router";
import LoadingReport from "../../components/layout/LoadingReport";
import { getFilenameFromDisposition } from "../socios/update/tabs/SocioFilesTab";
import { paginatedGruposAPI } from "../../helper/api/backend";

const GruposPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const columnClassname = "bg-transparent border-b !rounded-none"

    const grupos = useSelector((state: RootState) => state.grupos as PaginatedState<Grupo>);
    const permissions = useSelector((state: RootState) => state.auth.user?.permissions);

    const [isEditable, setIsEditable] = useState<boolean>(false);

    const [page, setPage] = useState<undefined | number>(undefined);
    const [perPage, setPerPage] = useState<undefined | number>(10);
    const [search, setSearch] = useState<string>("");

    const [openStore, setOpenStore] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openDestroy, setOpenDestroy] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const [updateGrupo, setUpdateGrupo] = useState<undefined | Grupo>(undefined);
    const [destroyGrupo, setDestroyGrupo] = useState<undefined | Grupo>(undefined);

    useEffect(() => {
        if (!openStore && !openUpdate && !openDestroy) {
            if (shouldRefresh) {
                makeSearch();
            }
        }
        setIsEditable(permissions?.includes('mantenimiento-editar') ?? false);
    }, [perPage, page, openStore, openUpdate, openDestroy]);

    useEffect(() => {
        if (updateGrupo !== undefined && updateGrupo !== null) {
            setOpenUpdate(true);
        }
    }, [updateGrupo]);

    useEffect(() => {
        if (destroyGrupo !== undefined && destroyGrupo !== null) {
            setOpenDestroy(true);
        }
    }, [destroyGrupo]);

    const buildParams = (excel = false): PaginatedGruposParams => {
        const params: PaginatedGruposParams = {
            page,
            body: {
                order: undefined,
                per_page: perPage,
                search: search === "" ? undefined : search,
                excel: excel,
            }
        }

        return params;
    }

    const makeSearch = () => {
        var params = buildParams();
        dispatch(paginatedGruposRequest(params));
    }

    const downloadExcel = async () => {
        setDownloading(true);

        try {
            const params = buildParams(true);
            const res = await paginatedGruposAPI(params);

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
            const filename = filenameFromHeader ?? "grupos.xlsx";

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
            <span className="font-semibold text-lg">Grupos</span>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-x-4 items-center">
                    <Input
                        size='sm'
                        variant='flat'
                        placeholder="Búsqueda"
                        className="w-64"
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
                    {
                        !isEditable ? <></> :
                            <Button
                                disableRipple
                                className="bg-emerald-500 text-white"
                                endContent={<DynamicFaIcon name="FaPlus" size={12} className="text-white" />}
                                variant="solid"
                                size="sm"
                                onPress={() => setOpenStore(true)}
                            >
                                Agregar
                            </Button>
                    }
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
                </div>
                <div className="">
                    {
                        grupos.loading ?
                            <div className="w-80 h-8 bg-gray-100 rounded-xl"></div>
                            : grupos.error ? <span>{grupos.error}</span>
                                : <div className="flex flex-row items-center gap-2">
                                    <span className="text-sm text-gray-500">{`${grupos.data?.from} - ${grupos.data?.to} de ${grupos.data?.total}`}</span>
                                    <Pagination
                                        size="sm"
                                        variant="flat"
                                        classNames={{
                                            wrapper: "gap-2",
                                            cursor: "bg-emerald-500 text-white"
                                        }}
                                        total={grupos.data?.last_page ?? 1}
                                        page={grupos.data?.current_page}
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
                        <span className='text-sm'>Activo</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Nombre</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Tipo</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Programa</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Costo base</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname} w-10`}>
                        {""}
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {grupos.loading ?
                        <TableRow>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell className='text-center'>
                                <Spinner
                                    size='md'
                                    color='success'
                                />
                            </TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                        :
                        (grupos.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className='hover:bg-gray-100 cursor-pointer !rounded-lg text-gray-600 hover:text-black'
                                onClick={() => navigate('/sia/mantenimiento/grupos/' + item.id + '/detalle')}
                            >
                                <TableCell className='rounded-l-xl p-2'>
                                    <Button
                                        size='sm'
                                        variant='flat'
                                        color={item.activo ? "success" : "danger"}
                                        className='w-12 font-semibold'
                                    >
                                        {item.activo ? "Activo" : "Inactivo"}
                                    </Button>
                                </TableCell>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.tipo}</TableCell>
                                <TableCell>{item.programa?.nombre}</TableCell>
                                <TableCell>{formatMoney(item.costo_base)}</TableCell>
                                <TableCell className='rounded-r-xl p-2 flex flex-row gap-2'>
                                    {
                                        !isEditable ? <></> :
                                            <>
                                                <Button
                                                    variant="flat"
                                                    color="primary"
                                                    className="w-10 min-w-10 p-0"
                                                    onPress={() => setUpdateGrupo(item)}
                                                >
                                                    <DynamicFaIcon name="FaPen" size={16} className="!text-blue-600" />
                                                </Button>
                                                <Button
                                                    variant="flat"
                                                    color="danger"
                                                    className="w-10 min-w-10 p-0"
                                                    onPress={() => setDestroyGrupo(item)}
                                                >
                                                    <DynamicFaIcon name="FaTrash" size={16} className="text-rose-600" />
                                                </Button>
                                            </>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {
                openStore && <StoreGrupoModal
                    value={openStore}
                    setValue={setOpenStore}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openUpdate && <UpdateGrupoModal
                    item={updateGrupo!}
                    setItem={setUpdateGrupo}
                    value={openUpdate}
                    setValue={setOpenUpdate}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openDestroy && <DestroyGrupoModal
                    item={destroyGrupo!}
                    setItem={setDestroyGrupo}
                    value={openDestroy}
                    setValue={setOpenDestroy}
                    setShouldRefresh={setShouldRefresh}
                />
            }
        </div>
    );
}
export default GruposPage;