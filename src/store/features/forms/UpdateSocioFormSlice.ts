import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState, KeyUpdate } from "../../../types/commons";
import { SocioBody } from "../../../types/socios";

const initialState: FormState<SocioBody> = {
    data: null,
    loading: false,
    error: null,
}

const updateSocioFormSlice = createSlice({
    name: 'updateSocioForm',
    initialState,
    reducers: {
        //  CLEAR FORM
        clearUpdateSocioForm: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },

        //  INTIAL DATA
        initUpdateSocioForm: (state, _action: PayloadAction<SocioBody>) => {
            state.data = _action.payload;
            state.loading = false;
            state.error = null;
        },

        //  SET FORM FIELD
        setUpdateSocioForm: (state, action: PayloadAction<KeyUpdate<SocioBody>>) => {
            if (!state.data) {
                state.data = {} as Partial<SocioBody>;
            }

            const { key, value } = action.payload;
            state.data[key as keyof typeof state.data] = value as never;
        },

        // VALIDATE FORM
        validateUpdateSocioForm: (state, action: PayloadAction<SocioBody>) => {
            state.error = null;
        }

    }
});

export const {
    clearUpdateSocioForm,
    initUpdateSocioForm,
    setUpdateSocioForm,
    validateUpdateSocioForm,
} = updateSocioFormSlice.actions;

export default updateSocioFormSlice.reducer;