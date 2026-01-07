import { AFormBody, UpdateAFormParams } from "../../types/aform";
import { LogInParams, SignUpParams, UpdateUserDataParams, UpdateUserPasswordParams } from "../../types/auth";
import { BFormBody, UpdateBFormParams } from "../../types/bform";
import { CFormBody, UpdateCFormParams } from "../../types/cform";
import { PaginatedParams } from "../../types/commons";
import { DepartamentoBody, UpdateDepartamentoParams } from "../../types/departamentos";
import { DFormBody, UpdateDFormParams } from "../../types/dform";
import { EFormBody, UpdateEFormParams } from "../../types/eform";
import { EmergenciaBody, UpdateEmergenciaParams } from "../../types/emergencias";
import { GrupoBody, UpdateGrupoParams } from "../../types/grupos";
import { LocalidadBody, UpdateLocalidadParams } from "../../types/localidades";
import { MutualistaBody, SearchMutualistasParams, UpdateMutualistaParams } from "../../types/mutualistas";
import { ProgramaBody, UpdateProgramaParams } from "../../types/programas";
import { SearchSocioGrupoPivotsParams, SocioGrupoPivotBody, UpdateSocioGrupoPivotParams } from "../../types/socioGrupoPivots";
import { SearchSocioProgramaPivotsParams, SocioProgramaPivotBody, UpdateSocioProgramaPivotParams } from "../../types/socioProgramaPivots";
import { SearchSociosParams, SocioBody, UpdateSocioParams } from "../../types/socios";
import { api } from "./configuration";
import * as url from "./url";

//  AUTH
export const logInAPI = (data: LogInParams) => api.post(url.AUTH_LOGIN, data);
export const signUpAPI = (data: SignUpParams) => api.post(url.AUTH_SIGNUP, data);
export const logOutAPI = () => api.post(url.AUTH_LOGOUT, {});
export const meAPI = () => api.get(url.AUTH_ME);
export const updateUserDataAPI = (id: string, data: UpdateUserDataParams) => api.put(`${url.AUTH_UPDATE_DATA}/${id}`, data);
export const updateUserPasswordAPI = (id: string, data: UpdateUserPasswordParams) => api.put(`${url.AUTH_UPDATE_PASSWORD}/${id}`, data);

//  SOCIOS
export const indexSociosAPI = () => api.get(url.SOCIOS);
export const showSocioAPI = (id: string) => api.get(`${url.SOCIOS}/${id}`);
export const storeSocioAPI = (body: SocioBody) => api.post(`${url.SOCIOS}`, body);
export const updateSocioAPI = (params: UpdateSocioParams) => api.put(`${url.SOCIOS}/${params.id}`, params.body);
export const destroySocioAPI = (id: string) => api.delete(`${url.SOCIOS}/${id}`);
export const searchSociosAPI = (params: SearchSociosParams) => api.post(`${url.SOCIOS}/search?page=${params.page ?? 1}`, params.body);

//  DEPARTAMENTOS
export const indexDepartamentosAPI = () => api.get(url.DEPARTAMENTOS);
export const paginatedDepartamentosAPI = (params: PaginatedParams) => api.post(`${url.DEPARTAMENTOS}/paginated?page=${params.page ?? 1}`, params.body)
export const storeDepartamentoAPI = (body: DepartamentoBody) => api.post(url.DEPARTAMENTOS, body);
export const showDepartamentoAPI = (id: string) => api.get(`${url.DEPARTAMENTOS}/${id}`);
export const updateDepartamentoAPI = (params: UpdateDepartamentoParams) => api.put(`${url.DEPARTAMENTOS}/${params.id}`, params.body);
export const destroyDepartamentoAPI = (id: string) => api.delete(`${url.DEPARTAMENTOS}/${id}`);

//  LOCALIDADES
export const indexLocalidadesAPI = () => api.get(url.LOCALIDADES);
export const paginatedLocalidadesAPI = (params: PaginatedParams) => api.post(`${url.LOCALIDADES}/paginated?page=${params.page ?? 1}`, params.body)
export const storeLocalidadAPI = (body: LocalidadBody) => api.post(url.LOCALIDADES, body);
export const showLocalidadAPI = (id: string) => api.get(`${url.LOCALIDADES}/${id}`);
export const updateLocalidadAPI = (params: UpdateLocalidadParams) => api.put(`${url.LOCALIDADES}/${params.id}`, params.body);
export const destroyLocalidadAPI = (id: string) => api.delete(`${url.LOCALIDADES}/${id}`);

//  MUTUALISTAS
export const indexMutualistasAPI = () => api.get(url.MUTUALISTAS);
export const searchMutualistasAPI = (params: SearchMutualistasParams) => api.post(`${url.MUTUALISTAS}/search?page=${params.page ?? 1}`, params.body)
export const storeMutualistaAPI = (body: MutualistaBody) => api.post(url.MUTUALISTAS, body);
export const showMutualistaAPI = (id: string) => api.get(`${url.MUTUALISTAS}/${id}`);
export const updateMutualistaAPI = (params: UpdateMutualistaParams) => api.put(`${url.MUTUALISTAS}/${params.id}`, params.body);
export const destroyMutualistaAPI = (id: string) => api.delete(`${url.MUTUALISTAS}/${id}`);

// EMERGENCIAS
export const indexEmergenciasAPI = () => api.get(url.EMERGENCIAS);
export const paginatedEmergenciasAPI = (params: PaginatedParams) => api.post(`${url.EMERGENCIAS}/paginated?page=${params.page ?? 1}`, params.body);
export const storeEmergenciaAPI = (body: EmergenciaBody) => api.post(url.EMERGENCIAS, body);
export const showEmergenciaAPI = (id: string) => api.get(`${url.EMERGENCIAS}/${id}`);
export const updateEmergenciaAPI = (params: UpdateEmergenciaParams) => api.put(`${url.EMERGENCIAS}/${params.id}`, params.body);
export const destroyEmergenciaAPI = (id: string) => api.delete(`${url.EMERGENCIAS}/${id}`);

// PROGRAMAS
export const indexProgramasAPI = (socioId: string | undefined) => api.get(`${url.PROGRAMAS}${socioId !== undefined ? `?socio_id=${socioId}` : ''}`);
export const paginatedProgramasAPI = (params: PaginatedParams) => api.post(`${url.PROGRAMAS}/paginated?page=${params.page ?? 1}`, params.body);
export const storeProgramaAPI = (body: ProgramaBody) => api.post(url.PROGRAMAS, body);
export const showProgramaAPI = (id: string) => api.get(`${url.PROGRAMAS}/${id}`);
export const updateProgramaAPI = (params: UpdateProgramaParams) => api.put(`${url.PROGRAMAS}/${params.id}`, params.body);
export const destroyProgramaAPI = (id: string) => api.delete(`${url.PROGRAMAS}/${id}`);

// SOCIO PROGRAMA PIVOTS
export const indexSocioProgramaPivotsAPI = () => api.get(url.SOCIOPROGAMAPIVOTS);
export const storeSocioProgramaPivotAPI = (body: SocioProgramaPivotBody) => api.post(url.SOCIOPROGAMAPIVOTS, body);
export const showSocioProgramaPivotAPI = (id: string) => api.get(`${url.SOCIOPROGAMAPIVOTS}/${id}`);
export const updateSocioProgramaPivotAPI = (params: UpdateSocioProgramaPivotParams) => api.put(`${url.SOCIOPROGAMAPIVOTS}/${params.id}`, params.body);
export const destroySocioProgramaPivotAPI = (id: string) => api.delete(`${url.SOCIOPROGAMAPIVOTS}/${id}`);
export const searchSocioProgramaPivotsAPI = (params: SearchSocioProgramaPivotsParams) => api.post(`${url.SOCIOPROGAMAPIVOTS}/search?page=${params.page ?? 1}`, params.body);

// GRUPOS
export const indexGruposAPI = () => api.get(url.GRUPOS);
export const storeGrupoAPI = (body: GrupoBody) => api.post(url.GRUPOS, body);
export const showGrupoAPI = (id: string) => api.get(`${url.GRUPOS}/${id}`);
export const updateGrupoAPI = (params: UpdateGrupoParams) => api.put(`${url.GRUPOS}/${params.id}`, params.body);
export const destroyGrupoAPI = (id: string) => api.delete(`${url.GRUPOS}/${id}`);
export const getByProgramasOfSocioAPI = (id: string) => api.get(`${url.GRUPOS}/by-programas-of-socio/${id}`);

// SOCIO GRUPO PIVOTS
export const indexSocioGrupoPivotsAPI = () => api.get(url.SOCIOGRUPOPIVOTS);
export const storeSocioGrupoPivotAPI = (body: SocioGrupoPivotBody) => api.post(url.SOCIOGRUPOPIVOTS, body);
export const showSocioGrupoPivotAPI = (id: string) => api.get(`${url.SOCIOGRUPOPIVOTS}/${id}`);
export const updateSocioGrupoPivotAPI = (params: UpdateSocioGrupoPivotParams) => api.put(`${url.SOCIOGRUPOPIVOTS}/${params.id}`, params.body);
export const destroySocioGrupoPivotAPI = (id: string) => api.delete(`${url.SOCIOGRUPOPIVOTS}/${id}`);
export const searchSocioGrupoPivotsAPI = (params: SearchSocioGrupoPivotsParams) => api.post(`${url.SOCIOGRUPOPIVOTS}/search?page=${params.page ?? 1}`, params.body);

//  FORMS

//  AFORMS
export const indexAFormsAPI = (id: string) => api.get(`${url.AFORMS}?socio_id=${id}`);
export const storeAFormAPI = (body: AFormBody) => api.post(url.AFORMS, body);
export const showAFormAPI = (id: string) => api.get(`${url.AFORMS}/${id}`);
export const updateAFormAPI = (params: UpdateAFormParams) => api.put(`${url.AFORMS}/${params.id}`, params.body);
export const destroyAFormAPI = (id: string) => api.delete(`${url.AFORMS}/${id}`);

//  BFORMS
export const indexBFormsAPI = (id: string) => api.get(`${url.BFORMS}?socio_id=${id}`);
export const storeBFormAPI = (body: BFormBody) => api.post(url.BFORMS, body);
export const showBFormAPI = (id: string) => api.get(`${url.BFORMS}/${id}`);
export const updateBFormAPI = (params: UpdateBFormParams) => api.put(`${url.BFORMS}/${params.id}`, params.body);
export const destroyBFormAPI = (id: string) => api.delete(`${url.BFORMS}/${id}`);

//  CFORMS
export const indexCFormsAPI = (id: string) => api.get(`${url.CFORMS}?socio_id=${id}`);
export const storeCFormAPI = (body: CFormBody) => api.post(url.CFORMS, body);
export const showCFormAPI = (id: string) => api.get(`${url.CFORMS}/${id}`);
export const updateCFormAPI = (params: UpdateCFormParams) => api.put(`${url.CFORMS}/${params.id}`, params.body);
export const destroyCFormAPI = (id: string) => api.delete(`${url.CFORMS}/${id}`);

//  DFORMS
export const indexDFormsAPI = (id: string) => api.get(`${url.DFORMS}?socio_id=${id}`);
export const storeDFormAPI = (body: DFormBody) => api.post(url.DFORMS, body);
export const showDFormAPI = (id: string) => api.get(`${url.DFORMS}/${id}`);
export const updateDFormAPI = (params: UpdateDFormParams) => api.put(`${url.DFORMS}/${params.id}`, params.body);
export const destroyDFormAPI = (id: string) => api.delete(`${url.DFORMS}/${id}`);

//  EFORMS
export const indexEFormsAPI = (id: string) => api.get(`${url.EFORMS}?socio_id=${id}`);
export const storeEFormAPI = (body: EFormBody) => api.post(url.EFORMS, body);
export const showEFormAPI = (id: string) => api.get(`${url.EFORMS}/${id}`);
export const updateEFormAPI = (params: UpdateEFormParams) => api.put(`${url.EFORMS}/${params.id}`, params.body);
export const destroyEFormAPI = (id: string) => api.delete(`${url.EFORMS}/${id}`);