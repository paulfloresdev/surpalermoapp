import { Entity } from "./commons";
import { Docente } from "./docentes";
import { Grupo } from "./grupos";

export interface DocenteForm extends Entity {
    date_of: string;
    a: number;
    b: number;
    c: string;
    d_1: number;
    d_2: number;
    d_3: number;
    d_4: number;
    d_5: number;
    d_6: number;
    d_7: number;
    d_8: number;
    d_9: number;
    d_10: number;
    d_11: number;
    d_12: number;
    d_13: number;
    d_14: number;
    d_15: number;
    d_16: number;
    e: string;
    grupo_id: number;
    grupo: Grupo;
    docente_id: number;
    docente: Docente;
    coordinador_id: number;
    coordinador: Docente;
}

export type DocenteFormBody<> = Omit<DocenteForm, 'id' | 'created_at' | 'updated_at' | 'grupo' | 'docente' | 'coordinador'>;

export interface UpdateDocenteFormParams {
    id: string;
    body: DocenteFormBody;
}

export interface IndexDocenteFormsParams {
    per_page: number | undefined;
    page: number | undefined;
    grupo_id: number | undefined;
}