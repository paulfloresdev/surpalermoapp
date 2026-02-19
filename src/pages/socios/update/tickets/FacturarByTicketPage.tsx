import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../store/configStore/store";
import { ItemState, PaginatedState } from "../../../../types/commons";
import { Socio } from "../../../../types/socios";
import { FacturarByTicketBody, SearchTicketsParams, Ticket } from "../../../../types/tickets";
import { facturarByTicketRequest, searchTicketsRequest } from "../../../../store/features/tickets/ticketsSlice";
import { showSocioRequest } from "../../../../store/features/socios/sociosSlice";
import { addToast, Button, Card, Divider, Input, Link, Select, SelectItem } from "@heroui/react";
import { commonLeftLabelClassNames } from "../fichas/AFormPage";

const FacturarByTicketPage: React.FC = () => {
    const { socioId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const socio = useSelector((state: RootState) => state.socios as ItemState<Socio>);
    const tickets = useSelector((state: RootState) => state.tickets as PaginatedState<Ticket>);
    const listenTickets = useSelector((state: RootState) => state.tickets as ItemState<Ticket>);

    const [checkFactura, setCheckFactura] = React.useState<boolean>(false);
    const [checkTicket, setCheckTicket] = React.useState<boolean>(false);

    const [noFactura, setNoFactura] = React.useState<string>("");
    const [noTickets, setNoTickets] = React.useState<Set<string>>(new Set());

    useEffect(() => {
        var params: SearchTicketsParams = {
            page: 1,
            body: {
                socio_id: socioId,
                order: 2,
                search: undefined,
                per_page: 999999999
            }
        }
        dispatch(showSocioRequest(socioId ?? ""));
        dispatch(searchTicketsRequest(params));
    }, [])

    const ticketOptions = React.useMemo(() => {
        const list = (tickets.data?.data ?? [])
            .filter(t => {
                const noFactura = (t.no_factura ?? "").trim();
                return noFactura.length === 0; // 👈 solo tickets SIN factura
            })
            .map(t => (t.no_ticket ?? "").trim())
            .filter(v => v.length > 0);

        return Array.from(new Set(list)); // únicos
    }, [tickets.data?.data]);


    const ticketsDisponibles = React.useMemo(() => {
        return (tickets.data?.data ?? []).filter((t) => {
            const noTicket = (t.no_ticket ?? "").trim();
            const noFactura = (t.no_factura ?? "").trim();

            return (
                noTicket.length > 0 &&      // tiene no_ticket
                noFactura.length === 0 &&   // no_factura null o ""
                !noTickets.has(noTicket)    // NO seleccionado
            );
        });
    }, [tickets.data?.data, noTickets]);

    const ticketsSeleccionados = React.useMemo(() => {
        return (tickets.data?.data ?? []).filter((t) => {
            const noTicket = (t.no_ticket ?? "").trim();
            const noFactura = (t.no_factura ?? "").trim();

            return (
                noTicket.length > 0 &&      // tiene no_ticket
                noFactura.length === 0 &&   // no_factura null o ""
                noTickets.has(noTicket)     // SÍ seleccionado
            );
        });
    }, [tickets.data?.data, noTickets]);

    useEffect(() => {
        if (listenTickets.updateSuccess !== null) {
            if (listenTickets.updateSuccess) {
                addToast({
                    title: "OK",
                    description: tickets.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: tickets.error,
                    color: 'danger',
                })
            }
            navigate(`/sia/socios/${socioId}?tab=tickets`);
        }
    }, [listenTickets.updateSuccess]);

    const onSubmit = () => {
        if (noFactura === null || noFactura === "" || noTickets.size === 0) {
            setCheckFactura(noFactura === null || noFactura === "");
            setCheckTicket(noTickets.size === 0);
            return;
        }

        var body: FacturarByTicketBody = {
            no_factura: noFactura,
            no_tickets: Array.from(noTickets)
        }

        dispatch(facturarByTicketRequest(body));
    }

    if (tickets.loading || socio.loading) {
        return <span>Cargando...</span>;
    }

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-row items-center gap-4">
                <span className="font-semibold text-xl">Facturar por Ticket</span>
                <span className="bg-gray-100 text-gray-500 border-gray-200 border-1.5 text-sm p-2 rounded-xl">
                    {socio.data?.nombre ?? ""} {socio.data?.segundo_nombre ?? ""} {socio.data?.apellido_paterno ?? ""}{" "}
                    {socio.data?.apellido_materno ?? ""}
                </span>
            </div>
            <div className="w-full flex flex-col gap-4">
                <span className="font-medium">Datos generales</span>

                <div className="w-full grid grid-cols-2 gap-4 items-start">
                    <Input
                        isInvalid={checkFactura}
                        required
                        label="No. Factura"
                        placeholder="No. Factura"
                        labelPlacement="outside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={noFactura ?? ''}
                        onChange={(e) => {
                            setNoFactura(e.target.value);
                        }}
                    />
                    <Select
                        isInvalid={checkTicket}
                        required
                        label="Tickets"
                        placeholder="Selecciona los tickets"
                        labelPlacement="outside"
                        selectionMode="multiple"
                        selectedKeys={noTickets}
                        onSelectionChange={(keys) => {
                            // keys puede ser "all" o un Set
                            if (keys === "all") {
                                setNoTickets(new Set(ticketOptions));
                                return;
                            }
                            setNoTickets(new Set(Array.from(keys as Set<React.Key>).map(String)));
                        }}
                        className="font-medium pl-2"
                        classNames={commonLeftLabelClassNames}
                    >
                        {ticketOptions.map((option) => (
                            <SelectItem key={option} textValue={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="w-1/2 mt-4 grid grid-cols-2 gap-4 mx-auto">
                    <Button
                        variant="solid"
                        as={Link}
                        href={`/sur/app/#/sia/socios/${socioId}?tab=tickets`}
                    >
                        Regresar
                    </Button>
                    <Button
                        variant="solid"
                        className="bg-emerald-500 text-white"
                        onPress={onSubmit}
                        isLoading={listenTickets.loading}
                    >
                        Facturar
                    </Button>
                </div>
                <Divider className="my-4" />
                <div className="w-full grid grid-cols-2 gap-4 items-start">
                    <div className="w-full flex flex-col gap-4">
                        <span className="font-medium">Tickets disponibles</span>
                        <div className="w-full flex flex-col gap-4">
                            {ticketsDisponibles.map((ticket) => (
                                <Card
                                    key={ticket.id}
                                    className="w-full flex flex-row items-end justify-between gap-3 p-3"
                                >
                                    <div className="flex flex-row justify-start items-start gap-3">
                                        <span className="bg-gray-200 p-1 rounded-lg text-sm font-semibold">{ticket.no_ticket}</span>
                                        <div className="flex flex-col">
                                            <span>{ticket.grupo?.nombre}</span>
                                            <span className="text-sm text-gray-500">{ticket.mutualista?.nombre}</span>
                                        </div>
                                    </div>
                                    <span className="font-medium text-sm text-gray-500">{ticket.fecha_visita.toString()}</span>

                                </Card>
                            ))}
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <span className="font-medium">Tickets seleccionados</span>
                        <div className="w-full flex flex-col gap-4">
                            {ticketsSeleccionados.map((ticket) => (
                                <Card
                                    key={ticket.id}
                                    className="w-full flex flex-row items-end justify-between gap-3 p-3"
                                >
                                    <div className="flex flex-row justify-start items-start gap-3">
                                        <span className="bg-emerald-500 text-white p-1 rounded-lg text-sm font-semibold">{ticket.no_ticket}</span>
                                        <div className="flex flex-col">
                                            <span>{ticket.grupo?.nombre}</span>
                                            <span className="text-sm text-gray-500">{ticket.mutualista?.nombre}</span>
                                        </div>
                                    </div>
                                    <span className="font-medium text-sm text-gray-500">{ticket.fecha_visita.toString()}</span>

                                </Card>
                            ))}
                        </div>
                    </div>
                </div>


            </div >
        </div >
    );
}

export default FacturarByTicketPage;
