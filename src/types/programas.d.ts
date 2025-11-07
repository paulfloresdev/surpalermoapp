import { Entity, UpdateParams } from "./commons";

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

export interface UpdateProgramaParams extends UpdateParams<ProgramaBody> { }


