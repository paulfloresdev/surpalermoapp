import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store/configStore/store";
import { showSocioRequest } from "../../../store/features/socios/show/showSocioSlice";
import { Button, Card, Divider, Image, Input, Select, SelectItem, Tab, Tabs, Textarea } from "@heroui/react";
import { YNCombo } from "../../../types/combos";
import { Socio, SocioBody } from "../../../types/socios";
import DynamicFaIcon from "../../../components/DynamicFaIcon";
import { ItemState, ListState } from "../../../types/commons";
import { indexDepartamentosRequest } from "../../../store/features/departamentos/departamentosSlice";
import { indexLocalidadesRequest } from "../../../store/features/localidades/localidadesSlice";
import { Mutualista } from "../../../types/mutualistas";
import { Emergencia } from "../../../types/emergencias";
import { indexMutualistasRequest } from "../../../store/features/mutualistas/mutualistasSlice";
import { indexEmergenciasRequest } from "../../../store/features/emergencias/emergenciasSlice";
import PersonalSocioTab from "./Tabs/PersonalSocioTab";
import { initUpdateSocioForm } from "../../../store/features/forms/UpdateSocioFormSlice";

const UpdateSociosPage: React.FC = () => {
    const { socioId } = useParams();
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state: RootState) => state.showSocio as ItemState<Socio>);
    const { data: dataMutualistas, loading: loadingMutualistas, error: errorMutualistas } = useSelector((state: RootState) => state.mutualistas as ListState<Mutualista>);
    const { data: dataEmergencias, loading: loadingEmergencias, error: errorEmergencias } = useSelector((state: RootState) => state.emergencias as ListState<Emergencia>);


    const [nombre, setNombre] = useState<string | undefined>();
    const [segundoNombre, setSegundoNombre] = useState<string | undefined>();
    const [apellidoPaterno, setApellidoPaterno] = useState<string | undefined>();
    const [apellidoMaterno, setApellidoMaterno] = useState<string | undefined>();
    const [dni, setDni] = useState<string | undefined>();
    const [dniExpiracion, setDniExpiracion] = useState<string | undefined>();
    const [calle, setCalle] = useState<string | undefined>();
    const [numero, setNumero] = useState<string | undefined>();
    const [apto, setApto] = useState<string | undefined>();
    const [barrio, setBarrio] = useState<string | undefined>();
    const [telefono, setTelefono] = useState<string | undefined>();
    const [celular, setCelular] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [sexo, setSexo] = useState<string | undefined>();
    const [fechaNacimiento, setFechaNacimiento] = useState<string | undefined>();
    const [observaciones, setObservaciones] = useState<string | undefined>();
    const [fechaIngreso, setFechaIngreso] = useState<string | undefined>();
    const [trabajo, setTrabajo] = useState<string | undefined>();
    const [fechaUltimoTrabajo, setFechaUltimoTrabajo] = useState<string | undefined>();
    const [pension, setPension] = useState<string | undefined>();
    const [tareas, setTareas] = useState<string | undefined>();
    const [estudios, setEstudios] = useState<string | undefined>();
    const [ultimoAprobado, setUltimoAprobado] = useState<string | undefined>();
    const [nucleoFamiliar, setNucleoFamiliar] = useState<string | undefined>();
    const [contacto, setContacto] = useState<string | undefined>();
    const [extraFamiliar, setExtraFamiliar] = useState<string | undefined>();
    const [telefonoNucleo, setTelefonoNucleo] = useState<string | undefined>();
    const [cursos, setCursos] = useState<string | undefined>();
    const [ultimoCurso, setUltimoCurso] = useState<string | undefined>();
    const [derivado, setDerivado] = useState<string | undefined>();
    const [anterior, setAnterior] = useState<string | undefined>();
    const [actual, setActual] = useState<string | undefined>();
    const [nroiae, setNroiae] = useState<string | undefined>();
    const [antecedentesMedicos, setAntecedentesMedicos] = useState<string | undefined>();
    const [antecedentesFamiliar, setAntecedentesFamiliar] = useState<string | undefined>();
    const [antecedentesPsiq, setAntecedentesPsiq] = useState<string | undefined>();
    const [diagnostico, setDiagnostico] = useState<string | undefined>();
    const [medicacion, setMedicacion] = useState<string | undefined>();
    const [internaciones, setInternaciones] = useState<string | undefined>();
    const [carnetAsistencia, setCarnetAsistencia] = useState<string | undefined>();
    const [anioEstudio, setAnioEstudio] = useState<string | undefined>();
    const [obsPension, setObsPension] = useState<string | undefined>();
    const [activo, setActivo] = useState<string | undefined>();
    const [fechaBaja, setFechaBaja] = useState<string | undefined>();
    const [conBps, setConBps] = useState<string | undefined>();
    const [convenioMixto, setConvenioMixto] = useState<string | undefined>();
    const [fallecido, setFallecido] = useState<string | undefined>();
    const [departamentoId, setDepartamentoId] = useState<number | undefined>();
    const [localidadId, setLocalidadId] = useState<number | undefined>();
    const [mutualistaId, setMutualistaId] = useState<number | undefined>();
    const [mutualistaConvenioId, setMutualistaConvenioId] = useState<number | undefined>();
    const [emergenciaId, setEmergenciaId] = useState<number | undefined>();


    useEffect(() => {
        dispatch(showSocioRequest(socioId ?? ""));
        dispatch(indexDepartamentosRequest());
        dispatch(indexLocalidadesRequest());
        dispatch(indexMutualistasRequest());
        dispatch(indexEmergenciasRequest());
    }, [])

    useEffect(() => {
        if (data != null) {
            dispatch(initUpdateSocioForm(data as SocioBody));
        }
    }, [data]);

    if (loading) {
        return (
            <div>
                Cargando...
            </div>
        )
    }

    if (!data) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getEdad = (): string => {
        var birthday = new Date(data.fecha_nacimiento ?? '')

        if (isNaN(birthday.getTime())) {
            console.error("Fecha de nacimiento inválida.");
            return 'undefined';
        }

        var today = new Date()

        let age = today.getFullYear() - birthday.getFullYear();

        // 4. Ajustar la edad si aún no ha cumplido años este año
        const currentMonth = today.getMonth();
        const birthdayMonth = birthday.getMonth();

        // Comprobar si el mes actual es menor que el mes de nacimiento
        if (currentMonth < birthdayMonth) {
            age--;
        }
        // O si es el mismo mes, comprobar si el día actual es menor que el día de nacimiento
        else if (currentMonth === birthdayMonth) {
            if (today.getDate() < birthday.getDate()) {
                age--;
            }
        }

        return age.toString();
    }

    return (
        <div className="w-full flex-col gap-2">
            <div className="w-full flex flex-row justify-start gap-4  mb-4">
                <div className="flex flex-col gap-4">
                    <div className="w-32 h-32 bg-gray-200 rounded-xl flex flex-col justify-center items-center">
                        {
                            data.image_path ?
                                <Image
                                    src={data.image_path}
                                />
                                :
                                <DynamicFaIcon name='FaUser' />
                        }
                    </div>
                    <Button
                        size="sm"
                        className="bg-black text-white"
                        startContent={<DynamicFaIcon name={'FaUpload'} className="text-white" size={14} />}
                    >Subir foto</Button>
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-1">
                            <span className="font-medium">{`${data.apellido_paterno} ${data.apellido_materno} ${data.nombre} ${data.segundo_nombre}`}</span>
                            <span className="text-gray-500">{`(${data.dni})`}</span>
                        </div>
                        <span>{`Edad: ${getEdad()}`}</span>
                        <span>{`Celular: ${data.celular}`}</span>
                        <span>{`Email: ${data.email}`}</span>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Button
                            size="sm"
                            className=" bg-emerald-500 text-white"
                            startContent={<DynamicFaIcon name={'FaSave'} className="text-white" size={14} />}
                        >Guardar cambios</Button>
                        <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                        ><DynamicFaIcon name={'FaTrash'} className="text-red-600" size={14} /></Button>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="w-full flex flex-col mt-4">
                <Tabs>
                    <Tab key='personal-data' title='Datos Personales' className="h-full">
                        <PersonalSocioTab />
                    </Tab>
                    <Tab key='familiar-data' title='Datos Familiares' className="h-full">
                        <Card className="w-full flex flex-row justify-between gap-12 p-8">
                            <Input
                                size="sm"
                                placeholder="Teléfono Persona de Contacto"
                                label="Teléfono Persona de Contacto"
                                labelPlacement="outside"
                                value={telefonoNucleo}
                                onChange={(e) => setTelefonoNucleo(e.target.value)}
                            />
                            <Textarea
                                size="sm"
                                placeholder="Contacto Extra Familiar"
                                label="Contacto Extra Familiar"
                                labelPlacement="outside"
                                value={extraFamiliar}
                                onChange={(e) => setExtraFamiliar(e.target.value)}
                            />
                            <Textarea
                                size="sm"
                                placeholder="Nucleo Familiar"
                                label="Nucleo Familiar"
                                labelPlacement="outside"
                                value={nucleoFamiliar}
                                onChange={(e) => setNucleoFamiliar(e.target.value)}
                            />
                        </Card>
                    </Tab>
                    <Tab key='medical-data' title='Datos Médicos' className="h-full">
                        <Card className="w-full flex flex-row justify-between gap-12 p-8">
                            <div className="w-full flex flex-col gap-6">
                                <Textarea
                                    size="sm"
                                    placeholder="Dervidado por"
                                    label="Derividado por"
                                    labelPlacement="outside"
                                    value={derivado}
                                    onChange={(e) => setDerivado(e.target.value)}
                                />
                                <Textarea
                                    size="sm"
                                    placeholder="Diagnostico"
                                    label="Diagnostico"
                                    labelPlacement="outside"
                                    value={diagnostico}
                                    onChange={(e) => setDiagnostico(e.target.value)}
                                />
                                <Textarea
                                    size="sm"
                                    placeholder="Medicación"
                                    label="Medicación"
                                    labelPlacement="outside"
                                    value={medicacion}
                                    onChange={(e) => setMedicacion(e.target.value)}
                                />
                                <Textarea
                                    size="sm"
                                    placeholder="Antecedentes Médicos"
                                    label="Antecedentes Médicos"
                                    labelPlacement="outside"
                                    value={antecedentesMedicos}
                                    onChange={(e) => setAntecedentesMedicos(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-6">
                                <Textarea
                                    size="sm"
                                    placeholder="Antecedentes Familiares"
                                    label="Antecedentes Familiares"
                                    labelPlacement="outside"
                                    value={antecedentesFamiliar}
                                    onChange={(e) => setAntecedentesFamiliar(e.target.value)}
                                />
                                <Textarea
                                    size="sm"
                                    placeholder="Antecedentes Psiquiátricos"
                                    label="Antecedentes Psiquiátricos"
                                    labelPlacement="outside"
                                    value={antecedentesPsiq}
                                    onChange={(e) => setAntecedentesPsiq(e.target.value)}
                                />
                                <Select
                                    required
                                    size="sm"
                                    placeholder="Carnet de Asistencia"
                                    label="Carnet de Asistencia"
                                    labelPlacement="outside"
                                    value={carnetAsistencia}
                                    selectedKeys={carnetAsistencia}
                                    onChange={(e) => setCarnetAsistencia(e.target.value)}
                                >
                                    {YNCombo.map((option) => (
                                        <SelectItem key={option.key}>{option.label}</SelectItem>
                                    ))}
                                </Select>
                                <>
                                    {
                                        loadingMutualistas ?
                                            <div>Cargando...</div>
                                            : errorMutualistas ?
                                                <div>{errorMutualistas}</div>
                                                :
                                                <Select
                                                    required
                                                    size="sm"
                                                    placeholder="Mutualista Socio"
                                                    label="Mutualista Socio"
                                                    labelPlacement="outside"
                                                    value={mutualistaId}
                                                    selectedKeys={mutualistaId?.toString()}
                                                    onChange={(e) => setMutualistaId(parseInt(e.target.value))}
                                                >
                                                    {dataMutualistas && dataMutualistas.map((option) => (
                                                        <SelectItem key={option.id}>{option.nombre}</SelectItem>
                                                    ))}
                                                </Select>
                                    }
                                </>
                                <>
                                    {
                                        loadingEmergencias ?
                                            <div>Cargando...</div>
                                            : errorEmergencias ?
                                                <div>{errorEmergencias}</div>
                                                :
                                                <Select
                                                    required
                                                    size="sm"
                                                    placeholder="Emergencia"
                                                    label="Emergencia"
                                                    labelPlacement="outside"
                                                    value={emergenciaId}
                                                    selectedKeys={emergenciaId?.toString()}
                                                    onChange={(e) => setEmergenciaId(parseInt(e.target.value))}
                                                >
                                                    {dataEmergencias && dataEmergencias.map((option) => (
                                                        <SelectItem key={option.id}>{option.nombre}</SelectItem>
                                                    ))}
                                                </Select>
                                    }
                                </>
                            </div>
                            <div className="w-full flex flex-col gap-6">
                                <Select
                                    required
                                    size="sm"
                                    placeholder="Convenio Mixto"
                                    label="Convenio Mixto"
                                    labelPlacement="outside"
                                    value={convenioMixto}
                                    selectedKeys={convenioMixto}
                                    onChange={(e) => setConvenioMixto(e.target.value)}
                                >
                                    {YNCombo.map((option) => (
                                        <SelectItem key={option.key}>{option.label}</SelectItem>
                                    ))}
                                </Select>
                                <>
                                    {
                                        loadingMutualistas ?
                                            <div>Cargando...</div>
                                            : errorMutualistas ?
                                                <div>{errorMutualistas}</div>
                                                :
                                                <Select
                                                    required
                                                    size="sm"
                                                    placeholder="Mutualista Convenio"
                                                    label="Mutualista Convenio"
                                                    labelPlacement="outside"
                                                    value={mutualistaConvenioId}
                                                    selectedKeys={mutualistaConvenioId?.toString()}
                                                    onChange={(e) => setMutualistaConvenioId(parseInt(e.target.value))}
                                                >
                                                    {dataMutualistas && dataMutualistas.map((option) => (
                                                        <SelectItem key={option.id}>{option.nombre}</SelectItem>
                                                    ))}
                                                </Select>
                                    }
                                </>
                                <Input
                                    size="sm"
                                    placeholder="Internaciones"
                                    label="Internaciones"
                                    labelPlacement="outside"
                                    value={internaciones}
                                    onChange={(e) => setInternaciones(e.target.value)}
                                />
                                <Input
                                    size="sm"
                                    placeholder="Nro. IAE"
                                    label="Nro. IAE"
                                    labelPlacement="outside"
                                    value={nroiae}
                                    onChange={(e) => setNroiae(e.target.value)}
                                />
                            </div>
                        </Card>
                    </Tab>
                    <Tab key='education-data' title='Datos educativos' className="h-full">
                        <Card className="w-full flex flex-row justify-between gap-12 p-8">
                            <div className="w-full flex flex-col gap-6">
                                <Textarea
                                    size="sm"
                                    placeholder="Estudios Realizados"
                                    label="Estudios Realizados"
                                    labelPlacement="outside"
                                    value={estudios}
                                    onChange={(e) => setEstudios(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-6">
                                <Textarea
                                    size="sm"
                                    placeholder="Último Aprobado"
                                    label="Último Aprobado"
                                    labelPlacement="outside"
                                    value={ultimoAprobado}
                                    onChange={(e) => setUltimoAprobado(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-6">
                                <Textarea
                                    size="sm"
                                    placeholder="Cursos"
                                    label="Cursos"
                                    labelPlacement="outside"
                                    value={cursos}
                                    onChange={(e) => setCursos(e.target.value)}
                                />
                                <Input
                                    size="sm"
                                    placeholder="Último Curso"
                                    label="Último Curso"
                                    labelPlacement="outside"
                                    type="date"
                                    value={ultimoCurso}
                                    onChange={(e) => setUltimoCurso(e.target.value)}
                                />
                            </div>
                        </Card>
                    </Tab>
                    <Tab key='job-data' title='Datos Laborales' className="h-full">
                        <Card className="w-full flex flex-row justify-between gap-12 p-8">
                            <div className="w-full flex flex-col gap-6">
                                <Select
                                    required
                                    size="sm"
                                    placeholder="Trabajo"
                                    label="Trabajo"
                                    labelPlacement="outside"
                                    value={trabajo}
                                    selectedKeys={trabajo}
                                    onChange={(e) => setTrabajo(e.target.value)}
                                >
                                    {YNCombo.map((option) => (
                                        <SelectItem key={option.key}>{option.label}</SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="w-full flex flex-col gap-6">
                                <Input
                                    size="sm"
                                    placeholder="Último Trabajo"
                                    label="Último Trabajo"
                                    labelPlacement="outside"
                                    type="date"
                                    value={fechaUltimoTrabajo}
                                    onChange={(e) => setFechaUltimoTrabajo(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-6">
                                <Textarea
                                    size="sm"
                                    placeholder="Tareas"
                                    label="Tareas"
                                    labelPlacement="outside"
                                    value={tareas}
                                    onChange={(e) => setTareas(e.target.value)}
                                />
                            </div>
                        </Card>
                    </Tab>
                    <Tab key='inscriptions' title='Inscripciones' className="h-full">
                        <Card className="w-full flex flex-row justify-between gap-12 p-8">

                        </Card>
                    </Tab>
                    <Tab key='groups' title='Grupos' className="h-full">

                    </Tab>
                    <Tab key='tickets' title='Tickets' className="h-full">

                    </Tab>
                    <Tab key='notes' title='Observación' className="h-full">

                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default UpdateSociosPage;