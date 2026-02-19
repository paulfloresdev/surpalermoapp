import { Entity, Paginated, PaginatedParams, UpdateParams } from "./commons";

export interface Funcionario extends Entity {
    nombre: string;
    fecha_ingreso: string;
    direccion: string;
    telefono: string | undefined;
    email: string | undefined;
    celular: string | undefined;
    obervacion: string | undefined;
    eliminado: boolean;
}

export interface FuncionarioBody {
    nombre: string | undefined;
    fecha_ingreso: string | undefined;
    direccion: string | undefined;
    telefono: string | undefined;
    email: string | undefined;
    celular: string | undefined;
    observacion: string | undefined;
    eliminado: boolean | undefined;
}

export interface UpdateFuncionarioParams extends UpdateParams<FuncionarioBody> { }
