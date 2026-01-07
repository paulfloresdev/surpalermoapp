import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState } from "../../../types/commons";
import { Mutualista, MutualistaBody, SearchMutualistasParams, UpdateMutualistaParams } from "../../../types/mutualistas";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Mutualista> = {
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

const mutualistasSlice = createSlice({
    name: 'mutualistas',
    initialState,
    reducers: {
        //  CLEAR
        clearMutualistasRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexMutualistasRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexMutualistasSuccess: (state, action: PayloadAction<Mutualista[]>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        indexMutualistasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        // SEARCH
        searchMutualistasRequest: (state, _action: PayloadAction<SearchMutualistasParams>) => {
            state.loading = true;
            state.error = null;
        },
        searchMutualistasSuccess: (state, action: PayloadAction<PaginatedItems<Mutualista>>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        searchMutualistasFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        // STORE
        storeMutualistaRequest: (state, _action: PayloadAction<MutualistaBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeMutualistaSuccess: (state, action: PayloadAction<Mutualista>) => {
            state.loading = false;
            state.data = action.payload;
            state.storeSuccess = true;
        },
        storeMutualistaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        // SHOW
        showMutualistaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showMutualistaSuccess: (state, action: PayloadAction<Mutualista>) => {
            state.loading = false;
            state.data = action.payload;
            state.showSuccess = true;
        },
        showMutualistaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        // UPDATE
        updateMutualistaRequest: (state, _action: PayloadAction<UpdateMutualistaParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateMutualistaSuccess: (state, action: PayloadAction<Mutualista>) => {
            state.loading = false;
            state.data = action.payload;
            state.updateSuccess = true;
        },
        updateMutualistaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        // DESTROY
        destroyMutualistaRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyMutualistaSuccess: (state) => {
            state.loading = false;
            state.data = null;
            state.destroySuccess = true;
        },
        destroyMutualistaFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearMutualistasRequest,
    indexMutualistasRequest,
    indexMutualistasSuccess,
    indexMutualistasFailure,
    searchMutualistasRequest,
    searchMutualistasSuccess,
    searchMutualistasFailure,
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