import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/configStore/store";
import { showAFormRequest, storeAFormRequest, updateAFormRequest } from "../../store/features/forms/AForm/AFormSlice";
import { showSocioRequest } from "../../store/features/socios/sociosSlice";
import { ItemState } from "../../types/commons";
import { Socio } from "../../types/socios";
import { AForm, AFormBody, AFormLabels, UpdateAFormParams } from "../../types/aform";
import { addToast, Button, Card, Divider, Input, InputProps, Link, Select, SelectItem, Textarea } from "@heroui/react";
import { BoolParse, YNParse } from "../../helper/utils/Format";
import { socioForms, YNCombo } from "../../types/combos";
import EvaluationRow from "./fichas-components/EvaluationRow";
import AFormPrograms from "./fichas-components/AFormPrograms";

export const commonLeftLabelClassNames: InputProps["classNames"] = {
    base: "w-full",
    mainWrapper: "w-full",
    inputWrapper: "w-full",
    label: "whitespace-nowrap",
};

const AFormPage: React.FC = () => {
    const { socioId, aFormId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useSelector((state: RootState) => state.aForm as ItemState<AForm>);
    const socio = useSelector((state: RootState) => state.socios as ItemState<Socio>);

    const [parsedSocioId, setParsedSocioId] = useState<number | undefined>(undefined);
    const [parsedAFormId, setParsedAFormId] = useState<number | undefined>(undefined);

    // fechas / flags
    const [fechaIngresoVivienda, setFechaIngresoVivienda] = useState<string | null>(null);
    const [fechaIngresoCentro, setFechaIngresoCentro] = useState<string | null>(null);
    const [fechaEvaluacionSemestral, setFechaEvaluacionSemestral] = useState<string>('');
    const [inscritoRnpd, setInscritoRnpd] = useState<boolean | null>(null);

    // A
    const [a, setA] = useState<number | null>(null);
    const [aNotes, setANotes] = useState<string | null>(null);

    // B
    const [b, setB] = useState<number | null>(null);
    const [bNotes, setBNotes] = useState<string | null>(null);

    // C
    const [c, setC] = useState<number | null>(null);
    const [cNotes, setCNotes] = useState<string | null>(null);

    // D1
    const [d1a, setD1a] = useState<number | null>(null)
    const [d1b, setD1b] = useState<number | null>(null)
    const [d1c, setD1c] = useState<number | null>(null)
    const [d1d, setD1d] = useState<number | null>(null)
    const [d1Notes, setD1Notes] = useState<string | null>(null);

    // D2
    const [d2, setD2] = useState<number | null>(null)
    const [d2Notes, setD2Notes] = useState<string | null>(null);

    // E
    const [e1, setE1] = useState<number | null>(null)
    const [e2, setE2] = useState<number | null>(null)
    const [eNotes, setENotes] = useState<string | null>(null);

    // F
    const [f1, setF1] = useState<number | null>(null)
    const [f2, setF2] = useState<number | null>(null)
    const [f3, setF3] = useState<number | null>(null)
    const [f4, setF4] = useState<number | null>(null)
    const [f5, setF5] = useState<number | null>(null)
    const [fNotes, setFNotes] = useState<string | null>(null);

    // G
    const [g1, setG1] = useState<number | null>(null)
    const [g2, setG2] = useState<number | null>(null)
    const [gNotes, setGNotes] = useState<string | null>(null);

    // H
    const [h, setH] = useState<number | null>(null)
    const [hNotes, setHNotes] = useState<string | null>(null);

    // I
    const [i, setI] = useState<number | null>(null)
    const [iNotes, setINotes] = useState<string | null>(null);

    // J
    const [j, setJ] = useState<number | null>(null)
    const [jNotes, setJNotes] = useState<string | null>(null);

    // K
    const [k, setK] = useState<number | null>(null)
    const [kNotes, setKNotes] = useState<string | null>(null);

    // L
    const [l, setL] = useState<number | null>(null)
    const [lNotes, setLNotes] = useState<string | null>(null);

    // M
    const [m, setM] = useState<number | null>(null)
    const [mNotes, setMNotes] = useState<string | null>(null);

    // N
    const [n, setN] = useState<number | null>(null)
    const [nNotes, setNNotes] = useState<string | null>(null);

    // Proyecto
    const [descripcionProyecto, setDescripcionProyecto] = useState<string | null>(null);
    const [evaluacionProyecto, setEvaluacionProyecto] = useState<string | null>(null);
    const [capturadaPor, setCapturadaPor] = useState<string | null>(null);


    useEffect(() => {
        setParsedSocioId(Number(socioId));
        setParsedAFormId(aFormId ? Number(aFormId) : undefined);
    }, []);

    useEffect(() => {
        if (parsedAFormId !== undefined && parsedAFormId !== null) {
            dispatch(showAFormRequest(parsedAFormId.toString()));
        }
        if (parsedSocioId !== undefined && parsedSocioId !== null) {
            dispatch(showSocioRequest(parsedSocioId.toString()));
        }
    }, [parsedAFormId, parsedSocioId]);

    useEffect(() => {
        if (form.showSuccess) {
            setFechaIngresoVivienda(form.data?.fecha_ingreso_vivienda ?? null);
            setFechaIngresoCentro(form.data?.fecha_ingreso_centro ?? null);
            setFechaEvaluacionSemestral(form.data?.fecha_evaluacion_semestral ?? '');
            setInscritoRnpd(form.data?.inscrito_rnpd ?? null);

            setA(form.data?.a ?? null);
            setANotes(form.data?.a_notes ?? null);
            setB(form.data?.b ?? null);
            setBNotes(form.data?.b_notes ?? null);
            setC(form.data?.c ?? null);
            setCNotes(form.data?.c_notes ?? null);
            setD1a(form.data?.d1a ?? null);
            setD1b(form.data?.d1b ?? null);
            setD1c(form.data?.d1c ?? null);
            setD1d(form.data?.d1d ?? null);
            setD1Notes(form.data?.d1_notes ?? null);
            setD2(form.data?.d2 ?? null);
            setD2Notes(form.data?.d2_notes ?? null);
            setE1(form.data?.e1 ?? null);
            setE2(form.data?.e2 ?? null);
            setENotes(form.data?.e_notes ?? null);
            setF1(form.data?.f1 ?? null);
            setF2(form.data?.f2 ?? null);
            setF3(form.data?.f3 ?? null);
            setF4(form.data?.f4 ?? null);
            setF5(form.data?.f5 ?? null);
            setFNotes(form.data?.f_notes ?? null);
            setG1(form.data?.g1 ?? null);
            setG2(form.data?.g2 ?? null);
            setGNotes(form.data?.g_notes ?? null);
            setH(form.data?.h ?? null);
            setHNotes(form.data?.h_notes ?? null);
            setI(form.data?.i ?? null);
            setINotes(form.data?.i_notes ?? null);
            setJ(form.data?.j ?? null);
            setJNotes(form.data?.j_notes ?? null);
            setK(form.data?.k ?? null);
            setKNotes(form.data?.k_notes ?? null);
            setL(form.data?.l ?? null);
            setLNotes(form.data?.l_notes ?? null);
            setM(form.data?.m ?? null);
            setMNotes(form.data?.m_notes ?? null);
            setN(form.data?.n ?? null);
            setNNotes(form.data?.n_notes ?? null);
            setDescripcionProyecto(form.data?.descripcion_proyecto ?? null);
            setEvaluacionProyecto(form.data?.evaluacion_proyecto ?? null);
            setCapturadaPor(form.data?.capturada_por ?? null);
        }
    }, [form.showSuccess]);

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
            navigate(`/sia/socios/${socioId}?tab=forms&form=0`);
        }
    }, [form.storeSuccess]);

    useEffect(() => {
        if (form.updateSuccess !== null) {
            if (form.updateSuccess) {
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
            navigate(`/sia/socios/${socioId}?tab=forms&form=0`);
        }
    }, [form.updateSuccess]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const body: AFormBody = {
            fecha_ingreso_vivienda: fechaIngresoVivienda,
            fecha_ingreso_centro: fechaIngresoCentro,
            fecha_evaluacion_semestral: fechaEvaluacionSemestral,
            inscrito_rnpd: inscritoRnpd ?? null,

            a: a ?? 0,
            a_notes: aNotes ?? null,

            b: b ?? 0,
            b_notes: bNotes ?? null,

            c: c ?? 0,
            c_notes: cNotes ?? null,

            d1a: d1a ?? 0,
            d1b: d1b ?? 0,
            d1c: d1c ?? 0,
            d1d: d1d ?? 0,
            d1_notes: d1Notes ?? null,
            d2: d2 ?? 0,
            d2_notes: d2Notes ?? null,

            e1: e1 ?? 0,
            e2: e2 ?? 0,
            e_notes: eNotes ?? null,

            f1: f1 ?? 0,
            f2: f2 ?? 0,
            f3: f3 ?? 0,
            f4: f4 ?? 0,
            f5: f5 ?? 0,
            f_notes: fNotes ?? null,

            g1: g1 ?? 0,
            g2: g2 ?? 0,
            g_notes: gNotes ?? null,

            h: h ?? 0,
            h_notes: hNotes ?? null,

            i: i ?? 0,
            i_notes: iNotes ?? null,

            j: j ?? 0,
            j_notes: jNotes ?? null,

            k: k ?? 0,
            k_notes: kNotes ?? null,

            l: l ?? 0,
            l_notes: lNotes ?? null,

            m: m ?? 0,
            m_notes: mNotes ?? null,

            n: n ?? 0,
            n_notes: nNotes ?? null,

            descripcion_proyecto: descripcionProyecto ?? null,
            evaluacion_proyecto: evaluacionProyecto ?? null,
            capturada_por: capturadaPor ?? null,

            socio_id: parsedSocioId ?? 0,
        }

        if (parsedAFormId !== undefined && parsedAFormId !== null) {
            //  UPDATE
            var params: UpdateAFormParams = {
                id: parsedAFormId.toString(),
                body: body,
            };

            dispatch(updateAFormRequest(params));
        } else {
            //  STORE
            dispatch(storeAFormRequest(body));
        }
    };

    if (form.loading || socio.loading) {
        return (
            <span>Cargando...</span>
        )
    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-8">
            <div className="flex flex-row items-center gap-4">
                <span className="font-semibold text-xl">{socioForms.at(0)?.label}</span>
                <span className="bg-gray-100 text-gray-500 border-gray-200 border-1.5 text-sm p-2 rounded-xl">{parsedAFormId ? `A-${parsedAFormId}` : 'CREACIÓN'}</span>
            </div>
            <div className="w-full grid grid-cols-3 gap-4">
                <Input
                    isDisabled
                    label="Socio"
                    labelPlacement="outside-left"
                    className="font-medium"
                    classNames={commonLeftLabelClassNames}
                    value={`${socio.data?.apellido_paterno ?? ''} ${socio.data?.apellido_materno ?? ''} ${socio.data?.nombre ?? ''} ${socio.data?.segundo_nombre ?? ''}`}
                />
                <Input
                    type="date"
                    label="Fecha ingreso a la vivienda"
                    labelPlacement="outside-left"
                    className="font-medium"
                    classNames={commonLeftLabelClassNames}
                    value={fechaIngresoVivienda ?? ''}
                    onChange={(e) => {
                        setFechaIngresoVivienda(e.target.value);
                    }}
                />
                <Input
                    type="date"
                    label="Fecha ingreso al centro"
                    labelPlacement="outside-left"
                    className="font-medium"
                    classNames={commonLeftLabelClassNames}
                    value={fechaIngresoCentro ?? ''}
                    onChange={(e) => {
                        setFechaIngresoCentro(e.target.value);
                    }}
                />
                <Input
                    isDisabled
                    label="Con BPS"
                    labelPlacement="outside-left"
                    className="font-medium"
                    classNames={commonLeftLabelClassNames}
                    value={socio.data?.con_bps ? 'Si' : 'No'}
                />
                <Select
                    required
                    label="Inscrito en el RNPD"
                    labelPlacement="outside-left"
                    value={YNParse(inscritoRnpd)}
                    selectedKeys={YNParse(inscritoRnpd)}
                    onChange={(e) => {
                        setInscritoRnpd(BoolParse(e.target.value))
                    }}
                    className="font-medium pl-2"
                >
                    {YNCombo.map((option) => (
                        <SelectItem key={option.key}>{option.label}</SelectItem>
                    ))}
                </Select>
                <Input
                    type="date"
                    label="Fecha evaluación semestral"
                    labelPlacement="outside-left"
                    className="font-medium"
                    classNames={commonLeftLabelClassNames}
                    value={fechaEvaluacionSemestral ?? ''}
                    onChange={(e) => {
                        setFechaEvaluacionSemestral(e.target.value);
                    }}
                />
                {parsedAFormId && <AFormPrograms programas={form?.data?.programa_nombres ?? []} />}
            </div>

            <Card className="w-full grid grid-cols-5 gap-2 p-2 font-medium text-center">
                <span className="font-normal">Resultados:</span>
                <span>4 MUY BUENA</span>
                <span>3 BUENA</span>
                <span>2 REGULAR</span>
                <span>1 DEFICIENTE</span>
            </Card>

            <div className="w-full flex flex-col gap-4">
                <Divider className="my-4" />
                {/** A */}
                <EvaluationRow
                    required={true}
                    label={AFormLabels.A}
                    value={a}
                    onChange={setA}
                    className="font-semibold"
                />
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={aNotes ?? ''}
                    onChange={(e) => setANotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** B */}
                <EvaluationRow
                    required={true}
                    label={AFormLabels.B}
                    value={b}
                    onChange={setB}
                    className="font-semibold"
                />
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={bNotes ?? ''}
                    onChange={(e) => setBNotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** C */}
                <EvaluationRow
                    required={true}
                    label={AFormLabels.C}
                    value={c}
                    onChange={setC}
                    className="font-semibold"
                />
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={cNotes ?? ''}
                    onChange={(e) => setCNotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** D */}
                <span className="font-semibold">{AFormLabels.D}</span>
                <div className="w-full flex flex-col gap-4 pl-4">
                    <span>{AFormLabels.D1}</span>
                    <div className="w-full flex flex-col gap-4 pl-4">
                        <EvaluationRow
                            required={true}
                            label={AFormLabels.D1A}
                            value={d1a}
                            onChange={setD1a}
                        />
                        <EvaluationRow
                            required={true}
                            label={AFormLabels.D1B}
                            value={d1b}
                            onChange={setD1b}
                        />
                        <EvaluationRow
                            required={true}
                            label={AFormLabels.D1C}
                            value={d1c}
                            onChange={setD1c}
                        />
                        <EvaluationRow
                            required={true}
                            label={AFormLabels.D1D}
                            value={d1d}
                            onChange={setD1d}
                        />
                    </div>
                    <Textarea
                        size="sm"
                        label="Comentarios:"
                        labelPlacement="inside"
                        rows={2}
                        value={d1Notes ?? ''}
                        onChange={(e) => setD1Notes(e.target.value)}
                    />
                    <EvaluationRow
                        required={true}
                        label={AFormLabels.D2}
                        value={d2}
                        onChange={setD2}
                    />
                    <Textarea
                        size="sm"
                        label="Comentarios:"
                        labelPlacement="inside"
                        rows={2}
                        value={d2Notes ?? ''}
                        onChange={(e) => setD2Notes(e.target.value)}
                    />
                </div>
                <Divider className="my-4" />

                {/** E */}
                <span className="font-semibold">{AFormLabels.E}</span>
                <div className="w-full flex flex-col gap-4 pl-4">
                    <EvaluationRow
                        required={true}
                        label={AFormLabels.E1}
                        value={e1}
                        onChange={setE1}
                    />
                    <EvaluationRow
                        required={true}
                        label={AFormLabels.E2}
                        value={e2}
                        onChange={setE2}
                    />
                </div>
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={eNotes ?? ''}
                    onChange={(e) => setENotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** F */}
                <span className="font-semibold">{AFormLabels.F}</span>
                <div className="w-full flex flex-col gap-4 pl-4">
                    <EvaluationRow
                        required={true}
                        label={AFormLabels.F1}
                        value={f1}
                        onChange={setF1}
                    />
                    <EvaluationRow
                        required={true}
                        label={AFormLabels.F2}
                        value={f2}
                        onChange={setF2}
                    />
                    <EvaluationRow
                        required={true}
                        label={AFormLabels.F3}
                        value={f3}
                        onChange={setF3}
                    />
                    <EvaluationRow
                        required={true}
                        label={AFormLabels.F4}
                        value={f4}
                        onChange={setF4}
                    />
                    <EvaluationRow
                        required={true}
                        label={AFormLabels.F5}
                        value={f5}
                        onChange={setF5}
                    />
                </div>
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={fNotes ?? ''}
                    onChange={(e) => setFNotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** G */}
                <span className="font-semibold">{AFormLabels.G}</span>
                <div className="w-full flex flex-col gap-4 pl-4">
                    <EvaluationRow
                        required={true}
                        label={AFormLabels.G1}
                        value={g1}
                        onChange={setG1}
                    />
                    <EvaluationRow
                        required={true}
                        label={AFormLabels.G2}
                        value={g2}
                        onChange={setG2}
                    />
                </div>
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={gNotes ?? ''}
                    onChange={(e) => setGNotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** H */}
                <EvaluationRow
                    required={true}
                    label={AFormLabels.H}
                    value={h}
                    onChange={setH}
                    className="font-semibold"
                />
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={hNotes ?? ''}
                    onChange={(e) => setHNotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** I */}
                <EvaluationRow
                    required={true}
                    label={AFormLabels.I}
                    value={i}
                    onChange={setI}
                    className="font-semibold"
                />
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={iNotes ?? ''}
                    onChange={(e) => setINotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** J */}
                <EvaluationRow
                    required={true}
                    label={AFormLabels.J}
                    value={j}
                    onChange={setJ}
                    className="font-semibold"
                />
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={jNotes ?? ''}
                    onChange={(e) => setJNotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** K */}
                <EvaluationRow
                    required={true}
                    label={AFormLabels.K}
                    value={k}
                    onChange={setK}
                    className="font-semibold"
                />
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={kNotes ?? ''}
                    onChange={(e) => setKNotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** L */}
                <EvaluationRow
                    required={true}
                    label={AFormLabels.L}
                    value={l}
                    onChange={setL}
                    className="font-semibold"
                />
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={lNotes ?? ''}
                    onChange={(e) => setLNotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** M */}
                <EvaluationRow
                    required={true}
                    label={AFormLabels.M}
                    value={m}
                    onChange={setM}
                    className="font-semibold"
                />
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={mNotes ?? ''}
                    onChange={(e) => setMNotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** N */}
                <EvaluationRow
                    required={true}
                    label={AFormLabels.N}
                    value={n}
                    onChange={setN}
                    className="font-semibold"
                />
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={nNotes ?? ''}
                    onChange={(e) => setNNotes(e.target.value)}
                />
                <Divider className="my-4" />

                {/** Proyecto */}
                <span className="font-semibold">{AFormLabels.DESCRIPCION_PROYECTO}</span>
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={descripcionProyecto ?? ''}
                    onChange={(e) => setDescripcionProyecto(e.target.value)}
                />
                <Divider className="my-4" />
                <span className="font-semibold">{AFormLabels.EVALUACION_PROYECTO}</span>
                <Textarea
                    size="sm"
                    label="Comentarios:"
                    labelPlacement="inside"
                    rows={2}
                    value={evaluacionProyecto ?? ''}
                    onChange={(e) => setEvaluacionProyecto(e.target.value)}
                />
                <Divider className="my-4" />
            </div>

            <div className="w-full flex flex-col gap-8 items-center mt-8">
                <Input
                    label="Capturada por"
                    labelPlacement="outside-left"
                    className="w-1/3 font-medium"
                    classNames={commonLeftLabelClassNames}
                    value={capturadaPor ?? ''}
                    onChange={(e) => {
                        setCapturadaPor(e.target.value);
                    }}
                />
                <div className="w-1/2 grid grid-cols-2 gap-4">
                    <Button
                        variant="solid"
                        isLoading={form.loading}
                        as={Link}
                        href={`/sia/socios/${socioId}?tab=forms&form=0`}
                    >
                        Regresar
                    </Button>
                    <Button
                        type="submit"
                        variant="solid"
                        className="bg-emerald-500 text-white"
                        isLoading={form.loading}
                    >
                        Guardar
                    </Button>
                </div>

            </div>




        </form>
    );
};

export default AFormPage;
