import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, ExcelSearchParams, Response } from "../../../types/commons";
import { Docente, DocenteBody, UpdateDocenteParams } from "../../../types/docentes";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Docente> = {
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

const docentesSlice = createSlice({
    name: 'docentes',
    initialState,
    reducers: {
        //  CLEAR
        clearDocentesRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexDocentesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexDocentesSuccess: (state, action: PayloadAction<Response<Docente[]>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexDocentesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  PAGINATED INDEX
        paginatedDocentesRequest: (state, _action: PayloadAction<ExcelSearchParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedDocentesSuccess: (state, action: PayloadAction<Response<PaginatedItems<Docente>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        paginatedDocentesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeDocenteRequest: (state, _action: PayloadAction<DocenteBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeDocenteSuccess: (state, action: PayloadAction<Response<Docente>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeDocenteFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showDocenteRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showDocenteSuccess: (state, action: PayloadAction<Response<Docente>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showDocenteFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        // UPDATE
        updateDocenteRequest: (state, _action: PayloadAction<UpdateDocenteParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateDocenteSuccess: (state, action: PayloadAction<Response<Docente>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateDocenteFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyDocenteRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyDocenteSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroyDocenteFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearDocentesRequest,
    indexDocentesRequest,
    indexDocentesSuccess,
    indexDocentesFailure,
    paginatedDocentesRequest,
    paginatedDocentesSuccess,
    paginatedDocentesFailure,
    storeDocenteRequest,
    storeDocenteSuccess,
    storeDocenteFailure,
    showDocenteRequest,
    showDocenteSuccess,
    showDocenteFailure,
    updateDocenteRequest,
    updateDocenteSuccess,
    updateDocenteFailure,
    destroyDocenteRequest,
    destroyDocenteSuccess,
    destroyDocenteFailure,
} = docentesSlice.actions;

export default docentesSlice.reducer;