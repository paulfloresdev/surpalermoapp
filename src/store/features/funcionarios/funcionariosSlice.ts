import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Funcionario, FuncionarioBody, UpdateFuncionarioParams } from "../../../types/funcionarios";
import { CrudState, ExcelSearchParams, Response } from "../../../types/commons";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Funcionario> = {
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

const funcionariosSlice = createSlice({
    name: 'funcionarios',
    initialState,
    reducers: {
        //  CLEAR
        clearFuncionariosRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexFuncionariosRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexFuncionariosSuccess: (state, action: PayloadAction<Response<Funcionario[]>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexFuncionariosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  PAGINATED INDEX
        paginatedFuncionariosRequest: (state, _action: PayloadAction<ExcelSearchParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedFuncionariosSuccess: (state, action: PayloadAction<Response<PaginatedItems<Funcionario>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        paginatedFuncionariosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeFuncionarioRequest: (state, _action: PayloadAction<FuncionarioBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeFuncionarioSuccess: (state, action: PayloadAction<Response<Funcionario>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeFuncionarioFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showFuncionarioRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showFuncionarioSuccess: (state, action: PayloadAction<Response<Funcionario>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showFuncionarioFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        //  UPDATE
        updateFuncionarioRequest: (state, _action: PayloadAction<UpdateFuncionarioParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateFuncionarioSuccess: (state, action: PayloadAction<Response<Funcionario>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateFuncionarioFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyFuncionarioRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyFuncionarioSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroyFuncionarioFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearFuncionariosRequest,
    indexFuncionariosRequest,
    indexFuncionariosSuccess,
    indexFuncionariosFailure,
    paginatedFuncionariosRequest,
    paginatedFuncionariosSuccess,
    paginatedFuncionariosFailure,
    storeFuncionarioRequest,
    storeFuncionarioSuccess,
    storeFuncionarioFailure,
    showFuncionarioRequest,
    showFuncionarioSuccess,
    showFuncionarioFailure,
    updateFuncionarioRequest,
    updateFuncionarioSuccess,
    updateFuncionarioFailure,
    destroyFuncionarioRequest,
    destroyFuncionarioSuccess,
    destroyFuncionarioFailure,
} = funcionariosSlice.actions;

export default funcionariosSlice.reducer;