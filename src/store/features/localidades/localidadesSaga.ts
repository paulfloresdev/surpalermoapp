import { call, put, takeLatest } from 'redux-saga/effects';
import { destroyLocalidadAPI, indexLocalidadesAPI, paginatedLocalidadesAPI, showLocalidadAPI, storeLocalidadAPI, updateLocalidadAPI } from '../../../helper/api/backend';
import { destroyLocalidadFailure, destroyLocalidadRequest, destroyLocalidadSuccess, indexLocalidadesFailure, indexLocalidadesRequest, indexLocalidadesSuccess, paginatedLocalidadesFailure, paginatedLocalidadesRequest, paginatedLocalidadesSuccess, showLocalidadFailure, showLocalidadRequest, showLocalidadSuccess, storeLocalidadFailure, storeLocalidadRequest, storeLocalidadSuccess, updateLocalidadFailure, updateLocalidadRequest, updateLocalidadSuccess } from './localidadesSlice';

function* indexLocalidadesSaga(): Generator<any, any, any> {
    try {
        const res = yield call(indexLocalidadesAPI);
        yield put(indexLocalidadesSuccess(res.data));
    } catch (error: any) {
        yield put(indexLocalidadesFailure(error?.response?.message || 'Error'));
    }
}

function* paginatedLocalidadesSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(paginatedLocalidadesAPI, action.payload);
        yield put(paginatedLocalidadesSuccess(res.data));
    } catch (error: any) {
        yield put(paginatedLocalidadesFailure(error?.response?.message || 'Error'))
    }
}

function* storeLocalidadSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(storeLocalidadAPI, action.payload);
        yield put(storeLocalidadSuccess(res.data));
    } catch (error: any) {
        yield put(storeLocalidadFailure(error?.response?.message || 'Error'));
    }
}

function* showLocalidadSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(showLocalidadAPI, action.payload);
        yield put(showLocalidadSuccess(res.data));
    } catch (error: any) {
        yield put(showLocalidadFailure(error?.response?.message || 'Error'));
    }
}

function* updateLocalidadSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(updateLocalidadAPI, action.payload);
        yield put(updateLocalidadSuccess(res.data));
    } catch (error: any) {
        yield put(updateLocalidadFailure(error?.response?.message || 'Error'));
    }
}

function* destroyLocalidadSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(destroyLocalidadAPI, action.payload);
        yield put(destroyLocalidadSuccess(res.data));
    } catch (error: any) {
        yield put(destroyLocalidadFailure(error?.response?.message || 'Error'));
    }
}

export function* watchLocalidadesSaga() {
    yield takeLatest(indexLocalidadesRequest.type, indexLocalidadesSaga);
    yield takeLatest(paginatedLocalidadesRequest.type, paginatedLocalidadesSaga);
    yield takeLatest(storeLocalidadRequest.type, storeLocalidadSaga);
    yield takeLatest(showLocalidadRequest.type, showLocalidadSaga);
    yield takeLatest(updateLocalidadRequest.type, updateLocalidadSaga);
    yield takeLatest(destroyLocalidadRequest.type, destroyLocalidadSaga);
}