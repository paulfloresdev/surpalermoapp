import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, ExcelSearchParams, Response } from "../../../types/commons";
import { Medico, MedicoBody, UpdateMedicoParams } from "../../../types/medicos";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Medico> = {
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

const medicosSlice = createSlice({
    name: 'medicos',
    initialState,
    reducers: {
        //  CLEAR
        clearMedicosRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexMedicosRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexMedicosSuccess: (state, action: PayloadAction<Response<Medico[]>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexMedicosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  PAGINATED INDEX
        paginatedMedicosRequest: (state, _action: PayloadAction<ExcelSearchParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedMedicosSuccess: (state, action: PayloadAction<Response<PaginatedItems<Medico>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        paginatedMedicosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeMedicoRequest: (state, _action: PayloadAction<MedicoBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeMedicoSuccess: (state, action: PayloadAction<Response<Medico>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeMedicoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showMedicoRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showMedicoSuccess: (state, action: PayloadAction<Response<Medico>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showMedicoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },


        //  UPDATE
        updateMedicoRequest: (state, _action: PayloadAction<UpdateMedicoParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateMedicoSuccess: (state, action: PayloadAction<Response<Medico>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateMedicoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyMedicoRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyMedicoSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroyMedicoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearMedicosRequest,
    indexMedicosRequest,
    indexMedicosSuccess,
    indexMedicosFailure,
    paginatedMedicosRequest,
    paginatedMedicosSuccess,
    paginatedMedicosFailure,
    storeMedicoRequest,
    storeMedicoSuccess,
    storeMedicoFailure,
    showMedicoRequest,
    showMedicoSuccess,
    showMedicoFailure,
    updateMedicoRequest,
    updateMedicoSuccess,
    updateMedicoFailure,
    destroyMedicoRequest,
    destroyMedicoSuccess,
    destroyMedicoFailure,
} = medicosSlice.actions;

export default medicosSlice.reducer;