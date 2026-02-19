import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, PaginatedParams, Response } from "../../../types/commons";
import { SocioFileType, SocioFileTypeBody, UpdateSocioFileTypeParams } from "../../../types/socioFileType";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<SocioFileType> = {
    data: null,
    message: null,
    loading: false,
    error: null,
    indexSuccess: null,
    storeSuccess: null,
    showSuccess: null,
    updateSuccess: null,
    destroySuccess: null,
};

const socioFileTypesSlice = createSlice({
    name: "socioFileTypes",
    initialState,
    reducers: {

        // CLEAR
        clearSocioFileTypesRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        // INDEX
        indexSocioFileTypesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexSocioFileTypesSuccess: (state, action: PayloadAction<Response<SocioFileType[]>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexSocioFileTypesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        // PAGINATED
        paginatedSocioFileTypesRequest: (state, _action: PayloadAction<PaginatedParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedSocioFileTypesSuccess: (state, action: PayloadAction<PaginatedItems<SocioFileType>>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        paginatedSocioFileTypesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        // STORE
        storeSocioFileTypeRequest: (state, _action: PayloadAction<SocioFileTypeBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeSocioFileTypeSuccess: (state, action: PayloadAction<Response<SocioFileType>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeSocioFileTypeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        // SHOW
        showSocioFileTypeRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showSocioFileTypeSuccess: (state, action: PayloadAction<Response<SocioFileType>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showSocioFileTypeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        // UPDATE
        updateSocioFileTypeRequest: (state, _action: PayloadAction<UpdateSocioFileTypeParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateSocioFileTypeSuccess: (state, action: PayloadAction<Response<SocioFileType>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateSocioFileTypeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        // DESTROY
        destroySocioFileTypeRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroySocioFileTypeSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroySocioFileTypeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    },
});

export const {
    clearSocioFileTypesRequest,
    indexSocioFileTypesRequest,
    indexSocioFileTypesSuccess,
    indexSocioFileTypesFailure,
    paginatedSocioFileTypesRequest,
    paginatedSocioFileTypesSuccess,
    paginatedSocioFileTypesFailure,
    storeSocioFileTypeRequest,
    storeSocioFileTypeSuccess,
    storeSocioFileTypeFailure,
    showSocioFileTypeRequest,
    showSocioFileTypeSuccess,
    showSocioFileTypeFailure,
    updateSocioFileTypeRequest,
    updateSocioFileTypeSuccess,
    updateSocioFileTypeFailure,
    destroySocioFileTypeRequest,
    destroySocioFileTypeSuccess,
    destroySocioFileTypeFailure,
} = socioFileTypesSlice.actions;

export default socioFileTypesSlice.reducer;
