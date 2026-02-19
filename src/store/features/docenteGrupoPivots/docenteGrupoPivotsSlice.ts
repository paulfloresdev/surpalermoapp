import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, Response } from "../../../types/commons";
import { DocenteGrupoPivot, DocenteGrupoPivotBody, IndexDocenteGrupoPivotsParams, UpdateDocenteGrupoPivotParams } from "../../../types/docenteGrupoPivots";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<DocenteGrupoPivot> = {
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

const docenteGrupoPivotsSlice = createSlice({
    name: 'docenteGrupoPivots',
    initialState,
    reducers: {
        //  CLEAR
        clearDocenteGrupoPivotsRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexDocenteGrupoPivotsRequest: (state, _action: PayloadAction<IndexDocenteGrupoPivotsParams>) => {
            state.loading = true;
            state.error = null;
        },
        indexDocenteGrupoPivotsSuccess: (state, action: PayloadAction<Response<PaginatedItems<DocenteGrupoPivot>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexDocenteGrupoPivotsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeDocenteGrupoPivotRequest: (state, _action: PayloadAction<DocenteGrupoPivotBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeDocenteGrupoPivotSuccess: (state, action: PayloadAction<Response<DocenteGrupoPivot>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeDocenteGrupoPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showDocenteGrupoPivotRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showDocenteGrupoPivotSuccess: (state, action: PayloadAction<Response<DocenteGrupoPivot>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showDocenteGrupoPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        //  UPDATE
        updateDocenteGrupoPivotRequest: (state, _action: PayloadAction<UpdateDocenteGrupoPivotParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateDocenteGrupoPivotSuccess: (state, action: PayloadAction<Response<DocenteGrupoPivot>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateDocenteGrupoPivotFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyDocenteGrupoPivotRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyDocenteGrupoPivotSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.message = action.payload;
            state.destroySuccess = true;
        },
        destroyDocenteGrupoPivotsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearDocenteGrupoPivotsRequest,
    indexDocenteGrupoPivotsRequest,
    indexDocenteGrupoPivotsSuccess,
    indexDocenteGrupoPivotsFailure,
    storeDocenteGrupoPivotRequest,
    storeDocenteGrupoPivotSuccess,
    storeDocenteGrupoPivotFailure,
    showDocenteGrupoPivotRequest,
    showDocenteGrupoPivotSuccess,
    showDocenteGrupoPivotFailure,
    updateDocenteGrupoPivotRequest,
    updateDocenteGrupoPivotSuccess,
    updateDocenteGrupoPivotFailure,
    destroyDocenteGrupoPivotRequest,
    destroyDocenteGrupoPivotSuccess,
    destroyDocenteGrupoPivotsFailure,
} = docenteGrupoPivotsSlice.actions;

export default docenteGrupoPivotsSlice.reducer;