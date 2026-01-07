import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BForm, BFormBody, UpdateBFormParams } from "../../../../types/bform";
import { CrudState, Response } from "../../../../types/commons";
import { PaginatedItems } from "../../../../types/responses";

const initialState: CrudState<BForm> = {
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

const bFormSlice = createSlice({
    name: 'bForm',
    initialState,
    reducers: {
        //  CLEAR
        clearBFormRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexBFormsRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        indexBFormsSuccess: (state, action: PayloadAction<Response<PaginatedItems<BForm>>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.indexSuccess = true;
        },
        indexBFormsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.indexSuccess = false;
        },

        //  STORE
        storeBFormRequest: (state, _action: PayloadAction<BFormBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeBFormSuccess: (state, action: PayloadAction<Response<BForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.storeSuccess = true;
        },
        storeBFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.storeSuccess = false;
        },

        //  SHOW
        showBFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showBFormSuccess: (state, action: PayloadAction<Response<BForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message
            state.loading = false;
            state.showSuccess = true;
        },
        showBFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.showSuccess = false;
        },

        //  UPDATE
        updateBFormRequest: (state, _action: PayloadAction<UpdateBFormParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateBFormSuccess: (state, action: PayloadAction<Response<BForm>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.updateSuccess = true;
        },
        updateBFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyBFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyBFormSuccess: (state, action: PayloadAction<Response<null>>) => {
            state.data = null;
            state.message = action.payload.message;
            state.loading = false;
            state.destroySuccess = true;
        },
        destroyBFormFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearBFormRequest,
    indexBFormsRequest,
    indexBFormsSuccess,
    indexBFormsFailure,
    storeBFormRequest,
    storeBFormSuccess,
    storeBFormFailure,
    showBFormRequest,
    showBFormSuccess,
    showBFormFailure,
    updateBFormRequest,
    updateBFormSuccess,
    updateBFormFailure,
    destroyBFormRequest,
    destroyBFormSuccess,
    destroyBFormFailure,
} = bFormSlice.actions;

export default bFormSlice.reducer;