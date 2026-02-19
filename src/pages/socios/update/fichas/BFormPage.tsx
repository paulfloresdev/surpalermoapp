import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../store/configStore/store";
import { ItemState, ListState } from "../../../../types/commons";
import { BForm, BFormBody, UpdateBFormParams } from "../../../../types/bform";
import { Socio } from "../../../../types/socios";
import { showBFormRequest, storeBFormRequest, updateBFormRequest } from "../../../../store/features/forms/BForm/BFormSlice";
import { showSocioRequest } from "../../../../store/features/socios/sociosSlice";
import { addToast, Autocomplete, AutocompleteItem, Button, Divider, Input, Link, Select, SelectItem, Textarea } from "@heroui/react";
import { socioForms, YNCombo } from "../../../../types/combos";
import { commonLeftLabelClassNames } from "./AFormPage";
import { BoolParse, YNParse } from "../../../../helper/utils/Format";
import { Programa } from "../../../../types/programas";
import { indexProgramasRequest } from "../../../../store/features/programas/programasSlice";

const BFormPage: React.FC = () => {
    const { socioId, bFormId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useSelector((state: RootState) => state.bForm as ItemState<BForm>);
    const socio = useSelector((state: RootState) => state.socios as ItemState<Socio>);
    const programas = useSelector((state: RootState) => state.programas as ListState<Programa>);

    const [parsedSocioId, setParsedSocioId] = useState<number | undefined>(undefined);
    const [parsedBFormId, setParsedBFormId] = useState<number | undefined>(undefined);

    // fechas / flags
    const [fechaIngresoCentro, setFechaIngresoCentro] = useState<string | null>(null);
    const [fechaDerivacion, setFechaDerivacion] = useState<string | null>(null);
    const [inscritoRnpd, setInscritoRnpd] = useState<boolean | null>(null);
    const [programaNombre, setProgramaNombre] = useState<string | null>(null);

    // cuestionario
    const [medicoPsiquiatra, setMedicoPsiquiatra] = useState<string | null>(null);
    const [psicoterapeuta, setPsicoterapeuta] = useState<string | null>(null);
    const [medicacion, setMedicacion] = useState<string | null>(null);
    const [sameProgram, setSameProgram] = useState<boolean>(true);
    const [derivacionNombres, setDerivacionNombres] = useState<string[] | null>(null);
    const [motivoDerivacion, setMotivoDerivacion] = useState<string | null>(null);
    const [capturadaPor, setCapturadaPor] = useState<string | null>(null);

    useEffect(() => {
        setParsedSocioId(Number(socioId));
        setParsedBFormId(bFormId ? Number(bFormId) : undefined);
    }, []);

    useEffect(() => {
        if (parsedBFormId !== undefined && parsedBFormId !== null) {
            dispatch(showBFormRequest(parsedBFormId.toString()));
        }
        if (parsedSocioId !== undefined && parsedSocioId !== null) {
            dispatch(showSocioRequest(parsedSocioId.toString()));
        }
        dispatch(indexProgramasRequest({ socio_id: undefined, inactivos: undefined }));
    }, [parsedBFormId, parsedSocioId]);

    useEffect(() => {
        if (form.showSuccess) {
            setFechaIngresoCentro(form.data?.fecha_ingreso_centro ?? null);
            setFechaDerivacion(form.data?.fecha_derivacion ?? null);
            setInscritoRnpd(form.data?.inscrito_rnpd ?? null);
            setProgramaNombre(form.data?.programa_nombre ?? null);
            setMedicoPsiquiatra(form.data?.medico_psiquiatra ?? null);
            setPsicoterapeuta(form.data?.psicoterapeuta ?? null);
            setMedicacion(form.data?.medicacion ?? null);
            setSameProgram(form.data?.same_program ?? true);
            setDerivacionNombres(form.data?.derivacion_nombres ?? null);
            setMotivoDerivacion(form.data?.motivo_derivacion ?? null);
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
            navigate(`/sia/socios/${socioId}?tab=forms&form=1`);
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
            navigate(`/sia/socios/${socioId}?tab=forms&form=1`);
        }
    }, [form.updateSuccess]);

    useEffect(() => {
        if (sameProgram !== null && sameProgram !== undefined) {
            if (sameProgram) {
                setDerivacionNombres(null);
                setMotivoDerivacion(null);
            }
        }
    }, [sameProgram])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const body: BFormBody = {
            fecha_ingreso_centro: fechaIngresoCentro,
            fecha_derivacion: fechaDerivacion,
            inscrito_rnpd: inscritoRnpd,
            programa_nombre: programaNombre ?? '',
            medico_psiquiatra: medicoPsiquiatra ?? '',
            psicoterapeuta: psicoterapeuta ?? '',
            medicacion: medicacion ?? '',
            same_program: sameProgram,
            derivacion_nombres: derivacionNombres ?? [],
            motivo_derivacion: motivoDerivacion ?? '',
            capturada_por: capturadaPor ?? '',
            socio_id: parsedSocioId ?? 0,
        }

        if (parsedBFormId !== undefined && parsedBFormId !== null) {
            //  UPDATE
            var params: UpdateBFormParams = {
                id: parsedBFormId.toString(),
                body: body,
            };

            dispatch(updateBFormRequest(params));
        } else {
            //  STORE
            dispatch(storeBFormRequest(body));
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
                <span className="font-semibold text-xl">{socioForms.at(1)?.label}</span>
                <span className="bg-gray-100 text-gray-500 border-gray-200 border-1.5 text-sm p-2 rounded-xl">{parsedBFormId ? `B-${parsedBFormId}` : 'CREACIÓN'}</span>
            </div>
            <div className="w-full flex flex-col gap-4">
                <div className="w-full grid grid-cols-3 gap-4">
                    <Input
                        isDisabled
                        label="Fecha de nacimiento"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={`${socio.data?.fecha_nacimiento ?? 'SF'}`}
                    />
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
                        label="Con BPS"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={socio.data?.con_bps ? 'Si' : 'No'}
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
                    <Input
                        isDisabled
                        label="Contacto"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={`${socio.data?.contacto ?? 'SC'}`}
                    />
                    <Input
                        isDisabled
                        label="Fecha de ingreso al centro"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={`${socio.data?.fecha_ingreso ?? 'SF'}`}
                    />
                </div>
                <Divider className="my-4" />
                <div className="w-full grid grid-cols-3 gap-4">
                    <Input
                        type="date"
                        label="Fecha derivación"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={fechaDerivacion ?? ''}
                        onChange={(e) => {
                            setFechaDerivacion(e.target.value);
                        }}
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
                                placeholder="Programa"
                                label="Programa"
                                labelPlacement="outside-left"
                                selectedKey={programaNombre}
                                defaultItems={programas.data ?? []}
                                classNames={commonLeftLabelClassNames}
                                className="w-full font-medium pl-2"
                                onSelectionChange={(key) => {
                                    if (key) setProgramaNombre(key.toString());
                                }}
                            >
                                {(option) => (
                                    <AutocompleteItem key={option.id} textValue={option.nombre}>{option.nombre}</AutocompleteItem>
                                )}
                            </Autocomplete>
                    }
                </div>
                <div className="w-full grid grid-cols-2 gap-4">
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
                </div>
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
                <div className="w-full grid grid-cols-2 gap-4">
                    <Select
                        required
                        label="Se mantiene en el programa de pertenencia"
                        labelPlacement="outside-left"
                        value={YNParse(sameProgram)}
                        selectedKeys={YNParse(sameProgram)}
                        onChange={(e) => {
                            setSameProgram(BoolParse(e.target.value))
                        }}
                        className="font-medium pl-2"
                        classNames={commonLeftLabelClassNames}
                    >
                        {YNCombo.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
                    {
                        sameProgram ? <></> :
                            <Select
                                label="Programa/s a los que se deriva"
                                labelPlacement="outside-left"
                                selectionMode="multiple"
                                selectedKeys={new Set(derivacionNombres)}
                                onSelectionChange={(keys) => {
                                    setDerivacionNombres(Array.from(keys) as string[]);
                                }}
                                className="font-medium pl-2 min-w-0 w-full"
                                classNames={{
                                    ...commonLeftLabelClassNames,
                                    base: "w-full min-w-0",
                                    mainWrapper: "w-full min-w-0",
                                    trigger: "w-full min-w-0 overflow-hidden",
                                    value: "w-full overflow-hidden text-ellipsis whitespace-nowrap",
                                }}
                            >
                                {(programas.data ?? []).map((item) => (
                                    <SelectItem key={item.nombre}>{item.nombre}</SelectItem>
                                ))}
                            </Select>


                    }
                    {
                        sameProgram ? <></> :
                            <Input
                                label="Motivo de derivación"
                                labelPlacement="outside-left"
                                className="font-medium"
                                classNames={commonLeftLabelClassNames}
                                value={motivoDerivacion ?? ''}
                                onChange={(e) => {
                                    setMotivoDerivacion(e.target.value);
                                }}
                            />
                    }
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
                    href={`/sur/app/#/sia/socios/${socioId}?tab=forms&form=1`}
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
        </form>
    );
};

export default BFormPage;