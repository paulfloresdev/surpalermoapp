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
import ticketsReducer from '../features/tickets/ticketsSlice';
import socioFileTypesReducer from '../features/socioFileTypes/socioFileTypesSlice';
import socioFilesReducer from '../features/socioFiles/socioFilesSlice';
import funcionariosReducer from '../features/funcionarios/funcionariosSlice';
import docentesReducer from '../features/docentes/docentesSlice';
import medicosReducer from '../features/medicos/medicosSlice';
import groupFormsReducer from '../features/groupForms/groupFormsSlice';
import docenteGrupoPivotsReducer from '../features/docenteGrupoPivots/docenteGrupoPivotsSlice';
import coordinadoresReducer from '../features/coordinadores/coordinadoresSlice';
import docenteFormsReducer from '../features/docenteForms/docenteFormsSlice';


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
    tickets: ticketsReducer,
    socioFileTypes: socioFileTypesReducer,
    socioFiles: socioFilesReducer,
    funcionarios: funcionariosReducer,
    docentes: docentesReducer,
    medicos: medicosReducer,
    groupForms: groupFormsReducer,
    docenteGrupoPivots: docenteGrupoPivotsReducer,
    coordinadores: coordinadoresReducer,
    docenteForms: docenteFormsReducer,


    // FORMS
    updateSocioForm: updateSocioFormSlice,
    aForm: aFormSlice,
    bForm: bFormSlice,
    cForm: cFormSlice,
    dForm: dFormSlice,
    eForm: eFormSlice,
});

export default rootReducer;