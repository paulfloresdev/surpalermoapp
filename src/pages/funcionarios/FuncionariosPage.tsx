import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configStore/store";
import { ExcelSearchParams, PaginatedState } from "../../types/commons";
import { Funcionario } from "../../types/funcionarios";
import { paginatedFuncionariosRequest } from "../../store/features/funcionarios/funcionariosSlice";
import { addToast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { perPageOptions } from "../../types/combos";
import { DateToDMY } from "../../helper/utils/Format";
import StoreFuncionarioModal from "./modals/StoreFuncionarioModal";
import UpdateFuncionarioModal from "./modals/UpdateFuncionarioModal";
import DestroyFuncionarioModal from "./modals/DestroyFuncionarioModal";
import LoadingReport from "../../components/layout/LoadingReport";
import { getFilenameFromDisposition } from "../socios/update/tabs/SocioFilesTab";
import { paginatedFuncionariosAPI } from "../../helper/api/backend";

const FuncionariosPage: React.FC = () => {
    const dispatch = useDispatch();

    const columnClassname = "bg-transparent border-b !rounded-none"

    const funcionarios = useSelector((state: RootState) => state.funcionarios as PaginatedState<Funcionario>);

    const [page, setPage] = useState<undefined | number>(undefined);
    const [perPage, setPerPage] = useState<undefined | number>(10);
    const [search, setSearch] = useState<undefined | string>(undefined);

    const [openStore, setOpenStore] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openDestroy, setOpenDestroy] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const [updateFuncionario, setUpdateFuncionario] = useState<undefined | Funcionario>(undefined);
    const [destroyFuncionario, setDestroyFuncionario] = useState<undefined | Funcionario>(undefined);

    useEffect(() => {
        if (!openStore && !openUpdate && !openDestroy) {
            if (shouldRefresh) {
                makeSearch();
            }
        }
    }, [page, perPage, openStore, openUpdate, openDestroy]);

    useEffect(() => {
        if (updateFuncionario !== undefined && updateFuncionario !== null) {
            setOpenUpdate(true);
        }
    }, [updateFuncionario]);

    useEffect(() => {
        if (destroyFuncionario !== undefined && destroyFuncionario !== null) {
            setOpenDestroy(true);
        }
    }, [destroyFuncionario])

    const buildParams = (excel = false): ExcelSearchParams => {
        const params: ExcelSearchParams = {
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
        dispatch(paginatedFuncionariosRequest(params));
    }

    const downloadExcel = async () => {
        setDownloading(true);

        try {
            const params = buildParams(true);
            const res = await paginatedFuncionariosAPI(params);

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
            const filename = filenameFromHeader ?? "funcionarios.xlsx";

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
        <div className="w-full mx-auto h-full flex flex-col gap-2">
            <span className="font-semibold text-lg">Funcionarios</span>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row justify-start gap-4">
                    <Input
                        size='sm'
                        variant='flat'
                        placeholder="Búsqueda"
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
                        funcionarios.loading ?
                            <div className="w-80 h-8 bg-gray-100 rounded-xl"></div>
                            : funcionarios.error ? <span>{funcionarios.error}</span>
                                : <div className="flex flex-row items-center gap-2">
                                    <span className="text-sm text-gray-500">{`${funcionarios.data?.from} - ${funcionarios.data?.to} de ${funcionarios.data?.total}`}</span>
                                    <Pagination
                                        size="sm"
                                        variant="flat"
                                        classNames={{
                                            wrapper: "gap-2",
                                            cursor: "bg-emerald-500 text-white"
                                        }}
                                        total={funcionarios.data?.last_page ?? 1}
                                        page={funcionarios.data?.current_page}
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
                        <span className='text-sm'>Fecha de ingreso</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Dirección</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Teléfono</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Email</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname} w-10`}>
                        {""}
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {funcionarios.loading ?
                        <TableRow>
                            <TableCell>{""}</TableCell>
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
                        (funcionarios.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className='hover:bg-gray-100 cursor-pointer !rounded-lg text-gray-600 hover:text-black'
                                onClick={() => setUpdateFuncionario(item)}
                            >
                                <TableCell className='rounded-l-xl'>
                                    <Button
                                        size='sm'
                                        variant='flat'
                                        color={!item.eliminado ? "success" : "danger"}
                                        className='w-12 font-semibold'
                                    >
                                        {!item.eliminado ? "Activo" : "Inactivo"}
                                    </Button>
                                </TableCell>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell >{DateToDMY(item.fecha_ingreso)}</TableCell>
                                <TableCell >{item.direccion}</TableCell>
                                <TableCell >{item.telefono}</TableCell>
                                <TableCell >{item.email}</TableCell>
                                <TableCell className='rounded-r-xl p-2'>
                                    <Button
                                        variant="flat"
                                        color="danger"
                                        className="w-10 min-w-10 p-0"
                                        onPress={() => setDestroyFuncionario(item)}
                                    >
                                        <DynamicFaIcon name="FaTrash" size={16} className="text-rose-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {
                openStore && <StoreFuncionarioModal
                    value={openStore}
                    setValue={setOpenStore}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openUpdate && <UpdateFuncionarioModal
                    item={updateFuncionario!}
                    setItem={setUpdateFuncionario}
                    value={openUpdate}
                    setValue={setOpenUpdate}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openDestroy && <DestroyFuncionarioModal
                    item={destroyFuncionario!}
                    setItem={setDestroyFuncionario}
                    value={openDestroy}
                    setValue={setOpenDestroy}
                    setShouldRefresh={setShouldRefresh}
                />
            }
        </div>
    );
}

export default FuncionariosPage;