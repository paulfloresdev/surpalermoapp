import { Entity } from "./commons";
import { Docente } from "./docentes";
import { Grupo } from "./grupos";

export interface Coordinador extends Entity {
    grupo_id: string;
    grupo: Grupo;
    docente_id: string;
    docente: Docente;
}

export interface CoordinadorBody {
    grupo_id: number;
    docente_id: number;
}

export interface UpdateCoordinadorParams {
    id: string;
    body: CoordinadorBody;
}

export interface IndexCoordinadoresParams {
    docente_id?: number | undefined;
    grupo_id?: number | undefined;
    page: number | undefined;
    per_page: number | undefined;
}