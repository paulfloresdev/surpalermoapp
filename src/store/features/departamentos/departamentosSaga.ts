import { call, put, takeLatest } from 'redux-saga/effects';
import { destroyDepartamentoAPI, indexDepartamentosAPI, paginatedDepartamentosAPI, showDepartamentoAPI, storeDepartamentoAPI, updateDepartamentoAPI } from '../../../helper/api/backend';
import { clearDepartamentosRequest, destroyDepartamentoFailure, destroyDepartamentoRequest, destroyDepartamentoSuccess, indexDepartamentosFailure, indexDepartamentosRequest, indexDepartamentosSuccess, paginatedDepartamentosFailure, paginatedDepartamentosRequest, showDepartamentoFailure, showDepartamentoRequest, showDepartamentoSuccess, storeDepartamentoFailure, storeDepartamentoRequest, storeDepartamentoSuccess, updateDepartamentoFailure, updateDepartamentoRequest, updateDepartamentoSuccess } from './departamentosSlice';

function* indexDepartamentosSaga(): Generator<any, any, any> {
    try {
        yield put(clearDepartamentosRequest());
        const res = yield call(indexDepartamentosAPI);
        yield put(indexDepartamentosSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(indexDepartamentosFailure(error?.response?.data?.message || 'Error'));
    }
}

function* paginatedDepartamentosSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDepartamentosRequest());
        const res = yield call(paginatedDepartamentosAPI, action.payload);
        yield put(indexDepartamentosSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(paginatedDepartamentosFailure(error?.response?.data?.message || 'Error'))
    }
}

function* storeDepartamentoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDepartamentosRequest());
        const res = yield call(storeDepartamentoAPI, action.payload);
        yield put(storeDepartamentoSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(storeDepartamentoFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showDepartamentoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDepartamentosRequest());
        const res = yield call(showDepartamentoAPI, action.payload);
        yield put(showDepartamentoSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(showDepartamentoFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateDepartamentoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDepartamentosRequest());
        const res = yield call(updateDepartamentoAPI, action.payload);
        yield put(updateDepartamentoSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(updateDepartamentoFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroyDepartamentoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDepartamentosRequest());
        const res = yield call(destroyDepartamentoAPI, action.payload);
        yield put(destroyDepartamentoSuccess(res.message));
    } catch (error: any) {
        yield put(destroyDepartamentoFailure(error?.response?.data?.message || 'Error'));
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