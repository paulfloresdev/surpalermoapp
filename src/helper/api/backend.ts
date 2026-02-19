import { AFormBody, FormParams, UpdateAFormParams } from "../../types/aform";
import { GetUsersParams, LogInParams, SignUpParams, UpdateUserDataParams, UpdateUserPasswordParams } from "../../types/auth";
import { BFormBody, UpdateBFormParams } from "../../types/bform";
import { CFormBody, UpdateCFormParams } from "../../types/cform";
import { ExcelSearchParams, PaginatedParams } from "../../types/commons";
import { CoordinadorBody, IndexCoordinadoresParams, UpdateCoordinadorParams } from "../../types/coordinadores";
import { DepartamentoBody, UpdateDepartamentoParams } from "../../types/departamentos";
import { DFormBody, UpdateDFormParams } from "../../types/dform";
import { DocenteFormBody, IndexDocenteFormsParams, UpdateDocenteFormParams } from "../../types/docenteForms";
import { DocenteGrupoPivotBody, IndexDocenteGrupoPivotsParams, UpdateDocenteGrupoPivotParams } from "../../types/docenteGrupoPivots";
import { DocenteBody, UpdateDocenteParams } from "../../types/docentes";
import { EFormBody, UpdateEFormParams } from "../../types/eform";
import { EmergenciaBody, PaginatedEmergenciasParams, UpdateEmergenciaParams } from "../../types/emergencias";
import { FuncionarioBody, UpdateFuncionarioParams } from "../../types/funcionarios";
import { GroupFormBody, IndexGroupFormsParams, UpdateGroupFormParams } from "../../types/groupForms";
import { GrupoBody, PaginatedGruposParams, UpdateGrupoParams } from "../../types/grupos";
import { LocalidadBody, UpdateLocalidadParams } from "../../types/localidades";
import { MedicoBody, UpdateMedicoParams } from "../../types/medicos";
import { MutualistaBody, SearchMutualistasParams, UpdateMutualistaParams } from "../../types/mutualistas";
import { IndexProgramaParams, PaginatedProgramasParams, ProgramaBody, UpdateProgramaParams } from "../../types/programas";
import { SearchSocioFilesParams, SocioFileBody } from "../../types/socioFiles";
import { SocioFileTypeBody, UpdateSocioFileTypeParams } from "../../types/socioFileType";
import { GetSociosByGrupoParams, SearchSocioGrupoPivotsParams, SocioGrupoPivotBody, UpdateSocioGrupoPivotParams } from "../../types/socioGrupoPivots";
import { SearchSocioProgramaPivotsParams, SocioProgramaPivotBody, UpdateSocioProgramaPivotParams } from "../../types/socioProgramaPivots";
import { SearchSociosParams, SocioBody, UpdateSocioParams } from "../../types/socios";
import { AsignarNoTicketBody, FacturarByIdBody, FacturarByTicketBody, SearchTicketsParams, StoreTicketBody, UpdateTicketParams } from "../../types/tickets";
import { api, rawAxios } from "./configuration";
import * as url from "./url";

//  AUTH
export const logInAPI = (data: LogInParams) => api.post(url.AUTH_LOGIN, data);
export const signUpAPI = (data: SignUpParams) => api.post(url.AUTH_SIGNUP, data);
export const logOutAPI = () => api.post(url.AUTH_LOGOUT, {});
export const meAPI = () => api.get(url.AUTH_ME);
export const updateUserDataAPI = (id: string, data: UpdateUserDataParams) => api.put(`${url.AUTH_UPDATE_DATA}/${id}`, data);
export const updateUserPasswordAPI = (id: string, data: UpdateUserPasswordParams) => api.put(`${url.AUTH_UPDATE_PASSWORD}/${id}`, data);
export const getUsersAPI = (params: GetUsersParams) => api.post(`${url.AUTH_GET_USERS}?page=${params.page ?? 1}`, params.body);

//  SOCIOS
export const indexSociosAPI = () => api.get(url.SOCIOS);
export const showSocioAPI = (id: string) => api.get(`${url.SOCIOS}/${id}`);
export const storeSocioAPI = (body: SocioBody) => api.post(`${url.SOCIOS}`, body);
export const updateSocioAPI = (params: UpdateSocioParams) => api.put(`${url.SOCIOS}/${params.id}`, params.body);
export const destroySocioAPI = (id: string) => api.delete(`${url.SOCIOS}/${id}`);
export const searchSociosAPI = (params: SearchSociosParams) => {
    const isExcel = Boolean(params.body?.excel);
    const queryUrl = `${url.SOCIOS}/search?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob",
        });

    return api.post(queryUrl, params.body);
};





export const uploadSocioImageAPI = (id: string, file: File) => {
    const form = new FormData();
    form.append("image", file);

    return api.post(`${url.SOCIOS}/${id}/imagen`, form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteSocioImageAPI = (id: string) =>
    api.delete(`${url.SOCIOS}/${id}/imagen`);

//  DEPARTAMENTOS
export const indexDepartamentosAPI = () => api.get(url.DEPARTAMENTOS);
export const paginatedDepartamentosAPI = (params: ExcelSearchParams) => {
    const isExcel = Boolean(params.body.excel);
    const queryUrl = `${url.DEPARTAMENTOS}/paginated?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob",
        });

    return api.post(queryUrl, params.body);
}
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
export const searchMutualistasAPI = (params: SearchMutualistasParams) => {
    const isExcel = Boolean(params.body.excel);
    const queryUrl = `${url.MUTUALISTAS}/search?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob",
        });

    return api.post(queryUrl, params.body);
}
export const storeMutualistaAPI = (body: MutualistaBody) => api.post(url.MUTUALISTAS, body);
export const showMutualistaAPI = (id: string) => api.get(`${url.MUTUALISTAS}/${id}`);
export const updateMutualistaAPI = (params: UpdateMutualistaParams) => api.put(`${url.MUTUALISTAS}/${params.id}`, params.body);
export const destroyMutualistaAPI = (id: string) => api.delete(`${url.MUTUALISTAS}/${id}`);

// EMERGENCIAS
export const indexEmergenciasAPI = () => api.get(url.EMERGENCIAS);
export const paginatedEmergenciasAPI = (params: PaginatedEmergenciasParams) => {
    const isExcel = Boolean(params.body.excel);
    const queryUrl = `${url.EMERGENCIAS}/paginated?page=${params.page ?? 1}`

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob",
        });

    return api.post(queryUrl, params.body);
}
export const storeEmergenciaAPI = (body: EmergenciaBody) => api.post(url.EMERGENCIAS, body);
export const showEmergenciaAPI = (id: string) => api.get(`${url.EMERGENCIAS}/${id}`);
export const updateEmergenciaAPI = (params: UpdateEmergenciaParams) => api.put(`${url.EMERGENCIAS}/${params.id}`, params.body);
export const destroyEmergenciaAPI = (id: string) => api.delete(`${url.EMERGENCIAS}/${id}`);

// PROGRAMAS
export const indexProgramasAPI = (params: IndexProgramaParams) => {
    const query: string[] = [];

    if (params.socio_id !== undefined) {
        query.push(`socio_id=${params.socio_id}`);
    }

    if (params.inactivos !== undefined) {
        query.push(`inactivos=${params.inactivos ? 1 : 0}`);
    }

    const queryString = query.length ? `?${query.join("&")}` : "";

    return api.get(`${url.PROGRAMAS}${queryString}`);
};
export const paginatedProgramasAPI = (params: PaginatedProgramasParams) => {
    const isExcel = Boolean(params.body.excel);
    const queryUrl = `${url.PROGRAMAS}/paginated?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob",
        });

    return api.post(queryUrl, params.body);
}
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
export const searchSocioProgramaPivotsAPI = (params: SearchSocioProgramaPivotsParams) => {
    const isExcel = Boolean(params.body?.excel);
    const queryUrl = `${url.SOCIOPROGAMAPIVOTS}/search?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob",
        });

    return api.post(queryUrl, params.body);
}

// GRUPOS
export const indexGruposAPI = () => api.get(url.GRUPOS);
export const paginatedGruposAPI = (params: PaginatedGruposParams) => {
    const isExcel = Boolean(params.body.excel);
    const queryUrl = `${url.GRUPOS}/paginated?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob",
        });

    return api.post(queryUrl, params.body);
}
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
export const searchSocioGrupoPivotsAPI = (params: SearchSocioGrupoPivotsParams) => {
    const isExcel = Boolean(params.body?.excel);
    const queryUrl = `${url.SOCIOGRUPOPIVOTS}/search?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob",
        });

    return api.post(queryUrl, params.body);
}
export const getSociosByGrupoAPI = (params: GetSociosByGrupoParams) => api.post(`${url.SOCIOGRUPOPIVOTS}/socios-by-grupo?page=${params.page ?? 1}`, params.body);


//  TICKETS
export const indexTicketsAPI = (id: string) => api.get(`${url.TICKETS}?socio_id=${id}`);
export const storeTicketAPI = (body: StoreTicketBody) => api.post(url.TICKETS, body);
export const showTicketAPI = (id: string) => api.get(`${url.TICKETS}/${id}`);
export const updateTicketAPI = (params: UpdateTicketParams) => api.put(`${url.TICKETS}/${params.id}`, params.body);
export const destroyTicketAPI = (id: string) => api.delete(`${url.TICKETS}/${id}`);
export const searchTicketsAPI = (params: SearchTicketsParams) => {
    const isExcel = Boolean(params.body?.excel);
    const queryUrl = `${url.TICKETS}/search?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob",
        });

    return api.post(queryUrl, params.body);
}
export const facturarByTicketAPI = (body: FacturarByTicketBody) => api.post(`${url.TICKETS}/facturar-ticket`, body);
export const facturarByIdAPI = (body: FacturarByIdBody) => api.post(`${url.TICKETS}/facturar-id`, body);
export const asignarNoTicketAPI = (body: AsignarNoTicketBody) => api.post(`${url.TICKETS}/asignar-ticket`, body);

//  SOCIO-FILE-TYPES
export const indexSocioFileTypesAPI = () => api.get(url.SOCIOFILETYPES);
export const paginatedSocioFileTypesAPI = (params: PaginatedParams) => api.post(`${url.SOCIOFILETYPES}/paginated?page=${params.page ?? 1}`, params.body);
export const storeSocioFileTypeAPI = (body: SocioFileTypeBody) => api.post(url.SOCIOFILETYPES, body);
export const showSocioFileTypeAPI = (id: string) => api.get(`${url.SOCIOFILETYPES}/${id}`);
export const updateSocioFileTypeAPI = (params: UpdateSocioFileTypeParams) => api.put(`${url.SOCIOFILETYPES}/${params.id}`, params.body);
export const destroySocioFileTypeAPI = (id: string) => api.delete(`${url.SOCIOFILETYPES}/${id}`);


// ===============================
// SOCIO FILES (documentos privados)
// ===============================

export const paginatedSocioFilesAPI = (params: SearchSocioFilesParams) =>
    api.post(
        `${url.SOCIOFILES}/paginated?page=${params.page ?? 1}`,
        params.body
    );

export const storeSocioFileAPI = (body: SocioFileBody) => {
    const form = new FormData();
    form.append("name", body.name);
    form.append("socio_id", String(body.socio_id));
    form.append("socio_file_type_id", String(body.socio_file_type_id));
    form.append("file", body.file);

    return api.post(url.SOCIOFILES, form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const getSocioFileBlobAPI = (id: string, inline = false) =>
    rawAxios.get(`/socio-files/${id}`, {
        params: { inline: inline ? 1 : 0 },
        responseType: "blob",
    });

export const destroySocioFileAPI = (id: string) =>
    api.delete(`${url.SOCIOFILES}/${id}`);


//  FUNCIONARIOS
export const indexFuncionariosAPI = () => api.get(url.FUNCIONARIOS);
export const paginatedFuncionariosAPI = (params: ExcelSearchParams) => {
    const isExcel = Boolean(params.body.excel);
    const queryUrl = `${url.FUNCIONARIOS}/paginated?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob"
        });

    return api.post(queryUrl, params.body);
}
export const storeFuncionarioAPI = (body: FuncionarioBody) => api.post(url.FUNCIONARIOS, body);
export const showFuncionarioAPI = (id: string) => api.get(`${url.FUNCIONARIOS}/${id}`);
export const updateFuncionarioAPI = (params: UpdateFuncionarioParams) => api.put(`${url.FUNCIONARIOS}/${params.id}`, params.body);
export const destroyFuncionarioAPI = (id: string) => api.delete(`${url.FUNCIONARIOS}/${id}`);

//  DOCENTES
export const indexDocentesAPI = () => api.get(url.DOCENTES);
export const paginatedDocentesAPI = (params: ExcelSearchParams) => {
    const isExcel = Boolean(params.body.excel);
    const queryUrl = `${url.DOCENTES}/paginated?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob"
        });

    return api.post(queryUrl, params.body);
}
export const storeDocenteAPI = (body: DocenteBody) => api.post(url.DOCENTES, body);
export const showDocenteAPI = (id: string) => api.get(`${url.DOCENTES}/${id}`);
export const updateDocenteAPI = (params: UpdateDocenteParams) => api.put(`${url.DOCENTES}/${params.id}`, params.body);
export const destroyDocenteAPI = (id: string) => api.delete(`${url.DOCENTES}/${id}`);

//  MEDICOS
export const indexMedicosAPI = () => api.get(url.MEDICOS);
export const paginatedMedicosAPI = (params: ExcelSearchParams) => {
    const isExcel = Boolean(params.body.excel);
    const queryUrl = `${url.MEDICOS}/paginated?page=${params.page ?? 1}`;

    if (isExcel)
        return rawAxios.post(queryUrl, params.body, {
            responseType: "blob"
        });

    return api.post(queryUrl, params.body);
}
export const storeMedicoAPI = (body: MedicoBody) => api.post(url.MEDICOS, body);
export const showMedicoAPI = (id: string) => api.get(`${url.MEDICOS}/${id}`);
export const updateMedicoAPI = (params: UpdateMedicoParams) => api.put(`${url.MEDICOS}/${params.id}`, params.body);
export const destroyMedicoAPI = (id: string) => api.delete(`${url.MEDICOS}/${id}`);

//  GROUP FORMS
export const indexGroupFormsAPI = (params: IndexGroupFormsParams) => api.get(`${url.GROUPFORMS}?grupo_id=${params.grupo_id}&month=${params.month}&year=${params.year}&page=${params.page}&per_page=${params.per_page}`);
export const storeGroupFormAPI = (body: GroupFormBody) => api.post(url.GROUPFORMS, body);
export const showGroupFormAPI = (id: string) => api.get(`${url.GROUPFORMS}/${id}`);
export const updateGroupFormAPI = (params: UpdateGroupFormParams) => api.put(`${url.GROUPFORMS}/${params.id}`, params.body);
export const destroyGroupFormAPI = (id: string) => api.delete(`${url.GROUPFORMS}/${id}`);

//  DOCENTE GRUPO PIVOTS
export const indexDocenteGrupoPivotsAPI = (params: IndexDocenteGrupoPivotsParams) => api.get(`${url.DOCENTEGRUPOPIVOTS}?page=${params.page ?? 1}&per_page=${params.per_page ?? 10}${params.grupo_id ? `&grupo_id=${params.grupo_id}` : ""}${params.docente_id ? `&docente_id=${params.docente_id}` : ""}`);
export const storeDocenteGrupoPivotAPI = (body: DocenteGrupoPivotBody) => api.post(url.DOCENTEGRUPOPIVOTS, body);
export const showDocenteGrupoPivotAPI = (id: string) => api.get(`${url.DOCENTEGRUPOPIVOTS}/${id}`);
export const updateDocenteGrupoPivotAPI = (params: UpdateDocenteGrupoPivotParams) => api.put(`${url.DOCENTEGRUPOPIVOTS}/${params.id}`, params.body);
export const destroyDocenteGrupoPivotAPI = (id: string) => api.delete(`${url.DOCENTEGRUPOPIVOTS}/${id}`);

//  COORDINADORES
export const indexCoordinadoresAPI = (params: IndexCoordinadoresParams) => api.get(`${url.COORDINADORES}?page=${params.page ?? 1}&per_page=${params.per_page ?? 10}${params.grupo_id ? `&grupo_id=${params.grupo_id}` : ""}${params.docente_id ? `&docente_id=${params.docente_id}` : ""}`);
export const storeCoordinadorAPI = (body: CoordinadorBody) => api.post(url.COORDINADORES, body);
export const showCoordinadorAPI = (id: string) => api.get(`${url.COORDINADORES}/${id}`);
export const updateCoordinadorAPI = (params: UpdateCoordinadorParams) => api.put(`${url.COORDINADORES}/${params.id}`, params.body);
export const destroyCoordinadorAPI = (id: string) => api.delete(`${url.COORDINADORES}/${id}`);

//  GROUP FORMS
export const indexDocenteFormsAPI = (params: IndexDocenteFormsParams) => api.get(`${url.DOCENTEFORMS}?page=${params.page ?? 1}&per_page=${params.per_page ?? 10}${params.grupo_id ? `&grupo_id=${params.grupo_id}` : ""}`);
export const storeDocenteFormAPI = (body: DocenteFormBody) => api.post(url.DOCENTEFORMS, body);
export const showDocenteFormAPI = (id: string) => api.get(`${url.DOCENTEFORMS}/${id}`);
export const updateDocenteFormAPI = (params: UpdateDocenteFormParams) => api.put(`${url.DOCENTEFORMS}/${params.id}`, params.body);
export const destroyDocenteFormAPI = (id: string) => api.delete(`${url.DOCENTEFORMS}/${id}`);

//  ---------- FORMS ----------

//  AFORMS
export const indexAFormsAPI = (params: FormParams) => api.get(`${url.AFORMS}?socio_id=${params.socioId}&page=${params.page}`);
export const storeAFormAPI = (body: AFormBody) => api.post(url.AFORMS, body);
export const showAFormAPI = (id: string) => api.get(`${url.AFORMS}/${id}`);
export const updateAFormAPI = (params: UpdateAFormParams) => api.put(`${url.AFORMS}/${params.id}`, params.body);
export const destroyAFormAPI = (id: string) => api.delete(`${url.AFORMS}/${id}`);

//  BFORMS
export const indexBFormsAPI = (params: FormParams) => api.get(`${url.BFORMS}?socio_id=${params.socioId}&page=${params.page}`);
export const storeBFormAPI = (body: BFormBody) => api.post(url.BFORMS, body);
export const showBFormAPI = (id: string) => api.get(`${url.BFORMS}/${id}`);
export const updateBFormAPI = (params: UpdateBFormParams) => api.put(`${url.BFORMS}/${params.id}`, params.body);
export const destroyBFormAPI = (id: string) => api.delete(`${url.BFORMS}/${id}`);

//  CFORMS
export const indexCFormsAPI = (params: FormParams) => api.get(`${url.CFORMS}?socio_id=${params.socioId}&page=${params.page}`);
export const storeCFormAPI = (body: CFormBody) => api.post(url.CFORMS, body);
export const showCFormAPI = (id: string) => api.get(`${url.CFORMS}/${id}`);
export const updateCFormAPI = (params: UpdateCFormParams) => api.put(`${url.CFORMS}/${params.id}`, params.body);
export const destroyCFormAPI = (id: string) => api.delete(`${url.CFORMS}/${id}`);

//  DFORMS
export const indexDFormsAPI = (params: FormParams) => api.get(`${url.DFORMS}?socio_id=${params.socioId}&page=${params.page}`);
export const storeDFormAPI = (body: DFormBody) => api.post(url.DFORMS, body);
export const showDFormAPI = (id: string) => api.get(`${url.DFORMS}/${id}`);
export const updateDFormAPI = (params: UpdateDFormParams) => api.put(`${url.DFORMS}/${params.id}`, params.body);
export const destroyDFormAPI = (id: string) => api.delete(`${url.DFORMS}/${id}`);

//  EFORMS
export const indexEFormsAPI = (params: FormParams) => api.get(`${url.EFORMS}?socio_id=${params.socioId}&page=${params.page}`);
export const storeEFormAPI = (body: EFormBody) => api.post(url.EFORMS, body);
export const showEFormAPI = (id: string) => api.get(`${url.EFORMS}/${id}`);
export const updateEFormAPI = (params: UpdateEFormParams) => api.put(`${url.EFORMS}/${params.id}`, params.body);
export const destroyEFormAPI = (id: string) => api.delete(`${url.EFORMS}/${id}`);