import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrudState, Response } from "../../../types/commons";
import { GroupForm, GroupFormBody, IndexGroupFormsParams, UpdateGroupFormParams } from "../../../types/groupForms";
import { PaginatedItems } from "../../../types/responses";

const initialState: CrudState<GroupForm> = {
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

const groupFormsSlice = createSlice({
    name: 'groupForms',
    initialState,
    reducers: {
        //  CLEAR
        clearGroupFormsRequest: (state) => {
            state.indexSuccess = null;
            state.storeSuccess = null;
            state.showSuccess = null;
            state.updateSuccess = null;
            state.destroySuccess = null;
        },

        //  INDEX
        indexGroupFormsRequest: (state, _action: PayloadAction<IndexGroupFormsParams>) => {
            state.loading = true;
            state.error = null;
        },
        indexGroupFormsSuccess: (state, action: PayloadAction<Response<PaginatedItems<GroupForm>>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.indexSuccess = true;
        },
        indexGroupFormsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.indexSuccess = false;
        },

        //  STORE
        storeGroupFormRequest: (state, _action: PayloadAction<GroupFormBody>) => {
            state.loading = true;
            state.error = null;
        },
        storeGroupFormSuccess: (state, action: PayloadAction<Response<GroupForm>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.storeSuccess = true;
        },
        storeGroupFormFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.storeSuccess = false;
        },

        //  SHOW
        showGroupFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        showGroupFormSuccess: (state, action: PayloadAction<Response<GroupForm>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.showSuccess = true;
        },
        showGroupFormFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.showSuccess = false;
        },

        //  UPDATE
        updateGroupFormRequest: (state, _action: PayloadAction<UpdateGroupFormParams>) => {
            state.loading = true;
            state.error = null;
        },
        updateGroupFormSuccess: (state, action: PayloadAction<Response<GroupForm>>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.updateSuccess = true;
        },
        updateGroupFormFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.updateSuccess = false;
        },

        //  DESTROY
        destroyGroupFormRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        destroyGroupFormSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.message = action.payload;
        },
        destroyGroupFormFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.destroySuccess = false;
        },
    }
});

export const {
    clearGroupFormsRequest,
    indexGroupFormsRequest,
    indexGroupFormsSuccess,
    indexGroupFormsFailure,
    storeGroupFormRequest,
    storeGroupFormSuccess,
    storeGroupFormFailure,
    showGroupFormRequest,
    showGroupFormSuccess,
    showGroupFormFailure,
    updateGroupFormRequest,
    updateGroupFormSuccess,
    updateGroupFormFailure,
    destroyGroupFormRequest,
    destroyGroupFormSuccess,
    destroyGroupFormFailure,
} = groupFormsSlice.actions;

export default groupFormsSlice.reducer;