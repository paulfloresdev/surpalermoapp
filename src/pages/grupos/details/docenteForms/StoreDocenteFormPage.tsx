import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../store/configStore/store";
import { ItemState, PaginatedState } from "../../../../types/commons";
import { DocenteForm, DocenteFormBody } from "../../../../types/docenteForms";
import { addToast, Autocomplete, AutocompleteItem, Button, Card, Divider, Input, Link, Textarea } from "@heroui/react";
import { DocenteGrupoPivot, IndexDocenteGrupoPivotsParams } from "../../../../types/docenteGrupoPivots";
import { Coordinador, IndexCoordinadoresParams } from "../../../../types/coordinadores";
import { storeDocenteFormRequest } from "../../../../store/features/docenteForms/docenteFormsSlice";
import { indexCoordinadoresRequest } from "../../../../store/features/coordinadores/coordinadoresSlice";
import { commonLeftLabelClassNames } from "../../../socios/update/fichas/AFormPage";
import { indexDocenteGrupoPivotsRequest } from "../../../../store/features/docenteGrupoPivots/docenteGrupoPivotsSlice";
import EvaluationRow from "../../../socios/update/fichas/fichas-components/EvaluationRow";

const StoreDocenteFormPage: React.FC = () => {
    const { grupoId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useSelector((state: RootState) => state.docenteForms as ItemState<DocenteForm>);

    const docentes = useSelector((state: RootState) => state.docenteGrupoPivots as PaginatedState<DocenteGrupoPivot>);
    const coordinadores = useSelector((state: RootState) => state.coordinadores as PaginatedState<Coordinador>);

    const [dateOf, setDateOf] = useState<string | undefined>(undefined);
    const [a, setA] = useState<number | null>(null);
    const [b, setB] = useState<number | null>(null);
    const [c, setC] = useState<string | undefined>(undefined);
    const [d1, setD1] = useState<number | null>(null);
    const [d2, setD2] = useState<number | null>(null);
    const [d3, setD3] = useState<number | null>(null);
    const [d4, setD4] = useState<number | null>(null);
    const [d5, setD5] = useState<number | null>(null);
    const [d6, setD6] = useState<number | null>(null);
    const [d7, setD7] = useState<number | null>(null);
    const [d8, setD8] = useState<number | null>(null);
    const [d9, setD9] = useState<number | null>(null);
    const [d10, setD10] = useState<number | null>(null);
    const [d11, setD11] = useState<number | null>(null);
    const [d12, setD12] = useState<number | null>(null);
    const [d13, setD13] = useState<number | null>(null);
    const [d14, setD14] = useState<number | null>(null);
    const [d15, setD15] = useState<number | null>(null);
    const [d16, setD16] = useState<number | null>(null);
    const [e, setE] = useState<string | undefined>(undefined);
    const [docenteId, setDocenteId] = useState<undefined | string>(undefined);
    const [coordinadorId, setCoordinadorId] = useState<undefined | string>(undefined);

    useEffect(() => {
        const docentesParams: IndexDocenteGrupoPivotsParams = {
            page: 1,
            per_page: 999999999,
            grupo_id: parseInt(grupoId ?? '0'),
        }

        const coordinadoresParams: IndexCoordinadoresParams = {
            page: 1,
            per_page: 999999999,
            grupo_id: parseInt(grupoId ?? '0'),
        }

        dispatch(indexDocenteGrupoPivotsRequest(docentesParams));
        dispatch(indexCoordinadoresRequest(coordinadoresParams));
    }, []);

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
            navigate(`/sia/mantenimiento/grupos/${grupoId}/detalle?tab=forms-docente`);
        }
    }, [form.storeSuccess]);

    const onSubmit = (x: React.FormEvent<HTMLFormElement>) => {
        x.preventDefault();
        x.stopPropagation();

        const body: DocenteFormBody = {
            date_of: dateOf ?? '',
            a: a ?? 0,
            b: b ?? 0,
            c: c ?? '',
            d_1: d1 ?? 0,
            d_2: d2 ?? 0,
            d_3: d3 ?? 0,
            d_4: d4 ?? 0,
            d_5: d5 ?? 0,
            d_6: d6 ?? 0,
            d_7: d7 ?? 0,
            d_8: d8 ?? 0,
            d_9: d9 ?? 0,
            d_10: d10 ?? 0,
            d_11: d11 ?? 0,
            d_12: d12 ?? 0,
            d_13: d13 ?? 0,
            d_14: d14 ?? 0,
            d_15: d15 ?? 0,
            d_16: d16 ?? 0,
            e: e ?? '',
            grupo_id: parseInt(grupoId ?? '0'),
            docente_id: docenteId ? parseInt(docenteId) : 0,
            coordinador_id: coordinadorId ? parseInt(coordinadorId) : 0,
        }

        dispatch(storeDocenteFormRequest(body));
    }

    if (form.loading || docentes.loading || coordinadores.loading) {
        return (
            <span>Cargando...</span>
        )
    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-8">
            <div className="flex flex-row items-center gap-4">
                <span className="font-semibold text-xl">FICHA DE EVALUACIÓN DOCENTE</span>
                <span className="bg-gray-100 text-gray-500 border-gray-200 border-1.5 text-sm p-2 rounded-xl">CREACIÓN</span>
            </div>
            <div className="w-full grid grid-cols-3 gap-4">
                <Input
                    required
                    type="date"
                    label="Fecha*"
                    labelPlacement="outside"
                    className="font-medium"
                    classNames={commonLeftLabelClassNames}
                    value={dateOf ?? ''}
                    onChange={(e) => {
                        setDateOf(e.target.value);
                    }}
                />
                <Autocomplete
                    required
                    placeholder="Docente"
                    label="Docente*"
                    labelPlacement="outside"
                    value={docenteId}
                    defaultItems={docentes.data?.data ?? []}
                    classNames={commonLeftLabelClassNames}
                    className="w-full font-medium pl-2"
                    onSelectionChange={(key) => {
                        if (key) setDocenteId(key.toString());
                    }}
                >
                    {(option) => (
                        <AutocompleteItem key={option.docente.id} textValue={`${option.docente.nombre} ${option.docente.apellido}`}>{`${option.docente.nombre} ${option.docente.apellido}`}</AutocompleteItem>
                    )}
                </Autocomplete>
                <Autocomplete
                    required
                    placeholder="Coordinador"
                    label="Coordinador*"
                    labelPlacement="outside"
                    value={coordinadorId}
                    defaultItems={coordinadores.data?.data ?? []}
                    classNames={commonLeftLabelClassNames}
                    className="w-full font-medium pl-2"
                    onSelectionChange={(key) => {
                        if (key) setCoordinadorId(key.toString());
                    }}
                >
                    {(option) => (
                        <AutocompleteItem key={option.docente.id} textValue={`${option.docente.nombre} ${option.docente.apellido}`}>{`${option.docente.nombre} ${option.docente.apellido}`}</AutocompleteItem>
                    )}
                </Autocomplete>
            </div>

            <Card className="w-full grid grid-cols-6 gap-2 p-2 font-medium text-center">
                <span className="font-normal">Resultados:</span>
                <span>5 MUY ADECUADO</span>
                <span>4 ADECUADO</span>
                <span>3 ADECUACIÓN REGULAR</span>
                <span>2 INADECUADO</span>
                <span>1 MUY INADECUADO</span>
            </Card>

            <div className="w-full flex flex-col gap-4">
                <Divider className="my-4" />
                <EvaluationRow
                    required={true}
                    label={'A. GRADO DE CUMPLIMIENTO DEL PLAN ELABORADO POR EL EQUIPO'}
                    value={a ?? null}
                    onChange={setA}
                    className="font-semibold"
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'B. GRADO DE CUMPLIMIENTO DEL PLAN DE INTERVENCIÓN INDIVIDUAL CON LOS USUAIROS'}
                    value={b ?? null}
                    onChange={setB}
                    className="font-semibold"
                    max={5}
                />
                <div className="flex flex-col gap-2">
                    <span className="font-semibold">C. BREVE DESCRIPCIÓN DE LAS METAS Y ACCIONES QUE DESARROLLA</span>
                    <Textarea
                        size="sm"
                        placeholder="Decripción"
                        labelPlacement="outside"
                        className="font-medium text-xl"
                        rows={2}
                        value={c ?? ''}
                        onChange={(e) => setC(e.target.value)}
                    />
                </div>
                <span className="font-semibold">D. GRADO DE DESEMPEÑO</span>
                <EvaluationRow
                    required={true}
                    label={'1. CUMPLIMIENTO CON LA TAREA'}
                    value={d1 ?? null}
                    onChange={setD1}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'2. ASISTENCIA'}
                    value={d2 ?? null}
                    onChange={setD2}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'3. PUNTUALIDAD'}
                    value={d3 ?? null}
                    onChange={setD3}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'4. ASISTENCIA A LAS REUNIONES DE EQUIPO'}
                    value={d4 ?? null}
                    onChange={setD4}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'5. EVIDENCIA COMPROMISO Y ENTUSIASMO CON LA TAREA Y EL GRUPO'}
                    value={d5 ?? null}
                    onChange={setD5}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'6. CAPACIDAD AUTOCRÍTICA'}
                    value={d6 ?? null}
                    onChange={setD6}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'7. GRADO DE ADAPTACIÓN A LA PROPUESTA INSTITUCIONAL'}
                    value={d7 ?? null}
                    onChange={setD7}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'8. DESARROLLA UN PLAN DE TRABAJO CON OBJETIVOS A EVALUAR SEGÚN CADA SITUACIÓN GRUPAL E INDIVIDUAL'}
                    value={d8 ?? null}
                    onChange={setD8}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'9. CAPACIDAD PARA COMPRENDER LA REALIDAD DEL GRUPO Y DE CADA USUARIO'}
                    value={d9 ?? null}
                    onChange={setD9}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'10. CAPACIDAD PARA INCORPORAR CAMBIOS ADECUADOS A LAS NECESIDADES DE LOS USUARIOS'}
                    value={d10 ?? null}
                    onChange={setD10}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'11. REALIZA INFORMES DE SU QUEHACER Y EVALUACIONES DEL GRUPO Y USUARIOS'}
                    value={d11 ?? null}
                    onChange={setD11}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'12. VINCULO ESTABLECIDO CON LOS USUARIOS'}
                    value={d12 ?? null}
                    onChange={setD12}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'13. LOGRA MOTIVAR A LOS USUARIOS CON LA PROPUESTA'}
                    value={d13 ?? null}
                    onChange={setD13}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'14. GRADO DE ESTIMULACIÓN DE LA PARTICIPACIÓN'}
                    value={d14 ?? null}
                    onChange={setD14}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'15. GRADO DE PARTICIPACIÓN EN LAS REUNIONES DE EQUIPO'}
                    value={d15 ?? null}
                    onChange={setD15}
                    max={5}
                />
                <EvaluationRow
                    required={true}
                    label={'16. VINCULO CON EL COORDINADOR'}
                    value={d16 ?? null}
                    onChange={setD16}
                    max={5}
                />
                <div className="flex flex-col gap-2">
                    <span className="font-semibold">E. DESARROLLE SI FRENTE A DIFICULTADES PRESENTADAS EN EL TRABAJO SE HA MANTENIDO UN INTERCAMBIO CON EL TÉCNICO Y CUAL FUE EL NIVEL DE COMPRENSIÓN DE LO SEÑALADO Y SU CAPACIDAD DE INCORPORAR LAS SUGERENCIAS</span>
                    <Textarea
                        size="sm"
                        placeholder="Desarrolle"
                        labelPlacement="outside"
                        className="font-medium text-xl"
                        rows={2}
                        value={e ?? ''}
                        onChange={(e) => setE(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-1/2 mx-auto grid grid-cols-2 gap-4">
                <Button
                    variant="solid"
                    isLoading={form.loading}
                    as={Link}
                    href={`/sur/app/#/sia/mantenimiento/grupos/${grupoId}/detalle?tab=forms-docente`}
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
}

export default StoreDocenteFormPage;