import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, Response } from "../../../types/commons";
import { DocenteForm, DocenteFormBody, IndexDocenteFormsParams, UpdateDocenteFormParams } from "../../../types/docenteForms";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<DocenteForm> = {
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

const docenteFormSlice = createSlice({
    name: 'docenteForms',
    initialState,
    reducers: {
        //  CLEAR
        clearDocenteFormsRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexDocenteFormsRequest: (state, _action: PayloadAction<IndexDocenteFormsParams>) => {
            state.loading = true;
            state.error = null;
        },
        indexDocenteFormsSuccess: (state, action: PayloadAction<Response<PaginatedItems<DocenteForm>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexDocenteFormsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeDocenteFormRequest: (state, _action: PayloadAction<DocenteFormBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeDocenteFormSuccess: (state, action: PayloadAction<Response<DocenteForm>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeDocenteFormFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showDocenteFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showDocenteFormSuccess: (state, action: PayloadAction<Response<DocenteForm>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showDocenteFormFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        //  UPDATE
        updateDocenteFormRequest: (state, _action: PayloadAction<UpdateDocenteFormParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateDocenteFormSuccess: (state, action: PayloadAction<Response<DocenteForm>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateDocenteFormFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyDocenteFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyDocenteFormSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
        },
        destroyDocenteFormFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        }
    }
});

export const {
    clearDocenteFormsRequest,
    indexDocenteFormsRequest,
    indexDocenteFormsSuccess,
    indexDocenteFormsFailure,
    storeDocenteFormRequest,
    storeDocenteFormSuccess,
    storeDocenteFormFailure,
    showDocenteFormRequest,
    showDocenteFormSuccess,
    showDocenteFormFailure,
    updateDocenteFormRequest,
    updateDocenteFormSuccess,
    updateDocenteFormFailure,
    destroyDocenteFormRequest,
    destroyDocenteFormSuccess,
    destroyDocenteFormFailure,
} = docenteFormSlice.actions;

export default docenteFormSlice.reducer;