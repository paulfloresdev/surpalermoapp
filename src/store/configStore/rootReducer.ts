import { combineReducers } from '@reduxjs/toolkit'

// API
import authReducer from '../features/auth/authSlice';
import searchSociosReducer from '../features/socios/search/searchSociosSlice';
import showSocioReducer from '../features/socios/show/showSocioSlice';
import departamentosReducer from '../features/departamentos/departamentosSlice';
import localidadesReducer from '../features/localidades/localidadesSlice';
import mutualistasReducer from '../features/mutualistas/mutualistasSlice';
import emergenciasReducer from '../features/emergencias/emergenciasSlice';
import programasReducer from '../features/programas/programasSlice';
import socioProgramaPivotsReducer from '../features/socioProgramaPivots/socioProgramaPivotsSlice';

// FORMS
import updateSocioFormSlice from '../features/forms/UpdateSocioFormSlice';

const rootReducer = combineReducers({
    // API
    auth: authReducer,
    searchSocios: searchSociosReducer,
    showSocio: showSocioReducer,
    departamentos: departamentosReducer,
    localidades: localidadesReducer,
    mutualistas: mutualistasReducer,
    emergencias: emergenciasReducer,
    programas: programasReducer,
    socioProgramaPivots: socioProgramaPivotsReducer,

    // FORMS
    updateSocioForm: updateSocioFormSlice,
});

export default rootReducer;