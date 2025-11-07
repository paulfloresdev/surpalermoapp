import { CrudState, Entity, Paginated, State, UpdateParams } from "./commons";
import { PaginatedItems } from "./responses";

export interface Socio extends Entity {
    nombre: string | null;
    segundo_nombre: string | null;
    apellido_paterno: string;
    apellido_materno: string | null;
    dni: string | null;
    dni_expiracion: Date | null;
    calle: string | null;
    numero: string | null;
    apto: string | null;
    barrio: string | null;
    telefono: string | null;
    celular: string | null;
    email: string | null;
    sexo: number | null;
    fecha_nacimiento: Date | null;
    image_path: string | null;
    observaciones: string | null;
    fecha_ingreso: Date | null;
    trabajo: boolean | null;
    fecha_ultimo_trabajo: Date | null;
    pension: boolean | null;
    tareas: string | null;
    estudios: string | null;
    ultimo_aprobado: string | null;
    nucleo_familiar: string | null;
    contacto: string | null;
    extra_familiar: string | null;
    telefono_nucleo: string | null;
    cursos: string | null;
    ultimo_curso: Date | null;
    derivado: string | null;
    anterior: string | null;
    actual: string | null;
    nroiae: number | null;
    antecedentes_medicos: string | null;
    antecedentes_familiar: string | null;
    antecedentes_psiq: string | null;
    diagnostico: string | null;
    medicacion: string | null;
    internaciones: number | null;
    carnet_asistencia: boolean | null;
    anio_estudio: number | null;
    obs_pension: string | null;
    activo: boolean;
    fecha_baja: Date | null;
    con_bps: boolean;
    convenio_mixto: boolean;
    fallecido: boolean;
    departamento_id: number | null;
    localidad_id: number | null;
    mutualista_id: number | null;
    mutualista_convenio_id: number | null;
    emergencia_id: number | null;
    programas?: Programa[] | null;
}

export interface SocioBody {
    nombre: string;
    segundo_nombre: string | undefined;
    apellido_paterno: string;
    apellido_materno: string | undefined;
    dni: string | undefined;
    dni_expiracion: Date | undefined;
    calle: string | undefined;
    numero: string | undefined;
    apto: string | undefined;
    barrio: string | undefined;
    telefono: string | undefined;
    celular: string | undefined;
    email: string | undefined;
    sexo: number | undefined;
    fecha_nacimiento: Date | undefined;
    observaciones: string | undefined;
    fecha_ingreso: Date | undefined;
    trabajo: boolean | undefined;
    fecha_ultimo_trabajo: Date | undefined;
    pension: boolean | undefined;
    tareas: string | undefined;
    estudios: string | undefined;
    ultimo_aprobado: string | undefined;
    nucleo_familiar: string | undefined;
    contacto: string | undefined;
    extra_familiar: string | undefined;
    telefono_nucleo: string | undefined;
    cursos: string | undefined;
    ultimo_curso: Date | undefined;
    derivado: string | undefined;
    anterior: string | undefined;
    actual: string | undefined;
    nroiae: number | undefined;
    antecedentes_medicos: string | undefined;
    antecedentes_familiar: string | undefined;
    antecedentes_psiq: string | undefined;
    diagnostico: string | undefined;
    medicacion: string | undefined;
    internaciones: number | undefined;
    carnet_asistencia: boolean | undefined;
    anio_estudio: number | undefined;
    obs_pension: string | undefined;
    activo: boolean;
    fecha_baja: Date | undefined;
    con_bps: boolean;
    convenio_mixto: boolean;
    fallecido: boolean;
    departamento_id: number | undefined;
    localidad_id: number | undefined;
    mutualista_id: number | undefined;
    mutualista_convenio_id: number | undefined;
    emergencia_id: number | undefined;
}

export interface UpdateSocioParams extends UpdateParams<SocioBody> { }

export interface SearchSociosBody extends Paginated {
    search: undefined | string;
    is_active: undefined | boolean;
}

export interface SearchSociosParams {
    page: undefined | number;
    body: SearchSociosBody;
}


