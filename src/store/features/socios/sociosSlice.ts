import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, Response } from "../../../types/commons";
import { SearchSociosParams, Socio, SocioBody, UpdateSocioParams } from "../../../types/socios";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Socio> = {
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

const sociosSlice = createSlice({
    name: 'socios',
    initialState,
    reducers: {
        // CLEAR
        clearSociosRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexSociosRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexSociosSuccess: (state, action: PayloadAction<Response<Socio[]>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexSociosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeSocioRequest: (state, _action: PayloadAction<SocioBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeSocioSuccess: (state, action: PayloadAction<Response<Socio>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeSocioFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        // SHOW
        showSocioRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showSocioSuccess: (state, action: PayloadAction<Response<Socio>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showSocioFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        //  UPDATE
        updateSocioRequest: (state, _action: PayloadAction<UpdateSocioParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateSocioSuccess: (state, action: PayloadAction<Response<Socio>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message
            state.updateSuccess = true;
        },
        updateSocioFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroySocioRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroySocioSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroySocioFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },

        // SEARCH
        searchSociosRequest: (state, _action: PayloadAction<SearchSociosParams>) => {
            state.loading = true;
            state.error = null;
        },
        searchSociosSuccess: (state, action: PayloadAction<Response<PaginatedItems<Socio>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        searchSociosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },
    }
});

export const {
    clearSociosRequest,
    indexSociosRequest,
    indexSociosSuccess,
    indexSociosFailure,
    storeSocioRequest,
    storeSocioSuccess,
    storeSocioFailure,
    showSocioRequest,
    showSocioSuccess,
    showSocioFailure,
    updateSocioRequest,
    updateSocioSuccess,
    updateSocioFailure,
    destroySocioRequest,
    destroySocioSuccess,
    destroySocioFailure,
    searchSociosRequest,
    searchSociosSuccess,
    searchSociosFailure,
} = sociosSlice.actions;

export default sociosSlice.reducer;