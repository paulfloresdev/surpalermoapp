import { Entity, UpdateParams } from "./commons";

export interface CForm extends Entity {
    programa: string | null;
    fecha_ingreso_programa: string | null;
    inscrito_rnpd: boolean | null;
    medico_psiquiatra: string | null;
    psicoterapeuta: string | null;
    meses_tratamiento: number | null;
    diagnostico: string | null;
    medicacion: string | null;
    egreso_programado: boolean;
    otro_motivo_egreso: number | null;
    informo_familiar: boolean;
    insercion_laboral: boolean;
    insercion_laboral_notes: string | null;
    insercion_curricular: boolean;
    insercion_curricular_notes: string | null;
    insercion_scd: boolean;
    insercion_scd_notes: string | null;
    otras_actividades: string | null;
    derivacion_nombres: string[] | null;
    evaluacion_tratamiento: number;
    evaluacion_final_notes: string | null;
    capturada_por: string | null;
    socio_id: number | null;
}

export type CFormBody = Omit<
    CForm,
    'id' | 'created_at' | 'updated_at'
>;

export interface UpdateCFormParams extends UpdateParams<CFormBody> { }