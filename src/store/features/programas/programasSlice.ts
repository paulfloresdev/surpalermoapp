import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, PaginatedParams } from "../../../types/commons";
import { Programa, ProgramaBody, UpdateProgramaParams } from "../../../types/programas";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Programa> = {
    data: null,
    loading: false,
    error: null,
}

const programasSlice = createSlice({
    name: 'programas',
    initialState,
    reducers: {
        //  INDEX
        indexProgramasRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexProgramasSuccess: (state, action: PayloadAction<Programa[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        indexProgramasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  PAGINATED
        paginatedProgramasRequest: (state, _action: PayloadAction<PaginatedParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedProgramasSuccess: (state, action: PayloadAction<PaginatedItems<Programa>>) => {
            state.loading = false;
            state.data = action.payload;
        },
        paginatedProgramasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  STORE
        storeProgramaRequest: (state, _action: PayloadAction<ProgramaBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeProgramaSuccess: (state, action: PayloadAction<Programa>) => {
            state.loading = false;
            state.data = action.payload;
        },
        storeProgramaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  SHOW
        showProgramaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showProgramaSuccess: (state, action: PayloadAction<Programa>) => {
            state.loading = false;
            state.data = action.payload;
        },
        showProgramaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  UPDATE
        updateProgramaRequest: (state, _action: PayloadAction<UpdateProgramaParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateProgramaSuccess: (state, action: PayloadAction<Programa>) => {
            state.loading = false;
            state.data = action.payload;
        },
        updateProgramaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        //  DESTROY
        destroyProgramaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyProgramaSuccess: (state) => {
            state.loading = false;
            state.data = null;
        },
        destroyProgramaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
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