import { LogInParams, SignUpParams, UpdateUserDataParams, UpdateUserPasswordParams } from "../../types/auth";
import { PaginatedParams } from "../../types/commons";
import { DepartamentoBody, UpdateDepartamentoParams } from "../../types/departamentos";
import { EmergenciaBody, UpdateEmergenciaParams } from "../../types/emergencias";
import { LocalidadBody, UpdateLocalidadParams } from "../../types/localidades";
import { MutualistaBody, UpdateMutualistaParams } from "../../types/mutualistas";
import { ProgramaBody, UpdateProgramaParams } from "../../types/programas";
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
export const updateSocioAPI = (params: UpdateSocioParams) => api.post(`${url.SOCIOS}/${params.id}`, params.body);
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
export const paginatedMutualistasAPI = (params: PaginatedParams) => api.post(`${url.MUTUALISTAS}/paginated?page=${params.page ?? 1}`, params.body)
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
export const indexProgramasAPI = () => api.get(url.PROGRAMAS);
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