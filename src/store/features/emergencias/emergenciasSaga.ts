import { call, put, takeLatest } from 'redux-saga/effects';
import { destroyEmergenciaFailure, destroyEmergenciaRequest, destroyEmergenciaSuccess, indexEmergenciasFailure, indexEmergenciasRequest, indexEmergenciasSuccess, paginatedEmergenciasFailure, paginatedEmergenciasRequest, paginatedEmergenciasSuccess, showEmergenciaFailure, showEmergenciaRequest, showEmergenciaSuccess, storeEmergenciaFailure, storeEmergenciaRequest, storeEmergenciaSuccess, updateEmergenciaFailure, updateEmergenciaRequest, updateEmergenciaSuccess } from './emergenciasSlice';
import { destroyEmergenciaAPI, indexEmergenciasAPI, paginatedEmergenciasAPI, showEmergenciaAPI, storeEmergenciaAPI, updateEmergenciaAPI } from '../../../helper/api/backend';

function* indexEmergenciasSaga(): Generator<any, any, any> {
    try {
        const res = yield call(indexEmergenciasAPI);
        yield put(indexEmergenciasSuccess(res.data));
    } catch (error: any) {
        yield put(indexEmergenciasFailure(error?.response?.message || 'Error'));
    }
}

function* paginatedEmergenciasSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(paginatedEmergenciasAPI, action.payload);
        yield put(paginatedEmergenciasSuccess(res.data));
    } catch (error: any) {
        yield put(paginatedEmergenciasFailure(error?.response?.message || 'Error'))
    }
}

function* storeEmergenciaSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(storeEmergenciaAPI, action.payload);
        yield put(storeEmergenciaSuccess(res.data));
    } catch (error: any) {
        yield put(storeEmergenciaFailure(error?.response?.message || 'Error'));
    }
}

function* showEmergenciaSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(showEmergenciaAPI, action.payload);
        yield put(showEmergenciaSuccess(res.data));
    } catch (error: any) {
        yield put(showEmergenciaFailure(error?.response?.message || 'Error'));
    }
}

function* updateEmergenciaSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(updateEmergenciaAPI, action.payload);
        yield put(updateEmergenciaSuccess(res.data));
    } catch (error: any) {
        yield put(updateEmergenciaFailure(error?.response?.message || 'Error'));
    }
}

function* destroyEmergenciaSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(destroyEmergenciaAPI, action.payload);
        yield put(destroyEmergenciaSuccess(res.data));
    } catch (error: any) {
        yield put(destroyEmergenciaFailure(error?.response?.message || 'Error'));
    }
}

export function* watchEmergenciasSaga() {
    yield takeLatest(indexEmergenciasRequest.type, indexEmergenciasSaga);
    yield takeLatest(paginatedEmergenciasRequest.type, paginatedEmergenciasSaga);
    yield takeLatest(storeEmergenciaRequest.type, storeEmergenciaSaga);
    yield takeLatest(showEmergenciaRequest.type, showEmergenciaSaga);
    yield takeLatest(updateEmergenciaRequest.type, updateEmergenciaSaga);
    yield takeLatest(destroyEmergenciaRequest.type, destroyEmergenciaSaga);
}