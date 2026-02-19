import { Entity, Paginated, UpdateParams } from "./commons";

export interface Programa extends Entity {
    nombre: string;
    valor_hora: null | number;
    activo: boolean;
}

export interface ProgramaBody {
    nombre: string | undefined;
    valor_hora: number | undefined;
    activo: boolean | undefined;
}

export interface IndexProgramaParams {
    socio_id: string | undefined;
    inactivos: boolean | undefined;
}


export interface UpdateProgramaParams extends UpdateParams<ProgramaBody> { }

export interface PaginatedProgramasBody extends Paginated {
    search?: undefined | string;
    excel: undefined | boolean;
}

export interface PaginatedProgramasParams {
    page: undefined | number;
    body: PaginatedProgramasBody;
}
