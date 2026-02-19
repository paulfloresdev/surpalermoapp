import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, Response } from "../../../types/commons";
import { Grupo, GrupoBody, PaginatedGruposParams, UpdateGrupoParams } from "../../../types/grupos";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Grupo> = {
    data: null,
    message: null,
    loading: false,
    error: null,
    indexSuccess: null,
    storeSuccess: null,
    showSuccess: null,
    updateSuccess: null,
    destroySuccess: null,
}

const gruposSlice = createSlice({
    name: 'grupos',
    initialState,
    reducers: {
        //  CLEAR
        clearGruposRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexGruposRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexGruposSuccess: (state, action: PayloadAction<Response<Grupo[]>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexGruposFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  PAGINATED
        paginatedGruposRequest: (state, _action: PayloadAction<PaginatedGruposParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedGruposSuccess: (state, action: PayloadAction<PaginatedItems<Grupo>>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        paginatedGruposFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeGrupoRequest: (state, _action: PayloadAction<GrupoBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeGrupoSuccess: (state, action: PayloadAction<Response<Grupo>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeGrupoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showGrupoRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showGrupoSuccess: (state, action: PayloadAction<Response<Grupo>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showGrupoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        //  UPDATE
        updateGrupoRequest: (state, _action: PayloadAction<UpdateGrupoParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateGrupoSuccess: (state, action: PayloadAction<Response<Grupo>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateGrupoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyGrupoRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyGrupoSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroyGrupoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },

        //  GET BY PROGRAMAS OF SOCIO
        getByProgramasOfSocioRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        getByProgramasOfSocioSuccess: (state, action: PayloadAction<Response<Grupo[]>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        getByProgramasOfSocioFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        }
    }
});

export const {
    clearGruposRequest,
    indexGruposRequest,
    indexGruposSuccess,
    indexGruposFailure,
    paginatedGruposRequest,
    paginatedGruposSuccess,
    paginatedGruposFailure,
    storeGrupoRequest,
    storeGrupoSuccess,
    storeGrupoFailure,
    showGrupoRequest,
    showGrupoSuccess,
    showGrupoFailure,
    updateGrupoRequest,
    updateGrupoSuccess,
    updateGrupoFailure,
    destroyGrupoRequest,
    destroyGrupoSuccess,
    destroyGrupoFailure,
    getByProgramasOfSocioRequest,
    getByProgramasOfSocioSuccess,
    getByProgramasOfSocioFailure,
} = gruposSlice.actions;

export default gruposSlice.reducer;