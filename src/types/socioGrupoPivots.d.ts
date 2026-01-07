import { Entity, Paginated, UpdateParams } from "./commons";

export interface SocioGrupoPivot extends Entity {
    fecha_baja: Date | null;
    socio_id: number;
    grupo_id: number;
    grupo: Grupo | null | undefined;
}

export interface SocioGrupoPivotBody {
    fecha_baja: Date | undefined;
    socio_id: number;
    grupo_id: number;
}

export interface UpdateSocioGrupoPivotParams extends UpdateParams<SocioGrupoPivotBody> { }

export interface SearchSocioGrupoPivotBody extends Paginated {
    search: undefined | string;
    socio_id: number;
}

export interface SearchSocioGrupoPivotsParams {
    page: undefined | number;
    body: SearchSocioGrupoPivotBody;
}