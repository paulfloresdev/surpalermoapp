import { call, put, takeLatest } from 'redux-saga/effects';
import { destroyDepartamentoAPI, indexDepartamentosAPI, paginatedDepartamentosAPI, showDepartamentoAPI, storeDepartamentoAPI, updateDepartamentoAPI } from '../../../helper/api/backend';
import { destroyDepartamentoFailure, destroyDepartamentoRequest, destroyDepartamentoSuccess, indexDepartamentosFailure, indexDepartamentosRequest, indexDepartamentosSuccess, paginatedDepartamentosFailure, paginatedDepartamentosRequest, showDepartamentoFailure, showDepartamentoRequest, showDepartamentoSuccess, storeDepartamentoFailure, storeDepartamentoRequest, storeDepartamentoSuccess, updateDepartamentoFailure, updateDepartamentoRequest, updateDepartamentoSuccess } from './departamentosSlice';

function* indexDepartamentosSaga(): Generator<any, any, any> {
    try {
        const res = yield call(indexDepartamentosAPI);
        yield put(indexDepartamentosSuccess(res.data));
    } catch (error: any) {
        yield put(indexDepartamentosFailure(error?.response?.message || 'Error'));
    }
}

function* paginatedDepartamentosSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(paginatedDepartamentosAPI, action.payload);
        yield put(indexDepartamentosSuccess(res.data));
    } catch (error: any) {
        yield put(paginatedDepartamentosFailure(error?.response?.message || 'Error'))
    }
}

function* storeDepartamentoSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(storeDepartamentoAPI, action.payload);
        yield put(storeDepartamentoSuccess(res.data));
    } catch (error: any) {
        yield put(storeDepartamentoFailure(error?.response?.message || 'Error'));
    }
}

function* showDepartamentoSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(showDepartamentoAPI, action.payload);
        yield put(showDepartamentoSuccess(res.data));
    } catch (error: any) {
        yield put(showDepartamentoFailure(error?.response?.message || 'Error'));
    }
}

function* updateDepartamentoSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(updateDepartamentoAPI, action.payload);
        yield put(updateDepartamentoSuccess(res.data));
    } catch (error: any) {
        yield put(updateDepartamentoFailure(error?.response?.message || 'Error'));
    }
}

function* destroyDepartamentoSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(destroyDepartamentoAPI, action.payload);
        yield put(destroyDepartamentoSuccess(res.data));
    } catch (error: any) {
        yield put(destroyDepartamentoFailure(error?.response?.message || 'Error'));
    }
}

export function* watchDepartamentosSaga() {
    yield takeLatest(indexDepartamentosRequest.type, indexDepartamentosSaga);
    yield takeLatest(paginatedDepartamentosRequest.type, paginatedDepartamentosSaga);
    yield takeLatest(storeDepartamentoRequest.type, storeDepartamentoSaga);
    yield takeLatest(showDepartamentoRequest.type, showDepartamentoSaga);
    yield takeLatest(updateDepartamentoRequest.type, updateDepartamentoSaga);
    yield takeLatest(destroyDepartamentoRequest.type, destroyDepartamentoSaga);
}