import { Entity, UpdateParams } from "./commons";

export interface Localidad extends Entity {
    nombre: string | null;
    departamento_id: number | null;
}

export interface LocalidadBody {
    nombre: string;
    departamento_id: number;
}

export interface UpdateLocalidadParams extends UpdateParams<LocalidadBody> { }
