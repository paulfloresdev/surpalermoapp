import { call, put, takeLatest } from 'redux-saga/effects';
import { clearSocioGrupoPivotsRequest, destroySocioGrupoPivotFailure, destroySocioGrupoPivotRequest, destroySocioGrupoPivotSuccess, getSociosByGrupoFailure, getSociosByGrupoRequest, getSociosByGrupoSuccess, indexSocioGrupoPivotsFailure, indexSocioGrupoPivotsRequest, indexSocioGrupoPivotsSuccess, searchSocioGrupoPivotsFailure, searchSocioGrupoPivotsRequest, searchSocioGrupoPivotsSuccess, showSocioGrupoPivotFailure, showSocioGrupoPivotRequest, showSocioGrupoPivotSuccess, storeSocioGrupoPivotFailure, storeSocioGrupoPivotRequest, storeSocioGrupoPivotSuccess, updateSocioGrupoPivotFailure, updateSocioGrupoPivotRequest, updateSocioGrupoPivotSuccess } from './socioGrupoPivotsSlice';
import { destroySocioGrupoPivotAPI, getSociosByGrupoAPI, indexSocioGrupoPivotsAPI, searchSocioGrupoPivotsAPI, showSocioGrupoPivotAPI, storeSocioGrupoPivotAPI, updateSocioGrupoPivotAPI } from '../../../helper/api/backend';

function* indexSocioGrupoPivotSaga(): Generator<any, any, any> {
    try {
        yield put(clearSocioGrupoPivotsRequest());
        const res = yield call(indexSocioGrupoPivotsAPI);
        yield put(indexSocioGrupoPivotsSuccess(res));
    } catch (error: any) {
        yield put(indexSocioGrupoPivotsFailure(error?.response?.data?.message || 'Error'));
    }
}

function* storeSocioGrupoPivotSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioGrupoPivotsRequest());
        const res = yield call(storeSocioGrupoPivotAPI, action.payload);
        yield put(storeSocioGrupoPivotSuccess(res));
    } catch (error: any) {
        yield put(storeSocioGrupoPivotFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showSocioGrupoPivotSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioGrupoPivotsRequest());
        const res = yield call(showSocioGrupoPivotAPI, action.payload);
        yield put(showSocioGrupoPivotSuccess(res));
    } catch (error: any) {
        yield put(showSocioGrupoPivotFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateSocioGrupoPivotSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioGrupoPivotsRequest());
        const res = yield call(updateSocioGrupoPivotAPI, action.payload);
        yield put(updateSocioGrupoPivotSuccess(res));
    } catch (error: any) {
        yield put(updateSocioGrupoPivotFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroySocioGrupoPivotSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioGrupoPivotsRequest());
        const res = yield call(destroySocioGrupoPivotAPI, action.payload);
        yield put(destroySocioGrupoPivotSuccess(res.message));
    } catch (error: any) {
        yield put(destroySocioGrupoPivotFailure(error?.response?.data?.message || 'Error'));
    }
}

function* searchSocioGrupoPivotSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioGrupoPivotsRequest());
        const res = yield call(searchSocioGrupoPivotsAPI, action.payload);
        yield put(searchSocioGrupoPivotsSuccess(res));
    } catch (error: any) {
        yield put(searchSocioGrupoPivotsFailure(error?.response?.data?.message || 'Error'));
    }
}

function* getSociosByGrupoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioGrupoPivotsRequest());
        const res = yield call(getSociosByGrupoAPI, action.payload);
        yield put(getSociosByGrupoSuccess(res));
    } catch (error: any) {
        yield put(getSociosByGrupoFailure(error?.response?.data?.message || 'Error'));
    }
}

export function* watchSocioGrupoPivotsSaga() {
    yield takeLatest(indexSocioGrupoPivotsRequest.type, indexSocioGrupoPivotSaga);
    yield takeLatest(storeSocioGrupoPivotRequest.type, storeSocioGrupoPivotSaga);
    yield takeLatest(showSocioGrupoPivotRequest.type, showSocioGrupoPivotSaga);
    yield takeLatest(updateSocioGrupoPivotRequest.type, updateSocioGrupoPivotSaga);
    yield takeLatest(destroySocioGrupoPivotRequest.type, destroySocioGrupoPivotSaga);
    yield takeLatest(searchSocioGrupoPivotsRequest.type, searchSocioGrupoPivotSaga);
    yield takeLatest(getSociosByGrupoRequest.type, getSociosByGrupoSaga);
} 