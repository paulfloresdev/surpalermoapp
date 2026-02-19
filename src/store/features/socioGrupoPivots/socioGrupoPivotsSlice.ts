import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, Response } from "../../../types/commons";
import { GetSociosByGrupoParams, SearchSocioGrupoPivotsParams, SocioGrupoPivot, SocioGrupoPivotBody, UpdateSocioGrupoPivotParams } from "../../../types/socioGrupoPivots";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<SocioGrupoPivot> = {
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

const socioGrupoPivotsSlice = createSlice({
    name: 'socioGrupoPivots',
    initialState,
    reducers: {
        //  CLEAR
        clearSocioGrupoPivotsRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexSocioGrupoPivotsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexSocioGrupoPivotsSuccess: (state, action: PayloadAction<Response<SocioGrupoPivot[]>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexSocioGrupoPivotsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeSocioGrupoPivotRequest: (state, _action: PayloadAction<SocioGrupoPivotBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeSocioGrupoPivotSuccess: (state, action: PayloadAction<Response<SocioGrupoPivot>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeSocioGrupoPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showSocioGrupoPivotRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showSocioGrupoPivotSuccess: (state, action: PayloadAction<Response<SocioGrupoPivot>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showSocioGrupoPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        //  UPDATE
        updateSocioGrupoPivotRequest: (state, _action: PayloadAction<UpdateSocioGrupoPivotParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateSocioGrupoPivotSuccess: (state, action: PayloadAction<Response<SocioGrupoPivot>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateSocioGrupoPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroySocioGrupoPivotRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroySocioGrupoPivotSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroySocioGrupoPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },

        //  SEARCH
        searchSocioGrupoPivotsRequest: (state, _action: PayloadAction<SearchSocioGrupoPivotsParams>) => {
            state.loading = true;
            state.error = null;
        },
        searchSocioGrupoPivotsSuccess: (state, action: PayloadAction<Response<PaginatedItems<SocioGrupoPivot>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        searchSocioGrupoPivotsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  GET SOCIOS BY GRUPO
        getSociosByGrupoRequest: (state, _action: PayloadAction<GetSociosByGrupoParams>) => {
            state.loading = true;
            state.error = null;
        },
        getSociosByGrupoSuccess: (state, action: PayloadAction<Response<PaginatedItems<SocioGrupoPivot>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        getSociosByGrupoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        }
    }
});

export const {
    clearSocioGrupoPivotsRequest,
    indexSocioGrupoPivotsRequest,
    indexSocioGrupoPivotsSuccess,
    indexSocioGrupoPivotsFailure,
    storeSocioGrupoPivotRequest,
    storeSocioGrupoPivotSuccess,
    storeSocioGrupoPivotFailure,
    showSocioGrupoPivotRequest,
    showSocioGrupoPivotSuccess,
    showSocioGrupoPivotFailure,
    updateSocioGrupoPivotRequest,
    updateSocioGrupoPivotSuccess,
    updateSocioGrupoPivotFailure,
    destroySocioGrupoPivotRequest,
    destroySocioGrupoPivotSuccess,
    destroySocioGrupoPivotFailure,
    searchSocioGrupoPivotsRequest,
    searchSocioGrupoPivotsSuccess,
    searchSocioGrupoPivotsFailure,
    getSociosByGrupoRequest,
    getSociosByGrupoSuccess,
    getSociosByGrupoFailure
} = socioGrupoPivotsSlice.actions;

export default socioGrupoPivotsSlice.reducer;