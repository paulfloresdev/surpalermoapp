import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Localidad, LocalidadBody, UpdateLocalidadParams } from "../../../types/localidades";
import { CrudState, PaginatedParams } from "../../../types/commons";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Localidad> = {
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

const localidadesSlice = createSlice({
    name: 'localidades',
    initialState,
    reducers: {
        //  CLEAR
        clearLocalidadesRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexLocalidadesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexLocalidadesSuccess: (state, action: PayloadAction<Localidad[]>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        indexLocalidadesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        // PAGINATED
        paginatedLocalidadesRequest: (state, _action: PayloadAction<PaginatedParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedLocalidadesSuccess: (state, action: PayloadAction<PaginatedItems<Localidad>>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        paginatedLocalidadesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        // STORE
        storeLocalidadRequest: (state, _action: PayloadAction<LocalidadBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeLocalidadSuccess: (state, action: PayloadAction<Localidad>) => {
            state.loading = false;
            state.data = action.payload;
            state.storeSuccess = true;
        },
        storeLocalidadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        // SHOW
        showLocalidadRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showLocalidadSuccess: (state, action: PayloadAction<Localidad>) => {
            state.loading = false;
            state.data = action.payload;
            state.showSuccess = true;
        },
        showLocalidadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        // UPDATE
        updateLocalidadRequest: (state, _action: PayloadAction<UpdateLocalidadParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateLocalidadSuccess: (state, action: PayloadAction<Localidad>) => {
            state.loading = false;
            state.data = action.payload;
            state.updateSuccess = true;
        },
        updateLocalidadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        // DESTROY
        destroyLocalidadRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyLocalidadSuccess: (state) => {
            state.loading = false;
            state.data = null;
            state.destroySuccess = true;
        },
        destroyLocalidadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearLocalidadesRequest,
    indexLocalidadesRequest,
    indexLocalidadesSuccess,
    indexLocalidadesFailure,
    paginatedLocalidadesRequest,
    paginatedLocalidadesSuccess,
    paginatedLocalidadesFailure,
    storeLocalidadRequest,
    storeLocalidadSuccess,
    storeLocalidadFailure,
    showLocalidadRequest,
    showLocalidadSuccess,
    showLocalidadFailure,
    updateLocalidadRequest,
    updateLocalidadSuccess,
    updateLocalidadFailure,
    destroyLocalidadRequest,
    destroyLocalidadSuccess,
    destroyLocalidadFailure,
} = localidadesSlice.actions;

export default localidadesSlice.reducer;
