import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/configStore/store";
import { ItemState } from "../../types/commons";
import { DForm, DFormBody, UpdateDFormParams } from "../../types/dform";
import { Socio } from "../../types/socios";
import { showDFormRequest, storeDFormRequest, updateDFormRequest } from "../../store/features/forms/DForm/DFormSlice";
import { showSocioRequest } from "../../store/features/socios/sociosSlice";
import { addToast, Button, Divider, Input, Link, Select, SelectItem, Textarea } from "@heroui/react";
import { DFormTipo, socioForms } from "../../types/combos";
import { commonLeftLabelClassNames } from "./AFormPage";

const DFormPage: React.FC = () => {
    const { socioId, dFormId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useSelector((state: RootState) => state.dForm as ItemState<DForm>);
    const socio = useSelector((state: RootState) => state.socios as ItemState<Socio>);

    const [parsedSocioId, setParsedSocioId] = useState<number | undefined>(undefined);
    const [parsedDFormId, setParsedDFormId] = useState<number | undefined>(undefined);

    const [fecha, setFecha] = useState<string | null>(null);
    const [dirigido, setDirigido] = useState<string | null>(null);
    const [institucion, setInstitucion] = useState<string | null>(null);
    const [referente, setReferente] = useState<string | null>(null);
    const [medicoTratante, setMedicoTratante] = useState<string | null>(null);
    const [ci, setCi] = useState<string | null>(null);
    const [inicioTratamiento, setInicioTratamiento] = useState<string | null>(null);
    const [frecuencia, setFrecuencia] = useState<string | null>(null);
    const [tipo, setTipo] = useState<number | null>(null);
    const [psicoterapeuta, setPsicoterapeuta] = useState<string | null>(null);
    const [trabajoUsuario, setTrabajoUsuario] = useState<string | null>(null);
    const [trabajoFamilia, setTrabajoFamilia] = useState<string | null>(null);

    const [checkTipo, setCheckTipo] = useState<boolean>(false);
    const [checkUsuario, setCheckUsuario] = useState<boolean>(false);
    const [checkFamilia, setCheckFamilia] = useState<boolean>(false);

    useEffect(() => {
        setParsedSocioId(Number(socioId));
        setParsedDFormId(dFormId ? Number(dFormId) : undefined);
    }, []);

    useEffect(() => {
        if (parsedDFormId !== undefined && parsedDFormId !== null) {
            dispatch(showDFormRequest(parsedDFormId.toString()));
        }
        if (parsedSocioId !== undefined && parsedSocioId !== null) {
            dispatch(showSocioRequest(parsedSocioId.toString()));
        }
    }, [parsedDFormId, parsedSocioId]);

    useEffect(() => {
        if (form.showSuccess) {
            setFecha(form.data?.fecha ?? null);
            setDirigido(form.data?.dirigido ?? null);
            setInstitucion(form.data?.institucion ?? null);
            setReferente(form.data?.referente ?? null);
            setMedicoTratante(form.data?.medico_tratante ?? null);
            setCi(form.data?.ci ?? null);
            setInicioTratamiento(form.data?.inicio_tratamiento ?? null);
            setFrecuencia(form.data?.frecuencia ?? null);
            setTipo(form.data?.tipo ?? null);
            setPsicoterapeuta(form.data?.psicoterapeuta ?? null);
            setTrabajoUsuario(form.data?.trabajo_usuario ?? null);
            setTrabajoFamilia(form.data?.trabajo_familia ?? null);
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
            navigate(`/sia/socios/${socioId}?tab=forms&form=3`);
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
            navigate(`/sia/socios/${socioId}?tab=forms&form=3`);
        }
    }, [form.updateSuccess]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //e.stopPropagation();

        var ckTipo = tipo == null || tipo == 0;
        var ckUsuario = trabajoUsuario == null || trabajoUsuario == '';
        var ckFamilia = trabajoFamilia == null || trabajoFamilia == '';

        setCheckTipo(ckTipo);
        setCheckUsuario(ckUsuario);
        setCheckFamilia(ckFamilia);

        console.log(ckTipo);

        if (ckTipo || ckUsuario || ckFamilia) {
            console.log('entre');
            return;
        }

        const body: DFormBody = {
            fecha: fecha ?? '',
            dirigido: dirigido ?? '',
            institucion: institucion ?? '',
            referente: referente ?? '',
            medico_tratante: medicoTratante ?? '',
            ci: ci ?? '',
            inicio_tratamiento: inicioTratamiento ?? '',
            frecuencia: frecuencia ?? '',
            tipo: tipo ?? 0,
            psicoterapeuta: psicoterapeuta ?? '',
            trabajo_usuario: trabajoUsuario ?? '',
            trabajo_familia: trabajoFamilia ?? '',
            socio_id: parsedSocioId ?? 0,
        }

        if (parsedDFormId !== undefined && parsedDFormId !== null) {
            //  UPDATE
            var params: UpdateDFormParams = {
                id: parsedDFormId.toString(),
                body: body,
            };

            dispatch(updateDFormRequest(params));
        } else {
            //  STORE
            dispatch(storeDFormRequest(body));
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
                <span className="font-semibold text-xl">{socioForms.at(3)?.label}</span>
                <span className="bg-gray-100 text-gray-500 border-gray-200 border-1.5 text-sm p-2 rounded-xl">{parsedDFormId ? `D-${parsedDFormId}` : 'CREACIÓN'}</span>
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
                        type="date"
                        label="Fecha"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={fecha ?? ''}
                        onChange={(e) => {
                            setFecha(e.target.value);
                        }}
                    />
                    <Input
                        label="Dirigido a"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={dirigido ?? ''}
                        onChange={(e) => {
                            setDirigido(e.target.value);
                        }}
                    />
                    <Input
                        label="Institución"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={institucion ?? ''}
                        onChange={(e) => {
                            setInstitucion(e.target.value);
                        }}
                    />
                    <Input
                        label="Referente institucional"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={referente ?? ''}
                        onChange={(e) => {
                            setReferente(e.target.value);
                        }}
                    />
                    <Input
                        label="Médico tratante"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={medicoTratante ?? ''}
                        onChange={(e) => {
                            setMedicoTratante(e.target.value);
                        }}
                    />
                    <Input
                        label="C.I."
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={ci ?? ''}
                        onChange={(e) => {
                            setCi(e.target.value);
                        }}
                    />
                    <Input
                        type="date"
                        label="Inicio de tratamiento"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={inicioTratamiento ?? ''}
                        onChange={(e) => {
                            setInicioTratamiento(e.target.value);
                        }}
                    />
                    <Input
                        label="Frecuencia"
                        labelPlacement="outside-left"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={frecuencia ?? ''}
                        onChange={(e) => {
                            setFrecuencia(e.target.value);
                        }}
                    />
                </div>
                <Divider className="my-4" />
                <div className="w-full grid grid-cols-3 gap-4">
                    <Select
                        isInvalid={checkTipo}
                        label="Tipo"
                        labelPlacement="outside-left"
                        value={tipo?.toString()}
                        selectedKeys={tipo?.toString()}
                        onChange={(e) => {
                            setTipo(Number(e.target.value));
                            if (checkTipo) {
                                setCheckTipo(false);
                            }
                        }}
                        className="font-medium pl-2"
                        classNames={commonLeftLabelClassNames}
                    >
                        {DFormTipo.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                        ))}
                    </Select>
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
                <div className="w-full grid grid-cols-2 gap-4">
                    <Textarea
                        isInvalid={checkUsuario}
                        label="Trabajo con el usuario"
                        labelPlacement="inside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={trabajoUsuario ?? ''}
                        onChange={(e) => {
                            setTrabajoUsuario(e.target.value);
                            if (checkUsuario) {
                                setCheckUsuario(false);
                            }
                        }}
                    />
                    <Textarea
                        isInvalid={checkFamilia}
                        label="Trabajo con la familia"
                        labelPlacement="inside"
                        className="font-medium"
                        classNames={commonLeftLabelClassNames}
                        value={trabajoFamilia ?? ''}
                        onChange={(e) => {
                            setTrabajoFamilia(e.target.value);
                            if (checkFamilia) {
                                setCheckFamilia(false);
                            }
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
                    href={`/sia/socios/${socioId}?tab=forms&form=3`}
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

export default DFormPage;