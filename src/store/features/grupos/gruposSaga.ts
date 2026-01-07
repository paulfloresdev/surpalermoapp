import { call, put, takeLatest } from 'redux-saga/effects';
import { clearGruposRequest, destroyGrupoFailure, destroyGrupoRequest, destroyGrupoSuccess, getByProgramasOfSocioFailure, getByProgramasOfSocioRequest, getByProgramasOfSocioSuccess, indexGruposFailure, indexGruposRequest, indexGruposSuccess, showGrupoFailure, showGrupoRequest, showGrupoSuccess, storeGrupoFailure, storeGrupoRequest, updateGrupoFailure, updateGrupoRequest, updateGrupoSuccess } from './gruposSlice';
import { destroyGrupoAPI, getByProgramasOfSocioAPI, indexGruposAPI, showGrupoAPI, storeGrupoAPI, updateGrupoAPI } from '../../../helper/api/backend';

function* indexGruposSaga(): Generator<any, any, any> {
    try {
        yield put(clearGruposRequest());
        const res = yield call(indexGruposAPI);
        yield put(indexGruposSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(indexGruposFailure(error?.response?.data?.message || 'Error'));
    }
}

function* storeGrupoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearGruposRequest());
        const res = yield call(storeGrupoAPI, action.payload);
        yield put(indexGruposSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(storeGrupoFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showGrupoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearGruposRequest());
        const res = yield call(showGrupoAPI, action.payload);
        yield put(showGrupoSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(showGrupoFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateGrupoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearGruposRequest());
        const res = yield call(updateGrupoAPI, action.payload);
        yield put(updateGrupoSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(updateGrupoFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroyGrupoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearGruposRequest());
        const res = yield call(destroyGrupoAPI, action.payload);
        yield put(destroyGrupoSuccess(res.message));
    } catch (error: any) {
        yield put(destroyGrupoFailure(error?.response?.data?.message || 'Error'));
    }
}

function* getByProgramasOfSocioSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearGruposRequest());
        const res = yield call(getByProgramasOfSocioAPI, action.payload);
        yield put(getByProgramasOfSocioSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(getByProgramasOfSocioFailure(error?.response?.data?.message || 'Error'));
    }
}

export function* watchGruposSaga() {
    yield takeLatest(indexGruposRequest.type, indexGruposSaga);
    yield takeLatest(storeGrupoRequest.type, storeGrupoSaga);
    yield takeLatest(showGrupoRequest.type, showGrupoSaga);
    yield takeLatest(updateGrupoRequest.type, updateGrupoSaga);
    yield takeLatest(destroyGrupoRequest.type, destroyGrupoSaga);
    yield takeLatest(getByProgramasOfSocioRequest.type, getByProgramasOfSocioSaga);
}