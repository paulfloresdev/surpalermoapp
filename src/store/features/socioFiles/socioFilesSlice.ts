import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, Response } from "../../../types/commons";
import { PaginatedItems } from "../../../types/responses";
import { SocioFile, SocioFileBody, SearchSocioFilesParams } from "../../../types/socioFiles";

const initialState: CrudState<SocioFile> = {
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

const socioFilesSlice = createSlice({
    name: "socioFiles",
    initialState,
    reducers: {
        // CLEAR
        clearSocioFilesRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
            state.error = null;
            state.message = null;
        },

        // PAGINATED
        paginatedSocioFilesRequest: (state, _action: PayloadAction<SearchSocioFilesParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedSocioFilesSuccess: (state, action: PayloadAction<Response<PaginatedItems<SocioFile>>>) => {
            state.loading = false;
            state.data = action.payload.data; // PaginatedItems<SocioFile>
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        paginatedSocioFilesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        // STORE
        storeSocioFileRequest: (state, _action: PayloadAction<SocioFileBody>) => {
            state.loading = true;
            state.error = null;
            state.storeSuccess = null;
        },
        storeSocioFileSuccess: (state, action: PayloadAction<Response<SocioFile>>) => {
            state.loading = false;
            state.message = action.payload.message;
            state.storeSuccess = true;
            // opcional: no mutamos listado aquí, normalmente refrescas con paginated
        },
        storeSocioFileFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        // DESTROY
        destroySocioFileRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
            state.destroySuccess = null;
        },
        destroySocioFileSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroySocioFileFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    },
});

export const {
    clearSocioFilesRequest,
    paginatedSocioFilesRequest,
    paginatedSocioFilesSuccess,
    paginatedSocioFilesFailure,
    storeSocioFileRequest,
    storeSocioFileSuccess,
    storeSocioFileFailure,
    destroySocioFileRequest,
    destroySocioFileSuccess,
    destroySocioFileFailure,
} = socioFilesSlice.actions;

export default socioFilesSlice.reducer;
