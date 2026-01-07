import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/configStore/store";
import { ItemState, ListState } from "../../types/commons";
import { CForm, CFormBody, UpdateCFormParams } from "../../types/cform";
import { Socio } from "../../types/socios";
import { showCFormRequest, storeCFormRequest, updateCFormRequest } from "../../store/features/forms/CForm/CFormSlice";
import { showSocioRequest } from "../../store/features/socios/sociosSlice";
import { CFormEvaluacion, CFormMotivoEgreso, socioForms, YNCombo } from "../../types/combos";
import { Programa } from "../../types/programas";
import { indexProgramasRequest } from "../../store/features/programas/programasSlice";
import { addToast, Autocomplete, AutocompleteItem, Button, Divider, Input, Link, Select, Selection, SelectItem, SharedSelection, Textarea } from "@heroui/react";
import { commonLeftLabelClassNames } from "./AFormPage";
import { BoolParse, YNParse } from "../../helper/utils/Format";

const CFormPage: React.FC = () => {
    const { socioId, cFormId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useSelector((state: RootState) => state.cForm as ItemState<CForm>);
    const socio = useSelector((state: RootState) => state.socios as ItemState<Socio>);
    const programas = useSelector((state: RootState) => state.programas as ListState<Programa>);

    const [parsedSocioId, setParsedSocioId] = useState<number | undefined>(undefined);
    const [parsedCFormId, setParsedCFormId] = useState<number | undefined>(undefined);

    // flags
    const [programa, setPrograma] = useState<string | null>(null);
    const [fechaIngresoPrograma, setFechaIngresoPrograma] = useState<string | null>(null);
    const [inscritoRnpd, setInscritoRnpd] = useState<boolean | null>(null);
    const [medicoPsiquiatra, setMedicoPsiquiatra] = useState<string | null>(null);
    const [psicoterapeuta, setPsicoterapeuta] = useState<string | null>(null);
    const [mesesTratamiento, setMesesTratamiento] = useState<number | null>(null);
    const [diagnostico, setDiagnostico] = useState<string | null>(null);
    const [medicacion, setMedicacion] = useState<string | null>(null);
    const [egresoProgramado, setEgresoProgramado] = useState<boolean | null>(null);
    const [otroMotivoEgreso, setOtroMotivoEgreso] = useState<number | null>(null);
    const [informoFamiliar, setInformoFamiliar] = useState<boolean | null>(null);
    const [insercionLaboral, setInsercionLaboral] = useState<boolean | null>(null);
    const [insercionLaboralNotes, setInsercionLaboralNotes] = useState<string | null>(null);
    const [insercionCurricular, setInsercionCurricular] = useState<boolean | null>(null);
    const [insercionCurricularNotes, setInsercionCurricularNotes] = useState<string | null>(null);
    const [insercionSCD, setInsercionSCD] = useState<boolean | null>(null);
    const [insercionSCDNotes, setInsercionSCDNotes] = useState<string | null>(null);
    const [otrasActividades, setOtrasActividades] = useState<string | null>(null);
    const [derivacionNombres, setDerivacionNombres] = useState<Set<string> | null>(null);
    const [evaluacionTratamiento, setEvaluacionTratamiento] = useState<number | null>(null);
    const [evaluacionFinalNotes, setEvaluacionFinalNotes] = useState<string | null>(null);
    const [capturadaPor, setCapturadaPor] = useState<string | null>(null);

    const [checkPograma, setCheckPograma] = useState<boolean>(false);
    const [checkEvaluacionTratamiento, setCheckEvaluacionTratamiento] = useState<boolean>(false);

    useEffect(() => {
        setParsedSocioId(Number(socioId));
        setParsedCFormId(cFormId ? Number(cFormId) : undefined);
    }, []);

    useEffect(() => {
        if (parsedCFormId !== undefined && parsedCFormId !== null) {
            dispatch(showCFormRequest(parsedCFormId.toString()));
        }
        if (parsedSocioId !== undefined && parsedSocioId !== null) {
            dispatch(showSocioRequest(parsedSocioId.toString()));
        }
        dispatch(indexProgramasRequest(undefined));
    }, [parsedCFormId, parsedSocioId]);

    useEffect(() => {
        if (form.showSuccess) {
            setPrograma(form.data?.programa ?? null);
            setFechaIngresoPrograma(form.data?.fecha_ingreso_programa ?? null);
            setInscritoRnpd(form.data?.inscrito_rnpd ?? null);
            setMedicoPsiquiatra(form.data?.medico_psiquiatra ?? null);
            setPsicoterapeuta(form.data?.psicoterapeuta ?? null);
            setMesesTratamiento(form.data?.meses_tratamiento ?? null);
            setDiagnostico(form.data?.diagnostico ?? null);
            setMedicacion(form.data?.medicacion ?? null);
            setEgresoProgramado(form.data?.egreso_programado ?? null);
            setOtroMotivoEgreso(form.data?.otro_motivo_egreso ?? 0);
            setInformoFamiliar(form.data?.informo_familiar ?? null);
            setInsercionLaboral(form.data?.insercion_laboral ?? null);
            setInsercionLaboralNotes(form.data?.insercion_laboral_notes ?? null);
            setInsercionCurricular(form.data?.insercion_curricular ?? null);
            setInsercionCurricularNotes(form.data?.insercion_curricular_notes ?? null);
            setInsercionSCD(form.data?.insercion_scd ?? null);
            setInsercionSCDNotes(form.data?.insercion_scd_notes ?? null);
            setOtrasActividades(form.data?.otras_actividades ?? null);
            setDerivacionNombres(
                form.data?.derivacion_nombres?.length
                    ? new Set(form.data.derivacion_nombres)
                    : null
            );
            setEvaluacionTratamiento(form.data?.evaluacion_tratamiento ?? null);
            setEvaluacionFinalNotes(form.data?.evaluacion_final_notes ?? null);
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
            navigate(`/sia/socios/${socioId}?tab=forms&form=2`);
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
            navigate(`/sia/socios/${socioId}?tab=forms&form=2`);
        }
    }, [form.updateSuccess]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //e.stopPropagation();

        var ckPrograma = programa == null || programa == '';
        var ckEvaluacionTratamiento = evaluacionTratamiento == null || evaluacionTratamiento == 0;

        setCheckPograma(ckPrograma);
        setCheckEvaluacionTratamiento(ckEvaluacionTratamiento);

        if (ckPrograma || ckEvaluacionTratamiento) {
            return;
        }

        const body: CFormBody = {
            programa: programa ?? '',
            fecha_ingreso_programa: fechaIngresoPrograma ?? '',
            inscrito_rnpd: inscritoRnpd,
            medico_psiquiatra: medicoPsiquiatra ?? '',
            psicoterapeuta: psicoterapeuta ?? '',
            meses_tratamiento: mesesTratamiento ?? 0,
            diagnostico: diagnostico ?? '',
            medicacion: medicacion ?? '',
            egreso_programado: egresoProgramado ?? false,
            otro_motivo_egreso: otroMotivoEgreso ?? null,
            informo_familiar: informoFamiliar ?? false,
            insercion_laboral: insercionLaboral ?? false,
            insercion_laboral_notes: insercionLaboralNotes ?? '',
            insercion_curricular: insercionCurricular ?? false,
            insercion_curricular_notes: insercionCurricularNotes ?? '',
            insercion_scd: insercionSCD ?? false,
            insercion_scd_notes: insercionSCDNotes ?? '',
            otras_actividades: otrasActividades ?? '',
            derivacion_nombres: Array.from(derivacionNombres ?? []),
            evaluacion_tratamiento: evaluacionTratamiento ?? 0,
            evaluacion_final_notes: evaluacionFinalNotes ?? '',
            capturada_por: capturadaPor ?? '',
            socio_id: parsedSocioId ?? 0,
        }

        if (parsedCFormId !== undefined && parsedCFormId !== null) {
            //  UPDATE
            var params: UpdateCFormParams = {
                id: parsedCFormId.toString(),
                body: body,
            };

            dispatch(updateCFormRequest(params));
        } else {
            //  STORE
            dispatch(storeCFormRequest(body))
        }
    }

    if (form.loading || socio.loading) {
        return (
            <span>Cargando...</span>
        )
    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-8">
            <div className="flex flex-row items-center gap-4">
                <span className="font-semibold text-xl">{socioForms.at(2)?.label}</span>
                <span className="bg-gray-100 text-gray-500 border-gray-200 border-1.5 text-sm p-2 rounded-xl">{parsedCFormId ? `C-${parsedCFormId}` : 'CREACIÓN'}</span>
            </div>
            <div className="w-full flex flex-col gap-4">
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
                        isDisabled
                        label="Dirección"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={`${socio.data?.calle ?? 'SC'} #${socio.data?.numero ?? 'SN'}`}
                    />
                    <Input
                        isDisabled
                        label="Cel/Tel"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={`${socio.data?.celular ?? ''} / ${socio.data?.telefono ?? ''}`}
                    />
                    <Input
                        isDisabled
                        label="Email"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={`${socio.data?.email ?? 'Sin email'}`}
                    />

                </div>
                <Divider className="my-4" />
                <div className="w-full grid grid-cols-3 gap-4">
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
                        classNames={commonLeftLabelClassNames}
                    >
                        {YNCombo.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                    {
                        programas.loading ?
                            <span>Cargando...</span>
                            :
                            <Autocomplete
                                required
                                isInvalid={checkPograma}
                                placeholder="Programa"
                                label="Programa"
                                labelPlacement="outside-left"
                                selectedKey={programa}
                                defaultItems={programas.data ?? []}
                                classNames={commonLeftLabelClassNames}
                                className="w-full font-medium pl-2"
                                onSelectionChange={(key) => {
                                    if (key) setPrograma(key.toString());
                                    if (checkPograma) {
                                        setCheckPograma(false);
                                    }
                                }}
                            >
                                {(option) => (
                                    <AutocompleteItem key={option.id} textValue={option.nombre}>{option.nombre}</AutocompleteItem>
                                )}
                            </Autocomplete>
                    }
                    <Input
                        type="date"
                        label="Fecha ingreso al programa"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={fechaIngresoPrograma ?? ''}
                        onChange={(e) => {
                            setFechaIngresoPrograma(e.target.value);
                        }}
                    />
                    <Input
                        label="Médico psiquiatra"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={medicoPsiquiatra ?? ''}
                        onChange={(e) => {
                            setMedicoPsiquiatra(e.target.value);
                        }}
                    />
                    <Input
                        label="Psicoterapeuta"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={psicoterapeuta ?? ''}
                        onChange={(e) => {
                            setPsicoterapeuta(e.target.value);
                        }}
                    />
                    <Input
                        label="Meses tratamiento"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={mesesTratamiento?.toString() ?? ''}
                        type="number"
                        onChange={(e) => {
                            setMesesTratamiento(Number(e.target.value));
                        }}
                    />
                </div>
                <div className="w-full grid grid-cols-2 gap-4">
                    <Textarea
                        label="Diagnostico"
                        labelPlacement="inside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={diagnostico ?? ''}
                        onChange={(e) => {
                            setDiagnostico(e.target.value);
                        }}
                    />
                    <Textarea
                        label="Medicación"
                        labelPlacement="inside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={medicacion ?? ''}
                        onChange={(e) => {
                            setMedicacion(e.target.value);
                        }}
                    />
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                    <Select
                        required
                        label="Egreso programado"
                        labelPlacement="outside-left"
                        value={YNParse(egresoProgramado)}
                        selectedKeys={YNParse(egresoProgramado)}
                        onChange={(e) => {
                            setEgresoProgramado(BoolParse(e.target.value))
                        }}
                        className="font-medium pl-2"
                        classNames={commonLeftLabelClassNames}
                    >
                        {YNCombo.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                    <Select
                        required
                        label="Otro motivo de egreso"
                        labelPlacement="outside-left"
                        value={otroMotivoEgreso?.toString()}
                        selectedKeys={otroMotivoEgreso?.toString()}
                        onChange={(e) => {
                            setOtroMotivoEgreso(Number(e.target.value))
                        }}
                        className="font-medium pl-2"
                        classNames={commonLeftLabelClassNames}
                    >
                        {CFormMotivoEgreso.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                    <Select
                        required
                        label="Se le informó a familiar"
                        labelPlacement="outside-left"
                        value={YNParse(informoFamiliar)}
                        selectedKeys={YNParse(informoFamiliar)}
                        onChange={(e) => {
                            setInformoFamiliar(BoolParse(e.target.value))
                        }}
                        className="font-medium pl-2"
                        classNames={commonLeftLabelClassNames}
                    >
                        {YNCombo.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                </div>
                <Divider className="my-4" />
                <div className="w-full grid grid-cols-2 gap-4 items-start">
                    <Select
                        required
                        label="Insercion laboral"
                        labelPlacement="outside-left"
                        value={YNParse(insercionLaboral)}
                        selectedKeys={YNParse(insercionLaboral)}
                        onChange={(e) => {
                            setInsercionLaboral(BoolParse(e.target.value))
                        }}
                        className="font-medium pl-2"
                        classNames={commonLeftLabelClassNames}
                    >
                        {YNCombo.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                    <Textarea
                        label="Notas"
                        labelPlacement="inside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={insercionLaboralNotes ?? ''}
                        onChange={(e) => {
                            setInsercionLaboralNotes(e.target.value);
                        }}
                    />
                    <Select
                        required
                        label="Insercion curricular"
                        labelPlacement="outside-left"
                        value={YNParse(insercionCurricular)}
                        selectedKeys={YNParse(insercionCurricular)}
                        onChange={(e) => {
                            setInsercionCurricular(BoolParse(e.target.value))
                        }}
                        className="font-medium pl-2"
                        classNames={commonLeftLabelClassNames}
                    >
                        {YNCombo.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                    <Textarea
                        label="Notas"
                        labelPlacement="inside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={insercionCurricularNotes ?? ''}
                        onChange={(e) => {
                            setInsercionCurricularNotes(e.target.value);
                        }}
                    />
                    <Select
                        required
                        label="Insercion social, cultural, deportiva"
                        labelPlacement="outside-left"
                        value={YNParse(insercionSCD)}
                        selectedKeys={YNParse(insercionSCD)}
                        onChange={(e) => {
                            setInsercionSCD(BoolParse(e.target.value))
                        }}
                        className="font-medium pl-2"
                        classNames={commonLeftLabelClassNames}
                    >
                        {YNCombo.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                    <Textarea
                        label="Notas"
                        labelPlacement="inside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={insercionSCDNotes ?? ''}
                        onChange={(e) => {
                            setInsercionSCDNotes(e.target.value);
                        }}
                    />
                </div>
                <Divider className="my-4" />
                <div className="w-full grid grid-cols-2 gap-4 items-start">
                    <Textarea
                        label="Otras actividades"
                        labelPlacement="inside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={otrasActividades ?? ''}
                        onChange={(e) => {
                            setOtrasActividades(e.target.value);
                        }}
                    />
                    {
                        programas.loading ?
                            <span>Cargando...</span>
                            :
                            <Select
                                required
                                label="Derivación a"
                                labelPlacement="outside-left"
                                selectionMode="multiple"
                                selectedKeys={derivacionNombres ?? new Set()}  // ✅ siempre Set
                                onSelectionChange={(keys: SharedSelection) => {
                                    setDerivacionNombres(new Set(Array.from(keys).map(String)));
                                }}
                                className="font-medium pl-2"
                                classNames={commonLeftLabelClassNames}
                            >
                                {(programas.data ?? []).map((option) => (
                                    <SelectItem key={option.nombre}>{option.nombre}</SelectItem>
                                ))}
                            </Select>
                    }
                    <Select
                        required
                        isInvalid={checkEvaluacionTratamiento}
                        label="Evaluación tratamiento"
                        labelPlacement="outside-left"
                        value={evaluacionTratamiento?.toString()}
                        selectedKeys={evaluacionTratamiento?.toString()}
                        onChange={(e) => {
                            setEvaluacionTratamiento(Number(e.target.value))
                            if (checkEvaluacionTratamiento) {
                                setCheckEvaluacionTratamiento(false);
                            }
                        }}
                        className="font-medium pl-2"
                        classNames={commonLeftLabelClassNames}
                    >
                        {CFormEvaluacion.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                    <Input
                        label="Capturada por"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={capturadaPor ?? ''}
                        onChange={(e) => {
                            setCapturadaPor(e.target.value);
                        }}
                    />
                </div>
                <Divider className="my-4" />
            </div>
            <div className="w-1/2 grid grid-cols-2 gap-4 mx-auto">
                <Button
                    variant="solid"
                    isLoading={form.loading}
                    as={Link}
                    href={`/sia/socios/${socioId}?tab=forms&form=2`}
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
        </form >
    );
}

export default CFormPage;
