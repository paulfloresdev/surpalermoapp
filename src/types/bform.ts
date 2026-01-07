import { Entity, UpdateParams } from "./commons";

export interface BForm extends Entity {
    fecha_ingreso_centro: string | null;
    fecha_derivacion: string | null;
    inscrito_rnpd: boolean | null;
    programa_nombre: string;
    medico_psiquiatra: string | null;
    psicoterapeuta: string | null;
    medicacion: string | null;
    same_program: boolean | null;
    derivacion_nombres: string[] | null;
    motivo_derivacion: string | null;
    capturada_por: string | null;
    socio_id: number | null;
}

export type BFormBody = Omit<
    BForm,
    'id' | 'created_at' | 'updated_at'
>;

export interface UpdateBFormParams extends UpdateParams<BFormBody> { };

