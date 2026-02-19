import { Entity } from "./commons";
import { Grupo } from "./grupos";

export interface DocenteGrupoPivot extends Entity {
    grupo_id: string;
    grupo: Grupo;
    docente_id: string;
    docente: Docente;
}

export interface DocenteGrupoPivotBody {
    grupo_id: number;
    docente_id: number;
}

export interface UpdateDocenteGrupoPivotParams {
    id: string;
    body: DocenteGrupoPivotBody;
}

export interface IndexDocenteGrupoPivotsParams {
    docente_id?: number | undefined;
    grupo_id?: number | undefined;
    page: number | undefined;
    per_page: number | undefined;
}