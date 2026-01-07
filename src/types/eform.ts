import { Entity, UpdateParams } from "./commons";

export interface EForm extends Entity {
    fecha: string | null;
    institucion: string | null;
    medico_tratante: string | null;
    ci: string | null;
    inicio_tratamiento: string | null;
    frecuencia: string | null;
    numero_sesiones: number | null;
    tipo: number;
    psicoterapeuta: string | null;
    trabajo_usuario: string | null;
    trabajo_familia: string | null;
    socio_id: number | null;
}

export type EFormBody = Omit<
    EForm,
    'id' | 'created_at' | 'updated_at'
>;

export interface UpdateEFormParams extends UpdateParams<EFormBody> { };