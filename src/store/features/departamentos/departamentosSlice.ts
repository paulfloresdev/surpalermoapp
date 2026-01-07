import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Departamento, DepartamentoBody, UpdateDepartamentoParams } from "../../../types/departamentos";
import { PaginatedItems } from "../../../types/responses";
import { CrudState, PaginatedParams, Response } from "../../../types/commons";

const initialState: CrudState<Departamento> = {
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

const departamentosSlice = createSlice({
    name: 'departamentos',
    initialState,
    reducers: {
        //  CLEAR
        clearDepartamentosRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexDepartamentosRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexDepartamentosSuccess: (state, action: PayloadAction<Response<Departamento[]>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexDepartamentosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  PAGINATED
        paginatedDepartamentosRequest: (state, _action: PayloadAction<PaginatedParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedDepartamentosSuccess: (state, action: PayloadAction<Response<PaginatedItems<Departamento>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        paginatedDepartamentosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeDepartamentoRequest: (state, _action: PayloadAction<DepartamentoBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeDepartamentoSuccess: (state, action: PayloadAction<Response<Departamento>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeDepartamentoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showDepartamentoRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showDepartamentoSuccess: (state, action: PayloadAction<Response<Departamento>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showDepartamentoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        //  UPDATE
        updateDepartamentoRequest: (state, _action: PayloadAction<UpdateDepartamentoParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateDepartamentoSuccess: (state, action: PayloadAction<Response<Departamento>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateDepartamentoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyDepartamentoRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyDepartamentoSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroyDepartamentoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearDepartamentosRequest,
    indexDepartamentosRequest,
    indexDepartamentosSuccess,
    indexDepartamentosFailure,
    paginatedDepartamentosRequest,
    paginatedDepartamentosSuccess,
    paginatedDepartamentosFailure,
    storeDepartamentoRequest,
    storeDepartamentoSuccess,
    storeDepartamentoFailure,
    showDepartamentoRequest,
    showDepartamentoSuccess,
    showDepartamentoFailure,
    updateDepartamentoRequest,
    updateDepartamentoSuccess,
    updateDepartamentoFailure,
    destroyDepartamentoRequest,
    destroyDepartamentoSuccess,
    destroyDepartamentoFailure,
} = departamentosSlice.actions;

export default departamentosSlice.reducer;