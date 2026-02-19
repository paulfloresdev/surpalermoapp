import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EForm, EFormBody, UpdateEFormParams } from "../../../../types/eform";
import { CrudState, Response } from "../../../../types/commons";
import { PaginatedItems } from "../../../../types/responses";
import { FormParams } from "../../../../types/aform";

const initialState: CrudState<EForm> = {
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

const eFormSlice = createSlice({
    name: 'eForm',
    initialState,
    reducers: {
        //  CLEAR
        clearEFormRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexEFormsRequest: (state, _action: PayloadAction<FormParams>) => {
            state.loading = true;
            state.error = null;
        },
        indexEFormsSuccess: (state, action: PayloadAction<Response<PaginatedItems<EForm>>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.indexSuccess = true;
        },
        indexEFormsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.indexSuccess = false;
        },

        //  STORE
        storeEFormRequest: (state, _action: PayloadAction<EFormBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeEFormSuccess: (state, action: PayloadAction<Response<EForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.storeSuccess = true;
        },
        storeEFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.storeSuccess = false;
        },

        //  SHOW
        showEFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showEFormSuccess: (state, action: PayloadAction<Response<EForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message
            state.loading = false;
            state.showSuccess = true;
        },
        showEFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.showSuccess = false;
        },

        //  UPDATE
        updateEFormRequest: (state, _action: PayloadAction<UpdateEFormParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateEFormSuccess: (state, action: PayloadAction<Response<EForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.updateSuccess = true;
        },
        updateEFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyEFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyEFormSuccess: (state, action: PayloadAction<Response<null>>) => {
            state.data = null;
            state.message = action.payload.message;
            state.loading = false;
            state.destroySuccess = true;
        },
        destroyEFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearEFormRequest,
    indexEFormsRequest,
    indexEFormsSuccess,
    indexEFormsFailure,
    storeEFormRequest,
    storeEFormSuccess,
    storeEFormFailure,
    showEFormRequest,
    showEFormSuccess,
    showEFormFailure,
    updateEFormRequest,
    updateEFormSuccess,
    updateEFormFailure,
    destroyEFormRequest,
    destroyEFormSuccess,
    destroyEFormFailure,
} = eFormSlice.actions;

export default eFormSlice.reducer;