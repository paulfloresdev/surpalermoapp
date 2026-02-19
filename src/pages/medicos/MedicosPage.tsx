import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configStore/store";
import { ExcelSearchParams, PaginatedState } from "../../types/commons";
import { Medico } from "../../types/medicos";
import { paginatedMedicosRequest } from "../../store/features/medicos/medicosSlice";
import { addToast, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { perPageOptions } from "../../types/combos";
import StoreMedicoModal from "./modals/StoreMedicoModal";
import UpdateMedicoModal from "./modals/UpdateMedicoModal";
import DestroyMedicoModal from "./modals/DestroyMedicoModal";
import { paginatedMedicosAPI } from "../../helper/api/backend";
import LoadingReport from "../../components/layout/LoadingReport";
import { getFilenameFromDisposition } from "../socios/update/tabs/SocioFilesTab";

const MedicosPage: React.FC = () => {
    const dispatch = useDispatch();

    const columnClassname = "bg-transparent border-b !rounded-none"

    const medicos = useSelector((state: RootState) => state.medicos as PaginatedState<Medico>);

    const [page, setPage] = useState<undefined | number>(undefined);
    const [perPage, setPerPage] = useState<undefined | number>(10);
    const [search, setSearch] = useState<undefined | string>(undefined);

    const [openStore, setOpenStore] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openDestroy, setOpenDestroy] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const [updateMedico, setUpdateMedico] = useState<undefined | Medico>(undefined);
    const [destroyMedico, setDestroyMedico] = useState<undefined | Medico>(undefined);

    useEffect(() => {
        if (!openStore && !openUpdate && !openDestroy) {
            if (shouldRefresh) {
                makeSearch();
            }
        }
    }, [page, perPage, openStore, openUpdate, openDestroy]);

    useEffect(() => {
        if (updateMedico !== undefined && updateMedico !== null) {
            setOpenUpdate(true);
        }
    }, [updateMedico]);

    useEffect(() => {
        if (destroyMedico !== undefined && destroyMedico !== null) {
            setOpenDestroy(true);
        }
    }, [destroyMedico]);

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
        dispatch(paginatedMedicosRequest(params));
    }

    const downloadExcel = async () => {
        setDownloading(true);

        try {
            const params = buildParams(true);
            const res = await paginatedMedicosAPI(params);

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
            const filename = filenameFromHeader ?? "medicos.xlsx";

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
            <span className="font-semibold text-lg">Médicos</span>
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
                        medicos.loading ?
                            <div className="w-80 h-8 bg-gray-100 rounded-xl"></div>
                            : medicos.error ? <span>{medicos.error}</span>
                                : <div className="flex flex-row items-center gap-2">
                                    <span className="text-sm text-gray-500">{`${medicos.data?.from} - ${medicos.data?.to} de ${medicos.data?.total}`}</span>
                                    <Pagination
                                        size="sm"
                                        variant="flat"
                                        classNames={{
                                            wrapper: "gap-2",
                                            cursor: "bg-emerald-500 text-white"
                                        }}
                                        total={medicos.data?.last_page ?? 1}
                                        page={medicos.data?.current_page}
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
                        <span className='text-sm'>Teléfono consultorio</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Teléfono particular</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Celular</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname}`}>
                        <span className='text-sm'>Email</span>
                    </TableColumn>
                    <TableColumn className={`${columnClassname} w-10`}>
                        {""}
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {medicos.loading ?
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
                        (medicos.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className='hover:bg-gray-100 cursor-pointer !rounded-lg text-gray-600 hover:text-black'
                                onClick={() => setUpdateMedico(item)}
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
                                <TableCell >{item.telefono_consultorio}</TableCell>
                                <TableCell >{item.telefono_particular}</TableCell>
                                <TableCell >{item.celular}</TableCell>
                                <TableCell >{item.email}</TableCell>
                                <TableCell className='rounded-r-xl p-2'>
                                    <Button
                                        variant="flat"
                                        color="danger"
                                        className="w-10 min-w-10 p-0"
                                        onPress={() => setDestroyMedico(item)}
                                    >
                                        <DynamicFaIcon name="FaTrash" size={16} className="text-rose-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {
                openStore && <StoreMedicoModal
                    value={openStore}
                    setValue={setOpenStore}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openUpdate && <UpdateMedicoModal
                    item={updateMedico!}
                    setItem={setUpdateMedico}
                    value={openUpdate}
                    setValue={setOpenUpdate}
                    setShouldRefresh={setShouldRefresh}
                />
            }
            {
                openDestroy && <DestroyMedicoModal
                    item={destroyMedico!}
                    setItem={setDestroyMedico}
                    value={openDestroy}
                    setValue={setOpenDestroy}
                    setShouldRefresh={setShouldRefresh}
                />
            }
        </div>
    );
}

export default MedicosPage;