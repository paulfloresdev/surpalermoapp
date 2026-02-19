import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configStore/store";
import { PaginatedState } from "../../types/commons";
import { Mutualista, SearchMutualistasParams } from "../../types/mutualistas";
import { addToast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { perPageOptions } from "../../types/combos";
import { searchMutualistasRequest } from "../../store/features/mutualistas/mutualistasSlice";
import StoreMutualistaModal from "./modals/StoreMutualistaModal";
import UpdateMutualistaModal from "./modals/UpdateMutualistaModal";
import DestroyMutualistaModal from "./modals/DestroyMutualistaModal";
import LoadingReport from "../../components/layout/LoadingReport";
import { getFilenameFromDisposition } from "../socios/update/tabs/SocioFilesTab";
import { searchMutualistasAPI } from "../../helper/api/backend";

const MutualistasPage: React.FC = () => {
    const dispatch = useDispatch();

    const columnClassname = "bg-transparent border-b !rounded-none";

    const mutualistas = useSelector((state: RootState) => state.mutualistas as PaginatedState<Mutualista>);

    const [page, setPage] = useState<undefined | number>(undefined);
    const [perPage, setPerPage] = useState<undefined | number>(10);
    const [search, setSearch] = useState<undefined | string>(undefined);

    const [openStore, setOpenStore] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openDestroy, setOpenDestroy] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const [updateMutualista, setUpdateMutualista] = useState<undefined | Mutualista>(undefined);
    const [destroyMutualista, setDestroyMutualista] = useState<undefined | Mutualista>(undefined);

    useEffect(() => {
        if (!openStore && !openUpdate && !openDestroy) {
            if (shouldRefresh) {
                makeSearch();
            }
        }
    }, [page, perPage, openStore, openUpdate, openDestroy]);

    useEffect(() => {
        if (updateMutualista !== undefined && updateMutualista !== null) {
            setOpenUpdate(true);
        }
    }, [updateMutualista]);

    useEffect(() => {
        if (destroyMutualista !== undefined && destroyMutualista !== null) {
            setOpenDestroy(true);
        }
    }, [destroyMutualista])

    const buildParams = (excel = false): SearchMutualistasParams => {
        const params: SearchMutualistasParams = {
            page,
            body: {
                order: undefined,
                per_page: perPage,
                search: search,
                excel: excel
            }
        }

        return params;
    }

    const makeSearch = () => {
        var params = buildParams();
        dispatch(searchMutualistasRequest(params));
    }

    const downloadExcel = async () => {
        setDownloading(true);

        try {
            const params = buildParams(true);
            const res = await searchMutualistasAPI(params);

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
            const filename = filenameFromHeader ?? "mutualistas.xlsx";

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
            <span className="font-semibold text-lg">Mutualistas</span>
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
                        mutualistas.loading ?
                            <div className="w-80 h-8 bg-gray-100 rounded-xl"></div>
                            : mutualistas.error ? <span>{mutualistas.error}</span>
                                : <div className="flex flex-row items-center gap-2">
                                    <span className="text-sm text-gray-500">{`${mutualistas.data?.from} - ${mutualistas.data?.to} de ${mutualistas.data?.total}`}</span>
                                    <Pagination
                                        size="sm"
                                        variant="flat"
                                        classNames={{
                                            wrapper: "gap-2",
                                            cursor: "bg-emerald-500 text-white"
                                        }}
                                        total={mutualistas.data?.last_page ?? 1}
                                        page={mutualistas.data?.current_page}
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
                    {mutualistas.loading ?
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
                        (mutualistas.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className='hover:bg-gray-100 cursor-pointer !rounded-lg text-gray-600 hover:text-black'
                                onClick={() => setUpdateMutualista(item)}
                            >
                                <TableCell className='rounded-l-xl'>{item.nombre}</TableCell>
                                <TableCell>{item.telefono}</TableCell>
                                <TableCell>{item.direccion}</TableCell>
                                <TableCell className='rounded-r-xl p-2'>
                                    <Button
                                        variant="flat"
                                        color="danger"
                                        className="w-10 min-w-10 p-0"
                                        onPress={() => setDestroyMutualista(item)}
                                    >
                                        <DynamicFaIcon name="FaTrash" size={16} className="text-rose-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {
                openStore && <StoreMutualistaModal
                    value={openStore}
                    setValue={setOpenStore}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openUpdate && <UpdateMutualistaModal
                    item={updateMutualista!}
                    setItem={setUpdateMutualista}
                    value={openUpdate}
                    setValue={setOpenUpdate}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openDestroy && <DestroyMutualistaModal
                    item={destroyMutualista!}
                    setItem={setDestroyMutualista}
                    value={openDestroy}
                    setValue={setOpenDestroy}
                    setShouldRefresh={setShouldRefresh}
                />
            }
        </div>
    );
}

export default MutualistasPage;