import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, Response } from "../../../types/commons";
import { PaginatedItems } from "../../../types/responses";
import { Coordinador, CoordinadorBody, IndexCoordinadoresParams, UpdateCoordinadorParams } from "../../../types/coordinadores";

const initialState: CrudState<Coordinador> = {
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

const coordinadoresSlice = createSlice({
    name: 'coordinadores',
    initialState,
    reducers: {
        //  CLEAR
        clearCoordinadoresRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexCoordinadoresRequest: (state, _action: PayloadAction<IndexCoordinadoresParams>) => {
            state.loading = true;
            state.error = null;
        },
        indexCoordinadoresSuccess: (state, action: PayloadAction<Response<PaginatedItems<Coordinador>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexCoordinadoresFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeCoordinadorRequest: (state, _action: PayloadAction<CoordinadorBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeCoordinadorSuccess: (state, action: PayloadAction<Response<Coordinador>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeCoordinadorFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showCoordinadorRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showCoordinadorSuccess: (state, action: PayloadAction<Response<Coordinador>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showCoordinadorFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        //  UPDATE
        updateCoordinadorRequest: (state, _action: PayloadAction<UpdateCoordinadorParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateCoordinadorSuccess: (state, action: PayloadAction<Response<Coordinador>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateCoordinadorFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyCoordinadorRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyCoordinadorSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroyCoordinadorsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearCoordinadoresRequest,
    indexCoordinadoresRequest,
    indexCoordinadoresSuccess,
    indexCoordinadoresFailure,
    storeCoordinadorRequest,
    storeCoordinadorSuccess,
    storeCoordinadorFailure,
    showCoordinadorRequest,
    showCoordinadorSuccess,
    showCoordinadorFailure,
    updateCoordinadorRequest,
    updateCoordinadorSuccess,
    updateCoordinadorFailure,
    destroyCoordinadorRequest,
    destroyCoordinadorSuccess,
    destroyCoordinadorsFailure,
} = coordinadoresSlice.actions;

export default coordinadoresSlice.reducer;