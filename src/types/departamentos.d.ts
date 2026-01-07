import { CrudState, Entity, Paginated, State, UpdateParams } from "./commons";

export interface Departamento extends Entity {
    nombre: string;
}

export interface DepartamentoBody {
    nombre: string;
}

export interface UpdateDepartamentoParams extends UpdateParams<DepartamentoBody> { }
