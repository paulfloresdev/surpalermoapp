import { all, fork } from 'redux-saga/effects'

import { watchAuthSaga } from '../features/auth/authSaga';
import { watchSearchSociosSaga } from '../features/socios/search/searchSociosSaga';
import { watchShowSocioSaga } from '../features/socios/show/showSocioSaga';
import { watchDepartamentosSaga } from '../features/departamentos/departamentosSaga';
import { watchLocalidadesSaga } from '../features/localidades/localidadesSaga';
import { watchMutualistasSaga } from '../features/mutualistas/mutualistasSaga';
import { watchEmergenciasSaga } from '../features/emergencias/emergenciasSaga';
import { watchProgramasSaga } from '../features/programas/programasSaga';
import { watchSocioProgramaPivotsSaga } from '../features/socioProgramaPivots/socioProgramaPivotsSaga';

export default function* rootSaga() {
    yield all([
        fork(watchAuthSaga),
        fork(watchSearchSociosSaga),
        fork(watchShowSocioSaga),
        fork(watchDepartamentosSaga),
        fork(watchLocalidadesSaga),
        fork(watchMutualistasSaga),
        fork(watchEmergenciasSaga),
        fork(watchProgramasSaga),
        fork(watchSocioProgramaPivotsSaga),
    ])
}