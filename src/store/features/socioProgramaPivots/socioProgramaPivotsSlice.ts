import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState } from "../../../types/commons";
import { SearchSocioProgramaPivotsParams, SocioProgramaPivot, SocioProgramaPivotBody, UpdateSocioProgramaPivotParams } from "../../../types/socioProgramaPivots";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<SocioProgramaPivot> = {
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

const socioProgramaPivotsSlice = createSlice({
    name: 'socioProgramaPivots',
    initialState,
    reducers: {
        //  CLEAR
        clearSocioProgramaPivotsRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexSocioProgramaPivotsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexSocioProgramaPivotsSuccess: (state, action: PayloadAction<SocioProgramaPivot[]>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        indexSocioProgramaPivotsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        // STORE
        storeSocioProgramaPivotRequest: (state, _action: PayloadAction<SocioProgramaPivotBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeSocioProgramaPivotSuccess: (state, action: PayloadAction<SocioProgramaPivot>) => {
            state.loading = false;
            state.data = action.payload;
            state.storeSuccess = true;
        },
        storeSocioProgramaPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        // SHOW
        showSocioProgramaPivotRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showSocioProgramaPivotSuccess: (state, action: PayloadAction<SocioProgramaPivot>) => {
            state.loading = false;
            state.data = action.payload;
            state.showSuccess = true;
        },
        showSocioProgramaPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        // UPDATE
        updateSocioProgramaPivotRequest: (state, _action: PayloadAction<UpdateSocioProgramaPivotParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateSocioProgramaPivotSuccess: (state, action: PayloadAction<SocioProgramaPivot>) => {
            state.loading = false;
            state.data = action.payload;
            state.updateSuccess = true;
        },
        updateSocioProgramaPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        // DESTROY
        destroySocioProgramaPivotRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroySocioProgramaPivotSuccess: (state) => {
            state.loading = false;
            state.data = null;
            state.destroySuccess = true;
        },
        destroySocioProgramaPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },

        // SEARCH
        searchSocioProgramaPivotsRequest: (state, _action: PayloadAction<SearchSocioProgramaPivotsParams>) => {
            state.loading = true;
            state.error = null;
        },
        searchSocioProgramaPivotsSuccess: (state, action: PayloadAction<PaginatedItems<SocioProgramaPivot>>) => {
            state.loading = false;
            state.data = action.payload;
            state.indexSuccess = true;
        },
        searchSocioProgramaPivotsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },
    }
});

export const {
    clearSocioProgramaPivotsRequest,
    indexSocioProgramaPivotsRequest,
    indexSocioProgramaPivotsSuccess,
    indexSocioProgramaPivotsFailure,
    storeSocioProgramaPivotRequest,
    storeSocioProgramaPivotSuccess,
    storeSocioProgramaPivotFailure,
    showSocioProgramaPivotRequest,
    showSocioProgramaPivotSuccess,
    showSocioProgramaPivotFailure,
    updateSocioProgramaPivotRequest,
    updateSocioProgramaPivotSuccess,
    updateSocioProgramaPivotFailure,
    destroySocioProgramaPivotRequest,
    destroySocioProgramaPivotSuccess,
    destroySocioProgramaPivotFailure,
    searchSocioProgramaPivotsRequest,
    searchSocioProgramaPivotsSuccess,
    searchSocioProgramaPivotsFailure,
} = socioProgramaPivotsSlice.actions;

export default socioProgramaPivotsSlice.reducer;