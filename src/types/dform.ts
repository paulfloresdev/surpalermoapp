import { Entity, UpdateParams } from "./commons";

export interface DForm extends Entity {
    fecha: string | null;
    dirigido: string | null;
    institucion: string | null;
    referente: string | null;
    medico_tratante: string | null;
    ci: string | null;
    inicio_tratamiento: string | null;
    frecuencia: string | null;
    tipo: number;
    psicoterapeuta: string | null;
    trabajo_usuario: string | null;
    trabajo_familia: string | null;
    socio_id: number | null;
}

export type DFormBody = Omit<
    DForm,
    'id' | 'created_at' | 'updated_at'
>;

export interface UpdateDFormParams extends UpdateParams<DFormBody> { };