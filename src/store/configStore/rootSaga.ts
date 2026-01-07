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

//  Forms
import { watchAFormSaga } from '../features/forms/AForm/AFormSaga';
import { watchBFormSaga } from '../features/forms/BForm/BFormSaga';
import { watchCFormSaga } from '../features/forms/CForm/CFormSaga';
import { watchDFormSaga } from '../features/forms/DForm/DFormSaga';
import { watchEFormSaga } from '../features/forms/EForm/EFormSaga';

export default function* rootSaga() {
    yield all([
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
        fork(watchAFormSaga),
        fork(watchBFormSaga),
        fork(watchCFormSaga),
        fork(watchDFormSaga),
        fork(watchEFormSaga),
    ])
}