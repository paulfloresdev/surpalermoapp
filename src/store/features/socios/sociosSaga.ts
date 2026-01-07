import { call, put, takeLatest } from 'redux-saga/effects';
import { clearSociosRequest, destroySocioFailure, destroySocioRequest, destroySocioSuccess, indexSociosFailure, indexSociosRequest, indexSociosSuccess, searchSociosFailure, searchSociosRequest, searchSociosSuccess, showSocioFailure, showSocioRequest, showSocioSuccess, storeSocioFailure, storeSocioRequest, storeSocioSuccess, updateSocioFailure, updateSocioRequest, updateSocioSuccess } from './sociosSlice';
import { destroySocioAPI, indexSociosAPI, searchSociosAPI, showSocioAPI, storeSocioAPI, updateSocioAPI } from '../../../helper/api/backend';

function* indexSociosSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSociosRequest());
        const res = yield call(indexSociosAPI);
        yield put(indexSociosSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(indexSociosFailure(error?.response?.data?.message || 'Error al buscar socios'));
    }
}

function* storeSocioSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSociosRequest());
        const res = yield call(storeSocioAPI, action.payload);
        yield put(storeSocioSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(storeSocioFailure(error?.response?.data?.message || 'Error al crear socio'));
    }
}

function* showSocioSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSociosRequest());
        const res = yield call(showSocioAPI, action.payload);
        yield put(showSocioSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(showSocioFailure(error?.response?.data?.message || 'Error al buscar socio'));
    }
}

export function* updateSocioSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSociosRequest());
        const res = yield call(updateSocioAPI, action.payload);
        yield put(updateSocioSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(updateSocioFailure(error?.response?.data?.message || 'Error al actualizar socio'));
    }
}

export function* destroySocioSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSociosRequest());
        const res = yield call(destroySocioAPI, action.payload);
        yield put(destroySocioSuccess(res.message));
    } catch (error: any) {
        yield put(destroySocioFailure(error?.response?.data?.message || 'Error al eliminar socio'));
    }
}

export function* searchSociosSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSociosRequest());
        const res = yield call(searchSociosAPI, action.payload);
        yield put(searchSociosSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(searchSociosFailure(error?.response?.data?.message || 'Error al buscar socios'));
    }
}

export function* watchSociosSaga() {
    yield takeLatest(indexSociosRequest.type, indexSociosSaga);
    yield takeLatest(storeSocioRequest.type, storeSocioSaga);
    yield takeLatest(showSocioRequest.type, showSocioSaga);
    yield takeLatest(updateSocioRequest.type, updateSocioSaga);
    yield takeLatest(destroySocioRequest.type, destroySocioSaga);
    yield takeLatest(searchSociosRequest.type, searchSociosSaga);
}