import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState } from "../../../types/commons";
import { SearchSocioProgramaPivotsParams, SocioProgramaPivot, SocioProgramaPivotBody, UpdateSocioProgramaPivotParams } from "../../../types/socioProgramaPivots";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<SocioProgramaPivot> = {
    data: null,
    loading: false,
    error: null,
}

const socioProgramaPivotsSlice = createSlice({
    name: 'socioProgramaPivots',
    initialState,
    reducers: {
        //  INDEX
        indexSocioProgramaPivotsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        indexSocioProgramaPivotsSuccess: (state, action: PayloadAction<SocioProgramaPivot[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        indexSocioProgramaPivotsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // STORE
        storeSocioProgramaPivotRequest: (state, _action: PayloadAction<SocioProgramaPivotBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeSocioProgramaPivotSuccess: (state, action: PayloadAction<SocioProgramaPivot>) => {
            state.loading = false;
            state.data = action.payload;
        },
        storeSocioProgramaPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // SHOW
        showSocioProgramaPivotRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showSocioProgramaPivotSuccess: (state, action: PayloadAction<SocioProgramaPivot>) => {
            state.loading = false;
            state.data = action.payload;
        },
        showSocioProgramaPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // UPDATE
        updateSocioProgramaPivotRequest: (state, _action: PayloadAction<UpdateSocioProgramaPivotParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateSocioProgramaPivotSuccess: (state, action: PayloadAction<SocioProgramaPivot>) => {
            state.loading = false;
            state.data = action.payload;
        },
        updateSocioProgramaPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // DESTROY
        destroySocioProgramaPivotRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroySocioProgramaPivotSuccess: (state) => {
            state.loading = false;
            state.data = null;
        },
        destroySocioProgramaPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // SEARCH
        searchSocioProgramaPivotsRequest: (state, _action: PayloadAction<SearchSocioProgramaPivotsParams>) => {
            state.loading = true;
            state.error = null;
        },
        searchSocioProgramaPivotsSuccess: (state, action: PayloadAction<PaginatedItems<SocioProgramaPivot>>) => {
            state.loading = false;
            state.data = action.payload;
        },
        searchSocioProgramaPivotsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
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