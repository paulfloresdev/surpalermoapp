import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socio, SearchSociosParams } from "../../../../types/socios";
import { PaginatedItems } from "../../../../types/responses";
import { CrudState } from "../../../../types/commons";


const initialState: CrudState<Socio> = {
    data: null,
    loading: false,
    error: null,
}

const searchSociosSlice = createSlice({
    name: 'search-socios',
    initialState,
    reducers: {
        searchSociosRequest: (state, _action: PayloadAction<SearchSociosParams>) => {
            state.loading = true;
            state.error = null;
        },
        searchSociosSuccess: (state, action: PayloadAction<PaginatedItems<Socio>>) => {
            state.loading = false;
            state.data = action.payload;
        },
        searchSociosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    searchSociosRequest,
    searchSociosSuccess,
    searchSociosFailure
} = searchSociosSlice.actions;

export default searchSociosSlice.reducer;