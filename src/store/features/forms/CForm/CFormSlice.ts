import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, Response } from "../../../../types/commons";
import { CForm, CFormBody, UpdateCFormParams } from "../../../../types/cform";
import { PaginatedItems } from "../../../../types/responses";
import { FormParams } from "../../../../types/aform";

const initialState: CrudState<CForm> = {
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

const cFormSlice = createSlice({
    name: 'cForm',
    initialState,
    reducers: {
        //  CLEAR
        clearCFormRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexCFormsRequest: (state, _action: PayloadAction<FormParams>) => {
            state.loading = true;
            state.error = null;
        },
        indexCFormsSuccess: (state, action: PayloadAction<Response<PaginatedItems<CForm>>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.indexSuccess = true;

        },
        indexCFormsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.indexSuccess = false;
        },

        //  STORE
        storeCFormRequest: (state, _action: PayloadAction<CFormBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeCFormSuccess: (state, action: PayloadAction<Response<CForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.storeSuccess = true;
        },
        storeCFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.storeSuccess = false;
        },

        //  SHOW
        showCFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showCFormSuccess: (state, action: PayloadAction<Response<CForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.showSuccess = true;
        },
        showCFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.showSuccess = false;
        },

        //  UPDATE
        updateCFormRequest: (state, _action: PayloadAction<UpdateCFormParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateCFormSuccess: (state, action: PayloadAction<Response<CForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.updateSuccess = true;
        },
        updateCFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyCFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyCFormSuccess: (state, action: PayloadAction<Response<CForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.destroySuccess = true;
        },
        destroyCFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearCFormRequest,
    indexCFormsRequest,
    indexCFormsSuccess,
    indexCFormsFailure,
    storeCFormRequest,
    storeCFormSuccess,
    storeCFormFailure,
    showCFormRequest,
    showCFormSuccess,
    showCFormFailure,
    updateCFormRequest,
    updateCFormSuccess,
    updateCFormFailure,
    destroyCFormRequest,
    destroyCFormSuccess,
    destroyCFormFailure,
} = cFormSlice.actions;

export default cFormSlice.reducer;