import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, PaginatedParams } from "../../../types/commons";
import { Emergencia, EmergenciaBody, PaginatedEmergenciasParams, UpdateEmergenciaParams } from "../../../types/emergencias";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Emergencia> = {
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

const emergenciasSlice = createSlice({
    name: 'emergencias',
    initialState,
    reducers: {
        //  CLEAR
        clearEmergenciasRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexEmergenciasRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexEmergenciasSuccess: (state, action: PayloadAction<Emergencia[]>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        indexEmergenciasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  PAGINATED
        paginatedEmergenciasRequest: (state, _action: PayloadAction<PaginatedEmergenciasParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedEmergenciasSuccess: (state, action: PayloadAction<PaginatedItems<Emergencia>>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        paginatedEmergenciasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeEmergenciaRequest: (state, _action: PayloadAction<EmergenciaBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeEmergenciaSuccess: (state, action: PayloadAction<Emergencia>) => {
            state.loading = false;
            state.data = action.payload;
            state.storeSuccess = true;
        },
        storeEmergenciaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        // SHOW
        showEmergenciaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showEmergenciaSuccess: (state, action: PayloadAction<Emergencia>) => {
            state.loading = false;
            state.data = action.payload;
            state.showSuccess = true;
        },
        showEmergenciaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        // UPDATE
        updateEmergenciaRequest: (state, _action: PayloadAction<UpdateEmergenciaParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateEmergenciaSuccess: (state, action: PayloadAction<Emergencia>) => {
            state.loading = false;
            state.data = action.payload;
            state.updateSuccess = true;
        },
        updateEmergenciaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        // DESTROY
        destroyEmergenciaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyEmergenciaSuccess: (state) => {
            state.loading = false;
            state.data = null;
            state.destroySuccess = true;
        },
        destroyEmergenciaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearEmergenciasRequest,
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