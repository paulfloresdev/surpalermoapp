import { all, fork } from 'redux-saga/effects'

import { watchAuthSaga } from '../features/auth/authSaga';
import { watchSociosSaga } from '../features/socios/sociosSaga';
import { watchDepartamentosSaga } from '../features/departamentos/departamentosSaga';
import { watchLocalidadesSaga } from '../features/localidades/localidadesSaga';
import { watchMutualistasSaga } from '../features/mutualistas/mutualistasSaga';
import { watchEmergenciasSaga } from '../features/emergencias/emergenciasSaga';
import { watchProgramasSaga } from '../features/programas/programasSaga';
import { watchSocioProgramaPivotsSaga } from '../features/socioProgramaPivots/socioProgramaPivotsSaga';
import { watchGruposSaga } from '../features/grupos/gruposSaga';
import { watchSocioGrupoPivotsSaga } from '../features/socioGrupoPivots/socioGrupoPivotsSaga';
import { watchTicketsSaga } from '../features/tickets/ticketsSaga'
import { watchSocioFileTypesSaga } from '../features/socioFileTypes/socioFileTypesSaga';
import { watchSocioFilesSaga } from '../features/socioFiles/socioFilesSaga';
import { watchFuncionariosSaga } from '../features/funcionarios/funcionariosSaga';
import { watchDocentesSaga } from '../features/docentes/docentesSaga';
import { watchMedicosSaga } from '../features/medicos/medicosSaga';
import { watchGroupFormsSaga } from '../features/groupForms/groupFormsSaga';
import { watchDocenteGrupoPivotsSaga } from '../features/docenteGrupoPivots/docenteGrupoPivotsSaga';
import { watchCoordinadoresSaga } from '../features/coordinadores/coordinadoresSaga';
import { watchDocenteFormsSaga } from '../features/docenteForms/docenteFormsSaga';

//  Forms
import { watchAFormSaga } from '../features/forms/AForm/AFormSaga';
import { watchBFormSaga } from '../features/forms/BForm/BFormSaga';
import { watchCFormSaga } from '../features/forms/CForm/CFormSaga';
import { watchDFormSaga } from '../features/forms/DForm/DFormSaga';
import { watchEFormSaga } from '../features/forms/EForm/EFormSaga';

export default function* rootSaga() {
    yield all([
        //  API
        fork(watchAuthSaga),
        fork(watchSociosSaga),
        fork(watchDepartamentosSaga),
        fork(watchLocalidadesSaga),
        fork(watchMutualistasSaga),
        fork(watchEmergenciasSaga),
        fork(watchProgramasSaga),
        fork(watchSocioProgramaPivotsSaga),
        fork(watchGruposSaga),
        fork(watchSocioGrupoPivotsSaga),
        fork(watchTicketsSaga),
        fork(watchSocioFileTypesSaga),
        fork(watchSocioFilesSaga),
        fork(watchFuncionariosSaga),
        fork(watchDocentesSaga),
        fork(watchMedicosSaga),
        fork(watchGroupFormsSaga),
        fork(watchDocenteGrupoPivotsSaga),
        fork(watchCoordinadoresSaga),
        fork(watchDocenteFormsSaga),

        // FORMS
        fork(watchAFormSaga),
        fork(watchBFormSaga),
        fork(watchCFormSaga),
        fork(watchDFormSaga),
        fork(watchEFormSaga),
    ])
}