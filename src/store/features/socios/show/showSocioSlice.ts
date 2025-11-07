import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socio } from "../../../../types/socios";
import { CrudState } from "../../../../types/commons";

const initialState: CrudState<Socio> = {
    data: null,
    loading: false,
    error: null,
}

const showSocioSlice = createSlice({
    name: 'show-socio',
    initialState,
    reducers: {
        showSocioRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showSocioSuccess: (state, action: PayloadAction<Socio>) => {
            state.loading = false;
            state.data = action.payload;
        },
        showSocioFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    showSocioRequest,
    showSocioSuccess,
    showSocioFailure
} = showSocioSlice.actions;

export default showSocioSlice.reducer;