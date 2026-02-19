import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DForm, DFormBody, UpdateDFormParams } from "../../../../types/dform";
import { CrudState, Response } from "../../../../types/commons";
import { PaginatedItems } from "../../../../types/responses";
import { FormParams } from "../../../../types/aform";

const initialState: CrudState<DForm> = {
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

const dFormSlice = createSlice({
    name: 'dForm',
    initialState,
    reducers: {
        //  CLEAR
        clearDFormRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexDFormsRequest: (state, _action: PayloadAction<FormParams>) => {
            state.loading = true;
            state.error = null;
        },
        indexDFormsSuccess: (state, action: PayloadAction<Response<PaginatedItems<DForm>>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.indexSuccess = true;
        },
        indexDFormsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.indexSuccess = false;
        },

        //  STORE
        storeDFormRequest: (state, _action: PayloadAction<DFormBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeDFormSuccess: (state, action: PayloadAction<Response<DForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.storeSuccess = true;
        },
        storeDFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.storeSuccess = false;
        },

        //  SHOW
        showDFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showDFormSuccess: (state, action: PayloadAction<Response<DForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message
            state.loading = false;
            state.showSuccess = true;
        },
        showDFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.showSuccess = false;
        },

        //  UPDATE
        updateDFormRequest: (state, _action: PayloadAction<UpdateDFormParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateDFormSuccess: (state, action: PayloadAction<Response<DForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.updateSuccess = true;
        },
        updateDFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyDFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyDFormSuccess: (state, action: PayloadAction<Response<null>>) => {
            state.data = null;
            state.message = action.payload.message;
            state.loading = false;
            state.destroySuccess = true;
        },
        destroyDFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearDFormRequest,
    indexDFormsRequest,
    indexDFormsSuccess,
    indexDFormsFailure,
    storeDFormRequest,
    storeDFormSuccess,
    storeDFormFailure,
    showDFormRequest,
    showDFormSuccess,
    showDFormFailure,
    updateDFormRequest,
    updateDFormSuccess,
    updateDFormFailure,
    destroyDFormRequest,
    destroyDFormSuccess,
    destroyDFormFailure,
} = dFormSlice.actions;

export default dFormSlice.reducer;