import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, PaginatedParams } from "../../../types/commons";
import { Programa, ProgramaBody, UpdateProgramaParams } from "../../../types/programas";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Programa> = {
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

const programasSlice = createSlice({
    name: 'programas',
    initialState,
    reducers: {
        //  CLEAR
        clearProgramasRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexProgramasRequest: (state, _action: PayloadAction<string | undefined>) => {
            state.loading = true;
            state.error = null;
        },
        indexProgramasSuccess: (state, action: PayloadAction<Programa[]>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        indexProgramasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  PAGINATED
        paginatedProgramasRequest: (state, _action: PayloadAction<PaginatedParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedProgramasSuccess: (state, action: PayloadAction<PaginatedItems<Programa>>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        paginatedProgramasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeProgramaRequest: (state, _action: PayloadAction<ProgramaBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeProgramaSuccess: (state, action: PayloadAction<Programa>) => {
            state.loading = false;
            state.data = action.payload;
            state.storeSuccess = true;
        },
        storeProgramaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showProgramaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showProgramaSuccess: (state, action: PayloadAction<Programa>) => {
            state.loading = false;
            state.data = action.payload;
            state.showSuccess = true;
        },
        showProgramaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        //  UPDATE
        updateProgramaRequest: (state, _action: PayloadAction<UpdateProgramaParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateProgramaSuccess: (state, action: PayloadAction<Programa>) => {
            state.loading = false;
            state.data = action.payload;
            state.updateSuccess = true;
        },
        updateProgramaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyProgramaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyProgramaSuccess: (state) => {
            state.loading = false;
            state.data = null;
            state.destroySuccess = true;
        },
        destroyProgramaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearProgramasRequest,
    indexProgramasRequest,
    indexProgramasSuccess,
    indexProgramasFailure,
    paginatedProgramasRequest,
    paginatedProgramasSuccess,
    paginatedProgramasFailure,
    storeProgramaRequest,
    storeProgramaSuccess,
    storeProgramaFailure,
    showProgramaRequest,
    showProgramaSuccess,
    showProgramaFailure,
    updateProgramaRequest,
    updateProgramaSuccess,
    updateProgramaFailure,
    destroyProgramaRequest,
    destroyProgramaSuccess,
    destroyProgramaFailure,
} = programasSlice.actions;

export default programasSlice.reducer;