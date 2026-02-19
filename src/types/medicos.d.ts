import { Entity, Paginated, UpdateParams } from "./commons";

export interface Medico extends Entity {
    nombre: string;
    telefono_consultorio: string | undefined;
    telefono_particular: string | undefined;
    celular: string | undefined;
    email: string | undefined;
    direccion: string | undefined;
    eliminado: boolean;
}

export interface MedicoBody {
    nombre: string | undefined;
    telefono_consultorio: string | undefined;
    telefono_particular: string | undefined;
    celular: string | undefined;
    email: string | undefined;
    direccion: string | undefined;
    eliminado: boolean | undefined;
}

export interface UpdateMedicoParams extends UpdateParams<MedicoBody> { }