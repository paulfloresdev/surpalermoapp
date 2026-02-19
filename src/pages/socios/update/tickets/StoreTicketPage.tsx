import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../store/configStore/store";
import { ItemState, PaginatedState } from "../../../../types/commons";
import { Socio } from "../../../../types/socios";
import { SearchSocioGrupoPivotsParams, SocioGrupoPivot } from "../../../../types/socioGrupoPivots";
import { showSocioRequest } from "../../../../store/features/socios/sociosSlice";
import { searchSocioGrupoPivotsRequest } from "../../../../store/features/socioGrupoPivots/socioGrupoPivotsSlice";
import { addToast, Button, Card, Divider, Input, Link, Select, SelectItem, Textarea } from "@heroui/react";
import { commonLeftLabelClassNames } from "../fichas/AFormPage";
import { StoreTicketBody, Ticket } from "../../../../types/tickets";
import { storeTicketRequest } from "../../../../store/features/tickets/ticketsSlice";

const StoreTicketPage: React.FC = () => {
    const { socioId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const socio = useSelector((state: RootState) => state.socios as ItemState<Socio>);
    const grupos = useSelector((state: RootState) => state.socioGrupoPivots as PaginatedState<SocioGrupoPivot>);
    const tickets = useSelector((state: RootState) => state.tickets as ItemState<Ticket>);

    const [checkGrupo, setCheckGrupo] = useState<boolean>(false);
    const [checkVisita, setCheckVisita] = useState<boolean>(false);

    const [grupoId, setGrupoId] = useState<number | undefined>(undefined);
    const [noTicket, setNoTicket] = useState<string | undefined>(undefined);
    const [observaciones, setObservaciones] = useState<string | undefined>(undefined);

    // ======= Fechas (local) =======
    const [fechaInput, setFechaInput] = useState<string>(""); // "YYYY-MM-DD"
    const [fechasVisita, setFechasVisita] = useState<string[]>([]);

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState<string>("");

    // ======= Carga inicial (como ya lo tenías) =======
    useEffect(() => {
        dispatch(showSocioRequest(socioId ?? ""));
        getGrupos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (tickets.storeSuccess !== null) {
            if (tickets.storeSuccess) {
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
    }, [tickets.storeSuccess]);

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

    const addFecha = () => {
        const value = fechaInput.trim();
        if (!value) return;

        // Evitar duplicados exactos
        if (fechasVisita.includes(value)) {
            setFechaInput("");
            return;
        }

        setFechasVisita((prev) => [...prev, value]);
        setFechaInput("");
    };

    const removeFecha = (index: number) => {
        setFechasVisita((prev) => prev.filter((_, i) => i !== index));
        if (editingIndex === index) {
            setEditingIndex(null);
            setEditingValue("");
        }
    };

    const startEditFecha = (index: number) => {
        setEditingIndex(index);
        setEditingValue(fechasVisita[index] ?? "");
    };

    const cancelEditFecha = () => {
        setEditingIndex(null);
        setEditingValue("");
    };

    const saveEditFecha = () => {
        if (editingIndex === null) return;

        const value = editingValue.trim();
        if (!value) return;

        // Evitar duplicado al guardar (excepto el mismo índice)
        if (fechasVisita.some((f, i) => i !== editingIndex && f === value)) {
            cancelEditFecha();
            return;
        }

        setFechasVisita((prev) => prev.map((f, i) => (i === editingIndex ? value : f)));
        cancelEditFecha();
    };

    const clearFechas = () => {
        setFechasVisita([]);
        setFechaInput("");
        cancelEditFecha();
    };

    const onSubmit = () => {
        if (grupoId === undefined || grupoId === null || fechasVisita.length === 0) {
            setCheckGrupo(grupoId === undefined || grupoId === null);
            setCheckVisita(fechasVisita.length === 0);
            return;
        }

        var body: StoreTicketBody = {
            fecha_visita: fechasVisita,
            grupo_id: grupoId,
            no_ticket: noTicket ?? "",
            observaciones: observaciones ?? "",
            socio_id: parseInt(socioId ?? "0"),
            mutualista_convenio_id: socio.data?.mutualista_convenio_id ?? 0
        }

        dispatch(storeTicketRequest(body));
    }

    if (grupos.loading || socio.loading) {
        return <span>Cargando...</span>;
    }

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-row items-center gap-4">
                <span className="font-semibold text-xl">Generar visitas</span>
                <span className="bg-gray-100 text-gray-500 border-gray-200 border-1.5 text-sm p-2 rounded-xl">
                    {socio.data?.nombre ?? ""} {socio.data?.segundo_nombre ?? ""} {socio.data?.apellido_paterno ?? ""}{" "}
                    {socio.data?.apellido_materno ?? ""}
                </span>
            </div>

            <div className="w-full flex flex-col gap-4">
                <span className="font-medium">Datos generales</span>

                <div className="w-full grid grid-cols-4 gap-4 items-start">
                    <Select
                        isInvalid={checkGrupo}
                        required
                        label="Grupo*"
                        placeholder="Selecciona el grupo"
                        labelPlacement="outside"
                        value={grupoId?.toString()}
                        onChange={(e) => setGrupoId(parseInt(e.target.value))}
                        className="font-medium"
                    >
                        {(grupos.data?.data ?? [])
                            .filter((option) => option.fecha_baja === null)
                            .map((option) => (
                                <SelectItem key={option.grupo.id}>{option.grupo.nombre}</SelectItem>
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

                <Divider className="my-4" />

                <span className="font-medium">Fechas</span>

                {/* ======= Fechas UI (local) ======= */}
                <div className="w-full flex flex-col gap-8">
                    <div className="w-full grid grid-cols-4 gap-4 items-end">
                        <Input
                            isInvalid={checkVisita}
                            type="date"
                            label="Fecha de visita"
                            labelPlacement="outside"
                            className="font-medium col-span-2"
                            value={fechaInput}
                            onChange={(e) => setFechaInput(e.target.value)}
                        />

                        <Button
                            type="button"
                            variant="solid"
                            className="bg-emerald-500 text-white disabled:bg-opacity-50"
                            onPress={addFecha}
                            disabled={!fechaInput.trim()}
                        >
                            Agregar fecha
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="disabled:bg-opacity-50"
                            onPress={clearFechas}
                            disabled={fechasVisita.length === 0}
                        >
                            Limpiar
                        </Button>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                        {fechasVisita.length === 0 ? (
                            <div className="text-gray-500 text-sm">Aún no agregas fechas.</div>
                        ) : (
                            fechasVisita.map((fecha, index) => (
                                <Card
                                    key={`${fecha}-${index}`}
                                    className="w-full flex flex-row items-center justify-between gap-3 p-3 rounded-xl border border-gray-200"
                                >
                                    {editingIndex === index ? (
                                        <div className="flex-1">
                                            <Input
                                                type="date"
                                                labelPlacement="outside"
                                                className="font-medium"
                                                value={editingValue}
                                                onChange={(e) => setEditingValue(e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex-1 font-medium text-gray-800">{fecha}</div>
                                    )}

                                    <div className="flex gap-2">
                                        {editingIndex === index ? (
                                            <>
                                                <Button
                                                    type="button"
                                                    variant="solid"
                                                    className="bg-emerald-500 text-white"
                                                    onPress={saveEditFecha}
                                                    disabled={!editingValue.trim()}
                                                >
                                                    Guardar
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="flat"
                                                    onPress={cancelEditFecha}
                                                >
                                                    Cancelar
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    type="button"
                                                    variant="flat"
                                                    onPress={() => startEditFecha(index)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    color="danger"
                                                    onPress={() => removeFecha(index)}
                                                >
                                                    Eliminar
                                                </Button>

                                            </>
                                        )}
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
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
                    isLoading={tickets.loading}
                >
                    Guardar
                </Button>
            </div>
        </div>
    );
};

export default StoreTicketPage;
