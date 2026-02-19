import { Entity, Paginated, UpdateParams } from "./commons";

export interface Emergencia extends Entity {
    nombre: string;
    telefono: string;
    direccion: string;
}

export interface EmergenciaBody {
    nombre: string;
    telefono: string | undefined;
    direccion: string | undefined;
}

export interface UpdateEmergenciaParams extends UpdateParams<EmergenciaBody> { }

export interface PaginatedEmergenciasBody extends Paginated {
    search: undefined | string;
    excel?: undefined | boolean;
}

export interface PaginatedEmergenciasParams {
    page: undefined | number;
    body: PaginatedEmergenciasBody;
}