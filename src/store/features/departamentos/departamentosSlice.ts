import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Departamento, DepartamentoBody, UpdateDepartamentoParams } from "../../../types/departamentos";
import { PaginatedItems } from "../../../types/responses";
import { CrudState, PaginatedParams } from "../../../types/commons";

const initialState: CrudState<Departamento> = {
    data: null,
    loading: false,
    error: null,
}

const departamentosSlice = createSlice({
    name: 'departamentos',
    initialState,
    reducers: {
        //  INDEX
        indexDepartamentosRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexDepartamentosSuccess: (state, action: PayloadAction<Departamento[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        indexDepartamentosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  PAGINATED
        paginatedDepartamentosRequest: (state, _action: PayloadAction<PaginatedParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedDepartamentosSuccess: (state, action: PayloadAction<PaginatedItems<Departamento>>) => {
            state.loading = false;
            state.data = action.payload;
        },
        paginatedDepartamentosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  STORE
        storeDepartamentoRequest: (state, _action: PayloadAction<DepartamentoBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeDepartamentoSuccess: (state, action: PayloadAction<Departamento>) => {
            state.loading = false;
            state.data = action.payload;
        },
        storeDepartamentoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  SHOW
        showDepartamentoRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showDepartamentoSuccess: (state, action: PayloadAction<Departamento>) => {
            state.loading = false;
            state.data = action.payload;
        },
        showDepartamentoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  UPDATE
        updateDepartamentoRequest: (state, _action: PayloadAction<UpdateDepartamentoParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateDepartamentoSuccess: (state, action: PayloadAction<Departamento>) => {
            state.loading = false;
            state.data = action.payload;
        },
        updateDepartamentoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  DESTROY
        destroyDepartamentoRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyDepartamentoSuccess: (state) => {
            state.loading = false;
            state.data = null;
        },
        destroyDepartamentoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
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