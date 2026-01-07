import { Programa } from "./programas";
import { Entity, Paginated, UpdateParams } from "./commons";

export interface SocioProgramaPivot extends Entity {
    fecha_inscripcion: Date;
    costo_mensual: number | null;
    baja_actividad: boolean;
    fecha_baja: Date | null;
    motivo_baja: number | null;
    socio_id: number;
    programa_id: number;
    programa: Programa | null | undefined;
}
export interface SocioProgramaPivotBody {
    fecha_inscripcion: Date;
    costo_mensual: number | undefined;
    baja_actividad: boolean;
    fecha_baja: Date | undefined;
    motivo_baja: number | undefined;
    socio_id: number;
    programa_id: number;
}

export interface UpdateSocioProgramaPivotParams extends UpdateParams<SocioProgramaPivotBody> { }

export interface SearchSocioProgramaPivotsBody extends Paginated {
    search: undefined | string;
    socio_id: number;
}

export interface SearchSocioProgramaPivotsParams {
    page: undefined | number;
    body: SearchSocioProgramaPivotsBody;
}