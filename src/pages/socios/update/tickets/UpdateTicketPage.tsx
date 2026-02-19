import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ItemState, PaginatedState } from "../../../../types/commons";
import { RootState } from "../../../../store/configStore/store";
import { Socio } from "../../../../types/socios";
import { Ticket, UpdateTicketParams } from "../../../../types/tickets";
import { showSocioRequest } from "../../../../store/features/socios/sociosSlice";
import { showTicketRequest, updateTicketRequest } from "../../../../store/features/tickets/ticketsSlice";
import { SearchSocioGrupoPivotsParams, SocioGrupoPivot } from "../../../../types/socioGrupoPivots";
import { searchSocioGrupoPivotsRequest } from "../../../../store/features/socioGrupoPivots/socioGrupoPivotsSlice";
import { addToast, Button, Input, Link, Select, SelectItem, Textarea } from "@heroui/react";
import { commonLeftLabelClassNames } from "../fichas/AFormPage";

const UpdateTicketPage: React.FC = () => {
    const { socioId, ticketId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const socio = useSelector((state: RootState) => state.socios as ItemState<Socio>);
    const grupos = useSelector((state: RootState) => state.socioGrupoPivots as PaginatedState<SocioGrupoPivot>);
    const ticket = useSelector((state: RootState) => state.tickets as ItemState<Ticket>);

    const [checkGrupo, setCheckGrupo] = useState<boolean>(false);
    const [checkVisita, setCheckVisita] = useState<boolean>(false);

    const [grupoId, setGrupoId] = useState<number | undefined>(undefined);
    const [noTicket, setNoTicket] = useState<string | undefined>(undefined);
    const [noFactura, setNoFactura] = useState<string | undefined>(undefined);
    const [fechaVisita, setFechaVisita] = useState<string | undefined>(undefined);
    const [observaciones, setObservaciones] = useState<string | undefined>(undefined);

    useEffect(() => {
        dispatch(showSocioRequest(socioId ?? ""));
        dispatch(showTicketRequest(ticketId ?? ""));
        getGrupos();
    }, [])

    useEffect(() => {
        setGrupoId(ticket.data?.grupo_id ?? undefined);
        setNoTicket(ticket.data?.no_ticket ?? undefined);
        setNoFactura(ticket.data?.no_factura ?? undefined);
        setFechaVisita(ticket.data?.fecha_visita ?? undefined);
        setObservaciones(ticket.data?.observaciones ?? undefined);
    }, [ticket.data]);

    useEffect(() => {
        if (ticket.updateSuccess !== null) {
            if (ticket.updateSuccess) {
                addToast({
                    title: "OK",
                    description: ticket.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: ticket.error,
                    color: 'danger',
                })
            }
            navigate(`/sia/socios/${socioId}?tab=tickets`);
        }
    }, [ticket.updateSuccess]);

    const getGrupos = () => {
        const params: SearchSocioGrupoPivotsParams = {
            page: 1,
            body: {
                socio_id: parseInt(socioId ?? "0"),
                order: 2,
                search: undefined,
                per_page: 999999999,
            },
        };

        dispatch(searchSocioGrupoPivotsRequest(params));
    };

    const onSubmit = () => {
        if (grupoId === undefined || grupoId === null || fechaVisita === null || fechaVisita === "") {
            setCheckGrupo(grupoId === undefined || grupoId === null);
            setCheckVisita(fechaVisita === null || fechaVisita === "");
            return;
        }

        var params: UpdateTicketParams = {
            id: parseInt(ticketId ?? "0"),
            body: {
                fecha_visita: fechaVisita ?? "",
                no_ticket: noTicket ?? "",
                no_factura: noFactura ?? "",
                observaciones: observaciones ?? "",
                grupo_id: grupoId ?? 0,
                mutualista_convenio_id: socio.data?.mutualista_convenio_id ?? 0
            }
        }

        dispatch(updateTicketRequest(params));
    }

    if (grupos.loading || socio.loading || ticket.loading) {
        return <span>Cargando...</span>;
    }

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-row items-center gap-4">
                <span className="font-semibold text-xl">Editar visita</span>
                <span className="bg-gray-100 text-gray-500 border-gray-200 border-1.5 text-sm p-2 rounded-xl">
                    {socio.data?.nombre ?? ""} {socio.data?.segundo_nombre ?? ""} {socio.data?.apellido_paterno ?? ""}{" "}
                    {socio.data?.apellido_materno ?? ""}
                </span>
            </div>
            <div className="w-full flex flex-col gap-4">
                <span className="font-medium">Datos generales</span>

                <div className="w-full grid grid-cols-3 gap-4 items-start">
                    <Input
                        isInvalid={checkVisita}
                        type="date"
                        label="Fecha de visita"
                        labelPlacement="outside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={fechaVisita}
                        onChange={(e) => setFechaVisita(e.target.value)}
                    />
                    <Select
                        isInvalid={checkGrupo}
                        required
                        label="Grupo*"
                        placeholder="Selecciona el grupo"
                        labelPlacement="outside"
                        selectionMode="single"
                        selectedKeys={grupoId != null ? new Set([String(grupoId)]) : new Set()}
                        onSelectionChange={(keys) => {
                            const first = Array.from(keys)[0];
                            setGrupoId(first ? Number(first) : undefined);
                        }}
                        className="font-medium"
                    >
                        {(grupos.data?.data ?? [])
                            .filter((option) => option.fecha_baja === null)
                            .map((option) => (
                                <SelectItem key={String(option.grupo.id)} textValue={option.grupo.nombre}>
                                    {option.grupo.nombre}
                                </SelectItem>
                            ))}
                    </Select>
                    <Input
                        isDisabled
                        label="Mutualista Convenio"
                        labelPlacement="outside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={socio.data?.mutualista_convenio?.nombre ?? ""}
                    />
                    <Input
                        maxLength={15}
                        label="No. Ticket"
                        placeholder="No. Ticket"
                        labelPlacement="outside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={noTicket ?? ""}
                        onChange={(e) => setNoTicket(e.target.value)}
                    />
                    <Input
                        maxLength={15}
                        label="No. Factura"
                        placeholder="No. Factura"
                        labelPlacement="outside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={noFactura ?? ""}
                        onChange={(e) => setNoFactura(e.target.value)}
                    />
                    <Textarea
                        label="Observaciones"
                        placeholder="Observaciones"
                        labelPlacement="outside"
                        className="font-medium"
                        rows={2}
                        value={observaciones ?? ""}
                        onChange={(e) => setObservaciones(e.target.value)}
                    />
                </div>
                <div className="w-1/2 grid grid-cols-2 gap-4 mx-auto">
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
                        isLoading={ticket.loading}
                    >
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UpdateTicketPage;