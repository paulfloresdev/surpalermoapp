import { CrudState, Entity, Paginated, State, UpdateParams } from "./commons";
import { PaginatedItems } from "./responses";

export interface Departamento extends Entity {
    nombre: string;
}

export interface DepartamentoBody {
    nombre: string;
}

export interface UpdateDepartamentoParams extends UpdateParams<DepartamentoBody> { }
