import { Entity, Paginated, UpdateParams } from "./commons";

export interface Mutualista extends Entity {
    nombre: string;
    telefono: string;
    direccion: string;
}

export interface MutualistaBody {
    nombre: string;
    telefono: string | undefined;
    direccion: string | undefined;
}

export interface UpdateMutualistaParams extends UpdateParams<MutualistaBody> { }

export interface SearchMutualistasBody extends Paginated {
    search: undefined | string;
}

export interface SearchMutualistasParams {
    page: undefined | number;
    body: SearchMutualistasBody;
}