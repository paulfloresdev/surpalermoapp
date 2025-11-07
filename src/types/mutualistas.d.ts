import { Entity, UpdateParams } from "./commons";

export interface Mutualista extends Entity {
    nombre: string;
    telefono: string;
    direccion: string;
}

export interface MutualistaBody {
    nombre: string;
    telefono: string;
    direccion: string;
}

export interface UpdateMutualistaParams extends UpdateParams<MutualistaBody> { }