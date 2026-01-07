import { Entity, UpdateParams } from "./commons";

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