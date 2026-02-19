import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore/store";
import { PaginatedState } from "../../../../types/commons";
import { SearchTicketsParams, Ticket } from "../../../../types/tickets";
import { searchTicketsRequest } from "../../../../store/features/tickets/ticketsSlice";
import { addToast, Button, Card, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../../../components/DynamicFaIcon";
import { perPageOptions } from "../../../../types/combos";
import { TABLE_COLUMN_CLASSNAME } from "../../../../helper/utils/Constants";
import CustomColumn from "../../../../components/layout/CustomColumn";
import { getDayOfWeek } from "../../../../helper/utils/Format";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingReport from "../../../../components/layout/LoadingReport";
import { getFilenameFromDisposition } from "./SocioFilesTab";
import { searchTicketsAPI } from "../../../../helper/api/backend";

const TicketsSocioTab: React.FC<{ socioId: number }> = ({ socioId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const urlSearch = searchParams.get("search") ?? '';

    const tickets = useSelector((state: RootState) => state.tickets as PaginatedState<Ticket>)

    const [page, setPage] = useState(1);
    const [order, setOrder] = useState(2);
    const [search, setSearch] = useState(urlSearch);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [downloading, setDownloading] = useState(false);

    const buildParams = (excel = false): SearchTicketsParams => ({
        page,
        body: {
            socio_id: socioId,
            order,
            search: search.trim() !== "" ? search : undefined,
            per_page: itemsPerPage,
            excel: excel
        }
    });

    useEffect(() => {
        makeSearch();
    }, [page, order, itemsPerPage]);

    const makeSearch = () => {
        dispatch(searchTicketsRequest(buildParams()));
    };

    const handleClick = (asc: number, desc: number) => {
        setOrder(order === asc ? desc : asc);
    };

    const downloadExcel = async () => {
        setDownloading(true);

        try {
            const params = buildParams(true);
            const res = await searchTicketsAPI(params);

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
            const filename = filenameFromHeader ?? "tickets.xlsx";

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
                        placeholder="Búsqueda por factura o ticket"
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

                    {/* Dropdown actions */}
                    <Dropdown size="sm">
                        <DropdownTrigger>
                            <Button
                                size="sm"
                                variant="solid"
                                className="text-white bg-emerald-500 hover:bg-emerald-400"
                                endContent={<DynamicFaIcon name="FaAngleDown" size={16} className="!text-white" />}
                                onPress={() => { }}
                            >
                                Acciones
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key={1} onPress={() => navigate(`/sia/socios/${socioId}/visita`)}>Generar visitas</DropdownItem>
                            <DropdownItem key={2}>Asignar No. Ticket</DropdownItem>
                            <DropdownItem key={3} onPress={() => navigate(`/sia/socios/${socioId}/facturar-ticket`)}>Facturar por Ticket</DropdownItem>
                            {/*<DropdownItem key={4}>Facturar por Visita</DropdownItem>*/}
                        </DropdownMenu>
                    </Dropdown>

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
                {!tickets.loading && !tickets.error && (
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-sm text-gray-500">
                            {`${tickets.data?.from} - ${tickets.data?.to} de ${tickets.data?.total}`}
                        </span>

                        <Pagination
                            size="sm"
                            variant="flat"
                            classNames={{ wrapper: "gap-2", cursor: "bg-emerald-500 text-white" }}
                            total={tickets.data?.last_page ?? 1}
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
                        <CustomColumn label="Fecha Visita" asc={1} desc={2} currentOrder={order} />
                    </TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Grupo</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Mutualista Convenio</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME} onClick={() => handleClick(3, 4)}>
                        <CustomColumn label="No. Ticket" asc={3} desc={4} currentOrder={order} />
                    </TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME} onClick={() => handleClick(5, 6)}>
                        <CustomColumn label="No. Factura" asc={5} desc={6} currentOrder={order} />
                    </TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Dia Semana</TableColumn>
                    <TableColumn className={TABLE_COLUMN_CLASSNAME}>Observaciones</TableColumn>
                </TableHeader>

                <TableBody>
                    {tickets.loading ? (
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
                        (tickets.data?.data ?? []).map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigate(`/sia/socios/${socioId}/actualizar-visita/${item.id}`)}
                            >
                                <TableCell className='rounded-l-xl'>{item.fecha_visita.toString()}</TableCell>
                                <TableCell>{item.grupo?.nombre}</TableCell>
                                <TableCell>{item.mutualista?.nombre}</TableCell>
                                <TableCell>{item.no_ticket}</TableCell>
                                <TableCell>{item.no_factura}</TableCell>
                                <TableCell>{getDayOfWeek(item.fecha_visita)}</TableCell>
                                <TableCell className='rounded-r-xl'>{item.observaciones}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}

export default TicketsSocioTab;