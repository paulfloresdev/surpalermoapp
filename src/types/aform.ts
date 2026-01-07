import { Entity, UpdateParams } from "./commons";

export interface AForm extends Entity {
    fecha_ingreso_vivienda: string | null;
    fecha_ingreso_centro: string | null;
    fecha_evaluacion_semestral: string;
    inscrito_rnpd: boolean | null;

    a: number;
    a_notes: string | null;

    b: number;
    b_notes: string | null;

    c: number;
    c_notes: string | null;

    d1a: number;
    d1b: number;
    d1c: number;
    d1d: number;
    d1_notes: string | null;

    d2: number;
    d2_notes: string | null;

    e1: number;
    e2: number;
    e_notes: string | null;

    f1: number;
    f2: number;
    f3: number;
    f4: number;
    f5: number;
    f_notes: string | null;

    g1: number;
    g2: number;
    g_notes: string | null;

    h: number;
    h_notes: string | null;

    i: number;
    i_notes: string | null;

    j: number;
    j_notes: string | null;

    k: number;
    k_notes: string | null;

    l: number;
    l_notes: string | null;

    m: number;
    m_notes: string | null;

    n: number;
    n_notes: string | null;

    descripcion_proyecto: string | null;
    evaluacion_proyecto: string | null;
    capturada_por: string | null;

    socio_id: number | null;

    programa_nombres: string[] | null;
}

export type AFormBody = Omit<
    AForm,
    'id' | 'created_at' | 'updated_at' | 'programa_nombres'
>;

export interface UpdateAFormParams extends UpdateParams<AFormBody> { };

export class AFormLabels {
    static readonly A = "A) CONDUCTAS DE HIGIENE PERSONAL (Baño, lavado de dientes, cambio de ropa, afeitarse, uñas)";
    static readonly B = "B) CONDUCTAS DE HIGIENE EN RELACION A LA RESIDENCIA (Frecuencia de cambios de sabanas, lavado de ropa, limpieza enceres de cocina, lavado y barrido de pisos, lavado de baños, limpieza y orden del cuarto- cama-ropero-otros)";
    static readonly C = "C) HABITOS DE SUEÑO (Hora de levantarse, hora de acostarse, siesta)";
    static readonly D = "D) PARTICIPACION EN LAS TAREAS DE LA CASA";
    static readonly D1 = "1) ACTITUD frente a las diferentes tareas:";
    static readonly D1A = "- MOTIVACION ¿le interesa la tarea?:";
    static readonly D1B = "- INICIATIVA ¿propone ideas, tareas, etc.?:";
    static readonly D1C = "- ATENCION:";
    static readonly D1D = "- ESTADO de ÁNIMO ¿tiene buen humor? ¿se queja? ¿se aburre?";
    static readonly D2 = "2) APTITUD para la tarea (habilidades y destrezas para la tarea)";
    static readonly E = "E) RELACION A LA CONVIVENCIA";
    static readonly E1 = "- ¿colabora en la organización de la casa?";
    static readonly E2 = "- ¿respeta las normas?";
    static readonly F = "F) RELACION CON LOS COMPAÑEROS DE LA RESIDENCIA";
    static readonly F1 = "- ¿respeta?";
    static readonly F2 = "- ¿escucha?";
    static readonly F3 = "- ¿habla?";
    static readonly F4 = "- ¿interactúa?";
    static readonly F5 = "- ¿tolerancia?";
    static readonly G = "G) RELACION CON LOS MONITORES DE CONVIVENCIA";
    static readonly G1 = "- ¿Cómo interactúa con el Monitor?";
    static readonly G2 = "- ¿Acepta indicaciones y sugerencias?";
    static readonly H = "H) HABITOS DE ALIMENTACION (Realiza las 4 comidas, ingestas fuera de hora, capacidad de espera)";
    static readonly I = "I) MANEJO DEL DINERO (Propio, el de la casa)";
    static readonly J = "J) COMPRAS O MANDADOS";
    static readonly K = "K) CONTROLES MEDICOS Y/O PSIQUIATRICOS";
    static readonly L = "L) ACTIVIDADES EN EL AFUERA";
    static readonly M = "M) TIEMPO DE OCIO";
    static readonly N = "N) OTRAS OBSERVACIONES";
    static readonly DESCRIPCION_PROYECTO = "DESCRIPCIÓN DEL PROYECTO TERAPEUTICO PLANTEADO";
    static readonly EVALUACION_PROYECTO = "EVALUACIÓN DEL PROYECTO Y PASOS A SEGUIR TRABAJANDO";
}

