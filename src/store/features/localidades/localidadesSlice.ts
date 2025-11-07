import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Localidad, LocalidadBody, UpdateLocalidadParams } from "../../../types/localidades";
import { CrudState, PaginatedParams } from "../../../types/commons";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Localidad> = {
    data: null,
    loading: false,
    error: null,
}

const localidadesSlice = createSlice({
    name: 'localidades',
    initialState,
    reducers: {
        //  INDEX
        indexLocalidadesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexLocalidadesSuccess: (state, action: PayloadAction<Localidad[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        indexLocalidadesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // PAGINATED
        paginatedLocalidadesRequest: (state, _action: PayloadAction<PaginatedParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedLocalidadesSuccess: (state, action: PayloadAction<PaginatedItems<Localidad>>) => {
            state.loading = false;
            state.data = action.payload;
        },
        paginatedLocalidadesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // STORE
        storeLocalidadRequest: (state, _action: PayloadAction<LocalidadBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeLocalidadSuccess: (state, action: PayloadAction<Localidad>) => {
            state.loading = false;
            state.data = action.payload;
        },
        storeLocalidadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // SHOW
        showLocalidadRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showLocalidadSuccess: (state, action: PayloadAction<Localidad>) => {
            state.loading = false;
            state.data = action.payload;
        },
        showLocalidadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateLocalidadRequest: (state, _action: PayloadAction<UpdateLocalidadParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateLocalidadSuccess: (state, action: PayloadAction<Localidad>) => {
            state.loading = false;
            state.data = action.payload;
        },
        updateLocalidadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // DESTROY
        destroyLocalidadRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyLocalidadSuccess: (state) => {
            state.loading = false;
            state.data = null;
        },
        destroyLocalidadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
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
