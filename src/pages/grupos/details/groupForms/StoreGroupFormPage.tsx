import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../store/configStore/store";
import { ItemState, PaginatedState } from "../../../../types/commons";
import { Grupo } from "../../../../types/grupos";
import { showGrupoRequest } from "../../../../store/features/grupos/gruposSlice";
import {
    GetSociosByGrupoParams,
    SocioGrupoPivot,
} from "../../../../types/socioGrupoPivots";
import { getSociosByGrupoRequest } from "../../../../store/features/socioGrupoPivots/socioGrupoPivotsSlice";
import { Card, Divider, Button, Select, SelectItem, Input, addToast } from "@heroui/react";
import { GroupForm, GroupFormBody, GroupFormItemBody } from "../../../../types/groupForms";
import { storeGroupFormRequest } from "../../../../store/features/groupForms/groupFormsSlice";
import { GetAgeAtMonthEnd } from "../../../../helper/utils/Format";

const cellBase =
    "border border-gray-700 text-xs align-middle px-2 py-1 bg-white";
const headBase =
    "border border-gray-700 text-xs font-semibold text-center align-middle px-2 py-2";
const headBlue = "bg-blue-200";
const headBlue2 = "bg-blue-300";

type ViveCode = "S" | "F" | "P" | "VA" | "PE";

type FieldKey = keyof GroupFormItemBody;
type ValidationError = {
    socio_id: number;
    field: FieldKey;
    message: string;
};

const makeKey = (socio_id: number, field: FieldKey) => `${socio_id}.${field}`;
const makeId = (socio_id: number, field: FieldKey) => `gf-${socio_id}-${field}`;

const isNil = (v: unknown) => v === null || v === undefined;
const isBlank = (v: unknown) => typeof v === "string" && v.trim().length === 0;

const StoreGroupFormPage: React.FC = () => {
    const { grupoId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const grupo = useSelector(
        (state: RootState) => state.grupos as ItemState<Grupo>
    );
    const socioGroups = useSelector(
        (state: RootState) =>
            state.socioGrupoPivots as PaginatedState<SocioGrupoPivot>
    );
    const form = useSelector((state: RootState) => state.groupForms as ItemState<GroupForm>);

    var date = new Date().getFullYear();

    const [month, setMonth] = useState<number | undefined>(6);
    const [year, setYear] = useState<number | undefined>(date);
    const [items, setItems] = useState<GroupFormItemBody[]>([]);
    const [errorsMap, setErrorsMap] = useState<Record<string, string>>({});

    useEffect(() => {
        dispatch(showGrupoRequest(grupoId ?? ""));
        getSocios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getSocios = () => {
        const params: GetSociosByGrupoParams = {
            page: 1,
            body: {
                grupo_id: parseInt(grupoId ?? "0"),
                per_page: 999999999,
                activo: true,
                baja: false,
            },
        };
        dispatch(getSociosByGrupoRequest(params));
    };

    const buildDefaultItem = (sgItem: SocioGrupoPivot): GroupFormItemBody => ({
        socio_id: sgItem.socio_id,
        socio: sgItem.socio,

        date_of: "",
        date_of_type: "",

        // true pública / false privada
        atencion_medica: true,

        no_internaciones: 0,
        rnpd: false,
        bps: false,

        // true abierto / false protegido
        trabajo: true,

        vive: "S" as ViveCode,

        asistencia: 0,
        motivacion: 0,
        participacion: 0,
        comunicacion: 0,
        autonomia: 0,
        autocuidado: 0,

        otras_actividades: "",
        otras_actividades_fuera: false,
    });

    useEffect(() => {
        if (!socioGroups.indexSuccess) return;
        const socioItems = socioGroups.data?.data?.map(buildDefaultItem) ?? [];
        setItems(socioItems);
        setErrorsMap({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socioGroups.indexSuccess]);

    useEffect(() => {
        if (form.storeSuccess !== null) {
            if (form.storeSuccess) {
                addToast({
                    title: "OK",
                    description: form.message,
                    color: 'success',
                })
            } else {
                addToast({
                    title: "Error",
                    description: form.error,
                    color: 'danger',
                })
            }
            navigate(`/sia/mantenimiento/grupos/${grupoId}/detalle?tab=forms`)
        }
    }, [form.storeSuccess]);

    const updateItem = (
        socio_id: number | undefined,
        patch: Partial<GroupFormItemBody>
    ) => {
        if (!socio_id) return;

        setItems((prev) =>
            prev.map((it) => (it.socio_id === socio_id ? { ...it, ...patch } : it))
        );

        // si el usuario modifica un campo, limpia su error
        setErrorsMap((prev) => {
            const next = { ...prev };
            Object.keys(patch).forEach((k) => delete next[makeKey(socio_id, k as FieldKey)]);
            return next;
        });
    };

    const toNumber = (v: string) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : 0;
    };

    // -------------------------
    // ✅ VALIDACIÓN
    // -------------------------
    const validateBeforeSubmit = (itemsToValidate: GroupFormItemBody[]) => {
        const errors: ValidationError[] = [];

        const push = (socio_id: number, field: FieldKey, message: string) => {
            errors.push({ socio_id, field, message });
        };

        const validateScale = (
            socio_id: number,
            field: FieldKey,
            value: unknown,
            label: string
        ) => {
            if (isNil(value) || typeof value !== "number" || !Number.isFinite(value)) {
                push(socio_id, field, `${label} es obligatorio.`);
                return;
            }
            if (value < 1 || value > 5) {
                push(socio_id, field, `${label} debe ser 1 a 5.`);
            }
        };

        itemsToValidate.forEach((item) => {
            const sid = item.socio_id ?? 0;
            if (!sid) return;

            // Requeridos (no "" / null / undefined)
            if (isNil(item.date_of) || isBlank(item.date_of)) {
                push(sid, "date_of", "Selecciona la fecha.");
            }
            if (isNil(item.date_of_type) || isBlank(item.date_of_type)) {
                push(sid, "date_of_type", "Selecciona el tipo de fecha (I/A/R).");
            }
            if (isNil(item.vive) || isBlank(item.vive)) {
                push(sid, "vive", "Selecciona dónde vive.");
            }
            if (isNil(item.otras_actividades) || isBlank(item.otras_actividades)) {
                push(sid, "otras_actividades", "Escribe otras actividades en el centro.");
            }

            // Números que no pueden ser 0 (según tu regla)
            if (isNil(item.no_internaciones) || item.no_internaciones === 0) {
                push(sid, "no_internaciones", "No. internaciones no puede ser 0.");
            }

            // Escalas 1-5
            validateScale(sid, "asistencia", item.asistencia, "Asistencia");
            validateScale(sid, "motivacion", item.motivacion, "Motivación");
            validateScale(sid, "participacion", item.participacion, "Participación");
            validateScale(sid, "comunicacion", item.comunicacion, "Comunicación");
            validateScale(sid, "autonomia", item.autonomia, "Autonomía");
            validateScale(sid, "autocuidado", item.autocuidado, "Autocuidado");

            // Booleans: solo asegurar no nil
            ([
                "atencion_medica",
                "rnpd",
                "bps",
                "trabajo",
                "otras_actividades_fuera",
            ] as FieldKey[]).forEach((f) => {
                const v = (item as any)[f];
                if (isNil(v)) push(sid, f, "Campo requerido.");
            });
        });

        const map: Record<string, string> = {};
        errors.forEach((e) => (map[makeKey(e.socio_id, e.field)] = e.message));

        return {
            ok: errors.length === 0,
            errors,
            errorsMap: map,
            firstError: errors[0] ?? null,
        };
    };

    const scrollToFirstError = (firstError: ValidationError | null) => {
        if (!firstError) return;
        const id = makeId(firstError.socio_id, firstError.field);
        const el = document.getElementById(id) as (HTMLElement & { focus?: () => void }) | null;
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        setTimeout(() => el.focus?.(), 150);
    };

    const handleSubmit = () => {
        const result = validateBeforeSubmit(items);

        if (!result.ok) {
            setErrorsMap(result.errorsMap);
            scrollToFirstError(result.firstError);

            // ✅ Encaminado: tú decides qué hacer aquí
            console.log("Errores de validación:", result.errors);
            return;
        }

        setErrorsMap({});

        // ✅ Encaminado: aquí ya decides tu submit real
        // - build body
        // - dispatch saga
        // - call API
        console.log("✅ Validación OK, listo para submit:", items);

        if (month === undefined || year === undefined || year === 0) {
            return;
        }

        makeRequest();
    };

    const makeRequest = () => {
        var params: GroupFormBody = {
            grupo_id: parseInt(grupoId ?? "0"),
            month: month ?? 0,
            year: year ?? 0,
            items: items,
        };

        console.log(params);
        dispatch(storeGroupFormRequest(params));
    }

    // -------------------------
    // ✅ UI helpers
    // -------------------------
    const getError = (socio_id: number | undefined, field: FieldKey) =>
        socio_id ? errorsMap[makeKey(socio_id, field)] : undefined;

    const controlClass = (socio_id: number | undefined, field: FieldKey) => {
        const base = "w-full border rounded px-2 py-1 text-xs outline-none";
        return getError(socio_id, field)
            ? `${base} border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200`
            : `${base} border-gray-300 bg-white focus:ring-2 focus:ring-blue-200`;
    };

    if (grupo.loading || socioGroups.loading) return <div>Cargando...</div>;

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4 mb-2">
                <div className="w-full flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-xl">EVALUACIÓN GRUPAL SEMESTRAL</span>
                        <span>{grupo?.data?.nombre}</span>
                    </div>

                    <div className="w-1/4 flex flex-row gap-2">
                        <Select
                            label="Semestre"
                            labelPlacement="outside"
                            size="sm"
                            value={month?.toString()}
                            selectedKeys={[month?.toString() ?? ""]}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setMonth(Number(e.target.value));
                            }}
                        >
                            <SelectItem key={"6"}>Junio</SelectItem>
                            <SelectItem key={"12"}>Diciembre</SelectItem>
                        </Select>

                        <Input
                            label="Año"
                            labelPlacement="outside"
                            value={year?.toString()}
                            type="number"
                            size="sm"
                            onChange={(e) => {
                                setYear(Number(e.target.value));
                            }}

                        />
                    </div>

                    <div>
                        <Button size="sm" color="primary" onPress={handleSubmit} className="bg-emerald-500">
                            Guardar
                        </Button>
                    </div>
                </div>

                {Object.keys(errorsMap).length > 0 && (
                    <div className="text-sm text-red-600">
                        Hay campos pendientes. Revisa las celdas marcadas en rojo.
                    </div>
                )}
            </div>

            <Divider />

            <Card className="w-full p-3">
                <div className="w-full overflow-auto">
                    <table className="border-collapse min-w-[1700px]">
                        <thead>

                            <tr>
                                <th className={`${headBase} ${headBlue}`} rowSpan={2} style={{ minWidth: 220 }}>
                                    NOMBRE DEL USUARIO
                                </th>

                                <th className={`${headBase} ${headBlue2}`} rowSpan={2} style={{ minWidth: 70 }}>
                                    Edad
                                </th>

                                <th className={`${headBase} ${headBlue}`} colSpan={2} style={{ minWidth: 220 }}>
                                    Fecha de (I/A/R)
                                </th>

                                <th className={`${headBase} ${headBlue}`} rowSpan={2} style={{ minWidth: 130 }}>
                                    Atención médica
                                </th>

                                <th className={`${headBase} ${headBlue}`} rowSpan={2} style={{ minWidth: 70 }}>
                                    Nº internaciones
                                </th>

                                <th className={`${headBase} ${headBlue2}`} rowSpan={2} style={{ minWidth: 90 }}>
                                    RNPCD
                                </th>

                                <th className={`${headBase} ${headBlue2}`} rowSpan={2} style={{ minWidth: 90 }}>
                                    Pensión BPS
                                </th>

                                <th className={`${headBase} ${headBlue}`} rowSpan={2} style={{ minWidth: 120 }}>
                                    Trabajo
                                </th>

                                <th className={`${headBase} ${headBlue}`} rowSpan={2} style={{ minWidth: 140 }}>
                                    Vive
                                </th>

                                <th className={`${headBase} ${headBlue}`} colSpan={6}>
                                    En el grupo
                                    <div className="w-full grid grid-cols-5 gap-2 pt-3 text-[10px] font-normal">
                                        <span>1. Muy inadecuado</span>
                                        <span>2. Inadecuado</span>
                                        <span>3. Adecuación regular</span>
                                        <span>4. Adecuado</span>
                                        <span>5. Muy adecuado</span>
                                    </div>
                                </th>

                                <th className={`${headBase} ${headBlue}`} rowSpan={2} style={{ minWidth: 240 }}>
                                    Otras actividades en Centro Sur Palermo
                                </th>

                                <th className={`${headBase} ${headBlue2}`} rowSpan={2} style={{ minWidth: 120 }}>
                                    Otras actividades fuera
                                </th>
                            </tr>

                            <tr>
                                <th className={`${headBase} bg-white`} style={{ minWidth: 130 }}>
                                    Fecha
                                </th>
                                <th className={`${headBase} bg-white`} style={{ minWidth: 90 }}>
                                    Tipo
                                </th>

                                <th className={`${headBase} ${headBlue}`} style={{ minWidth: 80 }}>
                                    Asistencia
                                </th>
                                <th className={`${headBase} ${headBlue}`} style={{ minWidth: 80 }}>
                                    Motivación
                                </th>
                                <th className={`${headBase} ${headBlue}`} style={{ minWidth: 90 }}>
                                    Participación
                                </th>
                                <th className={`${headBase} ${headBlue}`} style={{ minWidth: 100 }}>
                                    Comunicación
                                </th>
                                <th className={`${headBase} ${headBlue}`} style={{ minWidth: 90 }}>
                                    Autonomía
                                </th>
                                <th className={`${headBase} ${headBlue}`} style={{ minWidth: 100 }}>
                                    Autocuidado
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => {
                                const socio = item.socio;
                                const nombre = `${socio?.apellido_paterno ?? ""} ${socio?.apellido_materno ?? ""} ${socio?.nombre ?? ""}`.trim();
                                const edad = GetAgeAtMonthEnd(socio.fecha_nacimiento, month, year);

                                const viveValue: ViveCode | "" = (item.vive as any) ?? "";

                                const scaleFields: { key: FieldKey; label: string }[] = [
                                    { key: "asistencia", label: "Asistencia" },
                                    { key: "motivacion", label: "Motivación" },
                                    { key: "participacion", label: "Participación" },
                                    { key: "comunicacion", label: "Comunicación" },
                                    { key: "autonomia", label: "Autonomía" },
                                    { key: "autocuidado", label: "Autocuidado" },
                                ];

                                return (
                                    <tr key={item.socio_id}>
                                        <td className={cellBase}>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{nombre || "—"}</span>
                                                <span className="text-[10px] opacity-60">
                                                    socio_id: {item.socio_id}
                                                </span>
                                            </div>
                                        </td>

                                        <td className={`${cellBase} text-center`}>{edad || "—"}</td>

                                        {/* date_of */}
                                        <td className={cellBase}>
                                            <input
                                                id={makeId(item.socio_id!, "date_of")}
                                                className={controlClass(item.socio_id, "date_of")}
                                                type="date"
                                                value={item.date_of}
                                                onChange={(e) => updateItem(item.socio_id, { date_of: e.target.value })}
                                                title={getError(item.socio_id, "date_of")}
                                            />
                                        </td>

                                        {/* date_of_type */}
                                        <td className={cellBase}>
                                            <select
                                                id={makeId(item.socio_id!, "date_of_type")}
                                                className={controlClass(item.socio_id, "date_of_type")}
                                                value={item.date_of_type}
                                                onChange={(e) => updateItem(item.socio_id, { date_of_type: e.target.value })}
                                                title={getError(item.socio_id, "date_of_type")}
                                            >
                                                <option value="">—</option>
                                                <option value="I">Ingreso (I)</option>
                                                <option value="A">Abandono (A)</option>
                                                <option value="R">Reingreso (R)</option>
                                            </select>
                                        </td>

                                        {/* atencion_medica */}
                                        <td className={cellBase}>
                                            <select
                                                id={makeId(item.socio_id!, "atencion_medica")}
                                                className={controlClass(item.socio_id, "atencion_medica")}
                                                value={item.atencion_medica ? "publica" : "privada"}
                                                onChange={(e) =>
                                                    updateItem(item.socio_id, { atencion_medica: e.target.value === "publica" })
                                                }
                                                title={getError(item.socio_id, "atencion_medica")}
                                            >
                                                <option value="publica">Pública</option>
                                                <option value="privada">Privada</option>
                                            </select>
                                        </td>

                                        {/* no_internaciones */}
                                        <td className={cellBase}>
                                            <input
                                                id={makeId(item.socio_id!, "no_internaciones")}
                                                className={controlClass(item.socio_id, "no_internaciones")}
                                                type="number"
                                                value={String(item.no_internaciones)}
                                                onChange={(e) => updateItem(item.socio_id, { no_internaciones: toNumber(e.target.value) })}
                                                title={getError(item.socio_id, "no_internaciones")}
                                            />
                                        </td>

                                        {/* rnpd */}
                                        <td className={`${cellBase} text-center`}>
                                            <input
                                                id={makeId(item.socio_id!, "rnpd")}
                                                type="checkbox"
                                                checked={item.rnpd}
                                                onChange={(e) => updateItem(item.socio_id, { rnpd: e.target.checked })}
                                                title={getError(item.socio_id, "rnpd")}
                                            />
                                        </td>

                                        {/* bps */}
                                        <td className={`${cellBase} text-center`}>
                                            <input
                                                id={makeId(item.socio_id!, "bps")}
                                                type="checkbox"
                                                checked={item.bps}
                                                onChange={(e) => updateItem(item.socio_id, { bps: e.target.checked })}
                                                title={getError(item.socio_id, "bps")}
                                            />
                                        </td>

                                        {/* trabajo */}
                                        <td className={cellBase}>
                                            <select
                                                id={makeId(item.socio_id!, "trabajo")}
                                                className={controlClass(item.socio_id, "trabajo")}
                                                value={item.trabajo ? "abierto" : "protegido"}
                                                onChange={(e) => updateItem(item.socio_id, { trabajo: e.target.value === "abierto" })}
                                                title={getError(item.socio_id, "trabajo")}
                                            >
                                                <option value="abierto">Mercado abierto</option>
                                                <option value="protegido">Protegido</option>
                                            </select>
                                        </td>

                                        {/* vive */}
                                        <td className={cellBase}>
                                            <select
                                                id={makeId(item.socio_id!, "vive")}
                                                className={controlClass(item.socio_id, "vive")}
                                                value={viveValue}
                                                onChange={(e) => updateItem(item.socio_id, { vive: (e.target.value as ViveCode) || "" })}
                                                title={getError(item.socio_id, "vive")}
                                            >
                                                <option value="">—</option>
                                                <option value="S">Sólo (S)</option>
                                                <option value="F">Familia (F)</option>
                                                <option value="P">Pareja (P)</option>
                                                <option value="VA">Vivienda Asis. (VA)</option>
                                                <option value="PE">Pensión (PE)</option>
                                            </select>
                                        </td>

                                        {/* escalas */}
                                        {scaleFields.map(({ key }) => (
                                            <td className={cellBase} key={`${item.socio_id}-${String(key)}`}>
                                                <input
                                                    id={makeId(item.socio_id!, key)}
                                                    className={controlClass(item.socio_id, key)}
                                                    type="number"
                                                    min={1}
                                                    max={5}
                                                    step={1}
                                                    value={String((item as any)[key])}
                                                    onChange={(e) => {
                                                        const v = Number(e.target.value);
                                                        if (v >= 1 && v <= 5) {
                                                            updateItem(item.socio_id, { [key]: v } as any);
                                                        }
                                                    }}
                                                    title={getError(item.socio_id, key)}
                                                />
                                            </td>
                                        ))}

                                        {/* otras_actividades */}
                                        <td className={cellBase}>
                                            <input
                                                id={makeId(item.socio_id!, "otras_actividades")}
                                                className={controlClass(item.socio_id, "otras_actividades")}
                                                value={item.otras_actividades}
                                                onChange={(e) => updateItem(item.socio_id, { otras_actividades: e.target.value })}
                                                placeholder="Descripción..."
                                                title={getError(item.socio_id, "otras_actividades")}
                                            />
                                        </td>

                                        {/* otras_actividades_fuera */}
                                        <td className={`${cellBase} text-center`}>
                                            <input
                                                id={makeId(item.socio_id!, "otras_actividades_fuera")}
                                                type="checkbox"
                                                checked={item.otras_actividades_fuera}
                                                onChange={(e) =>
                                                    updateItem(item.socio_id, { otras_actividades_fuera: e.target.checked })
                                                }
                                                title={getError(item.socio_id, "otras_actividades_fuera")}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default StoreGroupFormPage;
