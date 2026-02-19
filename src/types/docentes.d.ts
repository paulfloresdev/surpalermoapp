import { Entity, Paginated, UpdateParams } from "./commons";

export interface Docente extends Entity {
    nombre: string;
    apellido: string | undefined;
    telefono: string | undefined;
    celular: string | undefined;
    email: string | undefined;
    direccion: string | undefined;
    dni: string | undefined;
    valor_hora: number | undefined;
    activo: boolean;
}

export interface DocenteBody {
    nombre: string | undefined;
    apellido: string | undefined;
    telefono: string | undefined;
    celular: string | undefined;
    email: string | undefined;
    direccion: string | undefined;
    dni: string | undefined;
    valor_hora: number | undefined;
    activo: boolean | undefined;
}

export interface UpdateDocenteParams extends UpdateParams<DocenteBody> {
}