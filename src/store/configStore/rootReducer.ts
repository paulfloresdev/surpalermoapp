import { combineReducers } from '@reduxjs/toolkit'

// API
import authReducer from '../features/auth/authSlice';
import sociosReducer from '../features/socios/sociosSlice';
import departamentosReducer from '../features/departamentos/departamentosSlice';
import localidadesReducer from '../features/localidades/localidadesSlice';
import mutualistasReducer from '../features/mutualistas/mutualistasSlice';
import emergenciasReducer from '../features/emergencias/emergenciasSlice';
import programasReducer from '../features/programas/programasSlice';
import socioProgramaPivotsReducer from '../features/socioProgramaPivots/socioProgramaPivotsSlice';
import gruposReducer from '../features/grupos/gruposSlice';
import socioGrupoPivotsReducer from '../features/socioGrupoPivots/socioGrupoPivotsSlice';

// FORMS
import updateSocioFormSlice from '../features/forms/UpdateSocioFormSlice';
import aFormSlice from '../features/forms/AForm/AFormSlice';
import bFormSlice from '../features/forms/BForm/BFormSlice';
import cFormSlice from '../features/forms/CForm/CFormSlice';
import dFormSlice from '../features/forms/DForm/DFormSlice';
import eFormSlice from '../features/forms/EForm/EFormSlice';

const rootReducer = combineReducers({
    // API
    auth: authReducer,
    socios: sociosReducer,
    departamentos: departamentosReducer,
    localidades: localidadesReducer,
    mutualistas: mutualistasReducer,
    emergencias: emergenciasReducer,
    programas: programasReducer,
    socioProgramaPivots: socioProgramaPivotsReducer,
    grupos: gruposReducer,
    socioGrupoPivots: socioGrupoPivotsReducer,

    // FORMS
    updateSocioForm: updateSocioFormSlice,
    aForm: aFormSlice,
    bForm: bFormSlice,
    cForm: cFormSlice,
    dForm: dFormSlice,
    eForm: eFormSlice,
});

export default rootReducer;