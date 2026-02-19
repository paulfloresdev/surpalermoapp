import React, { useEffect, useState } from "react";
import {
    addToast,
    Button, Card, Code, Dropdown, DropdownItem, DropdownMenu,
    DropdownTrigger, Input, Pagination, Select, SelectItem, Table,
    TableBody, TableCell, TableColumn, TableHeader, TableRow
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { PaginatedState } from "../../../../types/commons";
import { SearchSocioGrupoPivotsParams, SocioGrupoPivot } from "../../../../types/socioGrupoPivots";
import { searchSocioGrupoPivotsRequest } from "../../../../store/features/socioGrupoPivots/socioGrupoPivotsSlice";
import DynamicFaIcon from "../../../../components/DynamicFaIcon";
import { MotivoBajaPrograma, perPageOptions } from "../../../../types/combos";
import { TABLE_COLUMN_CLASSNAME } from "../../../../helper/utils/Constants";
import CustomColumn from "../../../../components/layout/CustomColumn";
import { DateToDMY } from "../../../../helper/utils/Format";
import InscriptionSocioGroupModal from "../modals/groups/InscriptionSocioGroupModal";
import UpdateSocioGroupModal from "../modals/groups/UpdateSocioGroupModal";
import LoadingReport from "../../../../components/layout/LoadingReport";
import { getFilenameFromDisposition } from "./SocioFilesTab";
import { searchSocioGrupoPivotsAPI } from "../../../../helper/api/backend";

const GroupsSocioTab: React.FC<{ socioId: number }> = ({ socioId }) => {
    const dispatch = useDispatch();

    const gruposSocio = useSelector((state: RootState) =>
        state.socioGrupoPivots as PaginatedState<SocioGrupoPivot>
    );

    // Valores controlados — SIN undefineds
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState(3);
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [openInscription, setOpenInscription] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [shouldRefresh, setShouldRefresh] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const [selectedGroup, setSelectedGroup] = useState<undefined | SocioGrupoPivot>(undefined);

    useEffect(() => {
        if (!openInscription && !openUpdate) {
            if (shouldRefresh) {
                makeSearch();
            }
            setShouldRefresh(true);
        }
    }, [page, order, itemsPerPage, openInscription, openUpdate]);

    useEffect(() => {
        if (selectedGroup !== undefined && selectedGroup !== null) {
            if (selectedGroup?.fecha_baja === null) {
                setOpenUpdate(true);
            }
        }
    }, [selectedGroup]);

    const buildParams = (excel = false): SearchSocioGrupoPivotsParams => ({
        page,
        body: {
            socio_id: socioId,
            order,
            search: search.trim() !== "" ? search : undefined,
            per_page: itemsPerPage,
            excel: excel
        }
    });

    const makeSearch = () => {
        dispatch(searchSocioGrupoPivotsRequest(buildParams()));
    };

    const handleClick = (asc: number, desc: number) => {
        setOrder(order === asc ? desc : asc);
    };

    const downloadExcel = async () => {
        setDownloading(true);

        try {
            const params = buildParams(true);
            const res = await searchSocioGrupoPivotsAPI(params);

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
            const filename = filenameFromHeader ?? "grupos_socio.xlsx";

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
                                makeSearch();
                            }
                        }}
                        endContent={
                            <DynamicFaIcon
                                name="FaSearch"
                                size={16}
                                btnInput={true}
                                onClick={() => makeSearch()}
                            />
                        }
                    />


                    {/* Botón modal */}
                    <Button
                        size="sm"
                        variant="solid"
                        className="text-white bg-emerald-500 hover:bg-emerald-400"
                        onPress={() => setOpenInscription(true)}
                    >
                        Inscribir nuevo
                    </Button>

                    {/* Dropdown export */}
                    <Dropdown size="sm">
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="bg-cyan-900 text-white"
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

                {/* Pagination + items per page */}
                {!gruposSocio.loading && !gruposSocio.error && (
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-sm text-gray-500">
                            {`${gruposSocio.data?.from} - ${gruposSocio.data?.to} de ${gruposSocio.data?.total}`}
                        </span>

                        <Pagination
                            size="sm"
                            variant="flat"
                            classNames={{ wrapper: "gap-2", cursor: "bg-emerald-500 text-white" }}
                            total={gruposSocio.data?.last_page ?? 1}
                            page={page} // 🔒 CONTROLADO (no depende del backend)
                            onChange={(v) => setPage(v)}
                        />

                        <Select
                            size="sm"
                            variant="flat"
                            className="w-20"
                            selectedKeys={[String(itemsPerPage)]}
                            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
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
                    <TableColumn className={TABLE_COLUMN_CLASSNAME} onClick={() => handleClick(1, 2)}>
                        <CustomColumn label="Grupo" asc={1} desc={2} currentOrder={order} />
                    </TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Tipo</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Costo base</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Horario</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Programa</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Fecha Baja</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Motivo</TableColumn>
                </TableHeader>

                <TableBody>
                    {gruposSocio.loading ? (
                        <TableRow>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>Cargando...</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                            <TableCell>{""}</TableCell>
                        </TableRow>
                    ) : (
                        (gruposSocio.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => setSelectedGroup(item)}
                            >
                                <TableCell className='rounded-l-xl'>{item.grupo?.nombre}</TableCell>
                                <TableCell>{item.grupo?.tipo}</TableCell>
                                <TableCell>${item.grupo?.costo_base}</TableCell>
                                <TableCell>{`${item.grupo.hora_inicio} - ${item.grupo.hora_fin}`}</TableCell>
                                <TableCell>{item.grupo?.programa?.nombre}</TableCell>
                                <TableCell>
                                    {item.fecha_baja && (
                                        <Code className="font-sans" color="danger">
                                            {DateToDMY(item.fecha_baja)}
                                        </Code>
                                    )}
                                </TableCell>
                                <TableCell className='rounded-r-xl'>{item.motivo_baja ? MotivoBajaPrograma.at(item.motivo_baja - 1)?.label : '-'}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {
                openInscription && <InscriptionSocioGroupModal
                    socioId={socioId}
                    value={openInscription}
                    setValue={() => setOpenInscription(false)}
                    setShouldRefresh={() => setShouldRefresh(false)}
                />
            }
            {
                openUpdate && <UpdateSocioGroupModal
                    item={selectedGroup!}
                    value={openUpdate}
                    setValue={() => setOpenUpdate(false)}
                    setShouldRefresh={() => setShouldRefresh(false)}
                />
            }
        </Card>
    );
};

export default GroupsSocioTab;
