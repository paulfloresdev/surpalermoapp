import { Entity, Excel, Paginated, UpdateParams } from "./commons";

export interface SocioGrupoPivot extends Entity {
    fecha_baja: Date | null;
    motivo_baja: number | null;
    socio_id: number;
    grupo_id: number;
    grupo: Grupo | null | undefined;
    socio: Socio | null | undefined;
}

export interface SocioGrupoPivotBody {
    fecha_baja: Date | undefined;
    motivo_baja: number | undefined;
    socio_id: number;
    grupo_id: number;
}

export interface UpdateSocioGrupoPivotParams extends UpdateParams<SocioGrupoPivotBody> { }

export interface SearchSocioGrupoPivotBody extends Paginated, Excel {
    search: undefined | string;
    socio_id: number;
}

export interface SearchSocioGrupoPivotsParams {
    page: undefined | number;
    body: SearchSocioGrupoPivotBody;
}

export interface GetSociosByGrupoBody {
    grupo_id: number;
    per_page?: numbner | undefined;
    activo?: boolean | undefined;
    baja?: boolean | undefined;
    search?: string | undefined;
}

export interface GetSociosByGrupoParams {
    page: number;
    body: GetSociosByGrupoBody;
}