import { Entity } from "./commons";

export interface GroupForm extends Entity {
    month: number;
    year: number;
    grupo_id: number;
    grupo: Grupo;
    items: GroupFormItem[];
}

export interface GroupFormItem extends Entity {
    date_of?: string;
    date_of_type?: string;
    atencion_medica?: boolean;
    no_internaciones?: number;
    rnpd?: boolean;
    bps?: boolean;
    trabajo?: boolean;
    vive?: "S" | "F" | "P" | "VA" | "PE";
    asistencia?: number;
    motivacion?: number;
    participacion?: number;
    comunicacion?: number;
    autonomia?: number;
    autocuidado?: number;
    otras_actividades?: string;
    otras_actividades_fuera?: boolean;
    socio_id?: number;
    socio: Socio?;
    group_form_id?: number;
    group_form?: GroupForm;
}

export interface IndexGroupFormsParams {
    per_page: number | undefined;
    page: number | undefined;
    grupo_id: number | undefined;
    month?: number | undefined;
    year?: number | undefined;
}

export type GroupFormItemBody = Omit<
    GroupFormItem,
    'id' | 'created_at' | 'updated_at' | 'group_form' | 'group_form_id'
>;

export interface GroupFormBody {
    grupo_id: number;
    month: number;
    year: number;
    items: GroupFormItemBody[];
}

export interface UpdateGroupFormParams {
    id: string;
    body: GroupFormBody;
}