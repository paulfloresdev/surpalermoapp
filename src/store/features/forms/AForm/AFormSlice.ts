import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AForm, AFormBody, FormParams, UpdateAFormParams } from "../../../../types/aform";
import { CrudState, Response } from "../../../../types/commons";
import { PaginatedItems } from "../../../../types/responses";

const initialState: CrudState<AForm> = {
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

const aFormSlice = createSlice({
    name: 'aForm',
    initialState,
    reducers: {
        //  CLEAR
        clearAFormRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexAFormsRequest: (state, _action: PayloadAction<FormParams>) => {
            state.loading = true;
            state.error = null;
        },
        indexAFormsSuccess: (state, action: PayloadAction<Response<PaginatedItems<AForm>>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.indexSuccess = true;
        },
        indexAFormsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.indexSuccess = false;
        },

        //  STORE
        storeAFormRequest: (state, _action: PayloadAction<AFormBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeAFormSuccess: (state, action: PayloadAction<Response<AForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.storeSuccess = true;
        },
        storeAFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.storeSuccess = false;
        },

        //  SHOW
        showAFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showAFormSuccess: (state, action: PayloadAction<Response<AForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message
            state.loading = false;
            state.showSuccess = true;
        },
        showAFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.showSuccess = false;
        },

        //  UPDATE
        updateAFormRequest: (state, _action: PayloadAction<UpdateAFormParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateAFormSuccess: (state, action: PayloadAction<Response<AForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message
            state.loading = false;
            state.updateSuccess = true;
        },
        updateAFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyAFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyAFormSuccess: (state, action: PayloadAction<Response<null>>) => {
            state.data = null;
            state.message = action.payload.message
            state.loading = false;
            state.destroySuccess = true;
        },
        destroyAFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearAFormRequest,
    indexAFormsRequest, indexAFormsSuccess, indexAFormsFailure,
    storeAFormRequest, storeAFormSuccess, storeAFormFailure,
    showAFormRequest, showAFormSuccess, showAFormFailure,
    updateAFormRequest, updateAFormSuccess, updateAFormFailure,
    destroyAFormRequest, destroyAFormSuccess, destroyAFormFailure,
} = aFormSlice.actions;

export default aFormSlice.reducer;