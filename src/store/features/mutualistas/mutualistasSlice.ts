import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, PaginatedParams } from "../../../types/commons";
import { Mutualista, MutualistaBody, UpdateMutualistaParams } from "../../../types/mutualistas";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Mutualista> = {
    data: null,
    loading: false,
    error: null,
}

const mutualistasSlice = createSlice({
    name: 'mutualistas',
    initialState,
    reducers: {
        //  INDEX
        indexMutualistasRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexMutualistasSuccess: (state, action: PayloadAction<Mutualista[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        indexMutualistasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // PAGINATED
        paginatedMutualistasRequest: (state, _action: PayloadAction<PaginatedParams>) => {
            state.loading = true;
            state.error = null;
        },
        paginatedMutualistasSuccess: (state, action: PayloadAction<PaginatedItems<Mutualista>>) => {
            state.loading = false;
            state.data = action.payload;
        },
        paginatedMutualistasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // STORE
        storeMutualistaRequest: (state, _action: PayloadAction<MutualistaBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeMutualistaSuccess: (state, action: PayloadAction<Mutualista>) => {
            state.loading = false;
            state.data = action.payload;
        },
        storeMutualistaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // SHOW
        showMutualistaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showMutualistaSuccess: (state, action: PayloadAction<Mutualista>) => {
            state.loading = false;
            state.data = action.payload;
        },
        showMutualistaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateMutualistaRequest: (state, _action: PayloadAction<UpdateMutualistaParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateMutualistaSuccess: (state, action: PayloadAction<Mutualista>) => {
            state.loading = false;
            state.data = action.payload;
        },
        updateMutualistaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // DESTROY
        destroyMutualistaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyMutualistaSuccess: (state) => {
            state.loading = false;
        },
        destroyMutualistaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    indexMutualistasRequest,
    indexMutualistasSuccess,
    indexMutualistasFailure,
    paginatedMutualistasRequest,
    paginatedMutualistasSuccess,
    paginatedMutualistasFailure,
    storeMutualistaRequest,
    storeMutualistaSuccess,
    storeMutualistaFailure,
    showMutualistaRequest,
    showMutualistaSuccess,
    showMutualistaFailure,
    updateMutualistaRequest,
    updateMutualistaSuccess,
    updateMutualistaFailure,
    destroyMutualistaRequest,
    destroyMutualistaSuccess,
    destroyMutualistaFailure
} = mutualistasSlice.actions;

export default mutualistasSlice.reducer;