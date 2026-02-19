import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, Response } from "../../../types/commons";
import { AsignarNoTicketBody, FacturarByIdBody, FacturarByTicketBody, SearchTicketsParams, StoreTicketBody, Ticket, UpdateTicketParams } from "../../../types/tickets";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<Ticket> = {
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

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        //  CLEAR
        clearTicketRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexTicketsRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        indexTicketsSuccess: (state, action: PayloadAction<Response<Ticket[]>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.indexSuccess = true;
        },
        indexTicketsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.indexSuccess = false;
        },

        //  STORE
        storeTicketRequest: (state, _action: PayloadAction<StoreTicketBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeTicketSuccess: (state, action: PayloadAction<Response<Ticket[]>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.storeSuccess = true;
        },
        storeTicketFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.indexSuccess = false;
        },

        //  SHOW
        showTicketRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showTicketSuccess: (state, action: PayloadAction<Response<Ticket>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.showSuccess = true;
        },
        showTicketFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.showSuccess = false;
        },

        //  UPDATE
        updateTicketRequest: (state, _action: PayloadAction<UpdateTicketParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateTicketSuccess: (state, action: PayloadAction<Response<Ticket>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.updateSuccess = true;
        },
        updateTicketFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyTicketRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyTicketSuccess: (state, action: PayloadAction<Response<null>>) => {
            state.data = null;
            state.message = action.payload.message;
            state.loading = false;
            state.destroySuccess = true;
        },
        destroyTicketFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.destroySuccess = false;
        },

        //  SEARCH 
        searchTicketsRequest: (state, _action: PayloadAction<SearchTicketsParams>) => {
            state.loading = true;
            state.error = null;
        },
        searchTicketsSuccess: (state, action: PayloadAction<Response<PaginatedItems<Ticket>>>) => {
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.loading = false;
            state.indexSuccess = true;
        },
        searchTicketsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.indexSuccess = false;
        },

        //  FACTURAR-BY-TICKET
        facturarByTicketRequest: (state, _action: PayloadAction<FacturarByTicketBody>) => {
            state.loading = true;
            state.error = null;
        },
        facturarByTicketSuccess: (state, action: PayloadAction<Response<number>>) => {
            state.message = action.payload.message;
            state.loading = false;
            state.updateSuccess = true;
        },
        facturarByTicketFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.updateSuccess = false;
        },

        //  FACTURAR-BY-ID
        facturarByIdRequest: (state, _action: PayloadAction<FacturarByIdBody>) => {
            state.loading = true;
            state.error = null;
        },
        facturarByIdSuccess: (state, action: PayloadAction<Response<number>>) => {
            state.message = action.payload.message;
            state.loading = false;
            state.updateSuccess = true;
        },
        facturarByIdFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.updateSuccess = false;
        },

        //  ASIGNAR-NO-TICKET
        asignarNoTicketRequest: (state, _action: PayloadAction<AsignarNoTicketBody>) => {
            state.loading = true;
            state.error = null;
        },
        asignarNoTicketSuccess: (state, action: PayloadAction<Response<number>>) => {
            state.message = action.payload.message;
            state.loading = false;
            state.updateSuccess = true;
        },
        asignarNoTicketFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.updateSuccess = false;
        }
    }
});

export const {
    clearTicketRequest,
    indexTicketsRequest, indexTicketsSuccess, indexTicketsFailure,
    storeTicketRequest, storeTicketSuccess, storeTicketFailure,
    showTicketRequest, showTicketSuccess, showTicketFailure,
    updateTicketRequest, updateTicketSuccess, updateTicketFailure,
    destroyTicketRequest, destroyTicketSuccess, destroyTicketFailure,
    searchTicketsRequest, searchTicketsSuccess, searchTicketsFailure,
    facturarByTicketRequest, facturarByTicketSuccess, facturarByTicketFailure,
    facturarByIdRequest, facturarByIdSuccess, facturarByIdFailure,
    asignarNoTicketRequest, asignarNoTicketSuccess, asignarNoTicketFailure
} = ticketsSlice.actions;

export default ticketsSlice.reducer;