import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, PaginatedParams } from "../../../types/commons";
import { Emergencia, EmergenciaBody, UpdateEmergenciaParams } from "../../../types/emergencias";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Emergencia> = {
    data: null,
    loading: false,
    error: null,
}

const emergenciasSlice = createSlice({
    name: 'emergencias',
    initialState,
    reducers: {
        //  INDEX
        indexEmergenciasRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexEmergenciasSuccess: (state, action: PayloadAction<Emergencia[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        indexEmergenciasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  PAGINATED
        paginatedEmergenciasRequest: (state, _action: PayloadAction<PaginatedParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedEmergenciasSuccess: (state, action: PayloadAction<PaginatedItems<Emergencia>>) => {
            state.loading = false;
            state.data = action.payload;
        },
        paginatedEmergenciasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  STORE
        storeEmergenciaRequest: (state, _action: PayloadAction<EmergenciaBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeEmergenciaSuccess: (state, action: PayloadAction<Emergencia>) => {
            state.loading = false;
            state.data = action.payload;
        },
        storeEmergenciaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // SHOW
        showEmergenciaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showEmergenciaSuccess: (state, action: PayloadAction<Emergencia>) => {
            state.loading = false;
            state.data = action.payload;
        },
        showEmergenciaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateEmergenciaRequest: (state, _action: PayloadAction<UpdateEmergenciaParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateEmergenciaSuccess: (state, action: PayloadAction<Emergencia>) => {
            state.loading = false;
            state.data = action.payload;
        },
        updateEmergenciaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // DESTROY
        destroyEmergenciaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyEmergenciaSuccess: (state) => {
            state.loading = false;
            state.data = null;
        },
        destroyEmergenciaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    indexEmergenciasRequest,
    indexEmergenciasSuccess,
    indexEmergenciasFailure,
    paginatedEmergenciasRequest,
    paginatedEmergenciasSuccess,
    paginatedEmergenciasFailure,
    storeEmergenciaRequest,
    storeEmergenciaSuccess,
    storeEmergenciaFailure,
    showEmergenciaRequest,
    showEmergenciaSuccess,
    showEmergenciaFailure,
    updateEmergenciaRequest,
    updateEmergenciaSuccess,
    updateEmergenciaFailure,
    destroyEmergenciaRequest,
    destroyEmergenciaSuccess,
    destroyEmergenciaFailure,
} = emergenciasSlice.actions;

export default emergenciasSlice.reducer;