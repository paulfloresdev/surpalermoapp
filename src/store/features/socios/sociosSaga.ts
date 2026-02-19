import { call, put, takeLatest } from 'redux-saga/effects';
import { clearSociosRequest, deleteSocioImageFailure, deleteSocioImageRequest, deleteSocioImageSuccess, destroySocioFailure, destroySocioRequest, destroySocioSuccess, indexSociosFailure, indexSociosRequest, indexSociosSuccess, searchSociosFailure, searchSociosRequest, searchSociosSuccess, showSocioFailure, showSocioRequest, showSocioSuccess, storeSocioFailure, storeSocioRequest, storeSocioSuccess, updateSocioFailure, updateSocioRequest, updateSocioSuccess, uploadSocioImageFailure, uploadSocioImageRequest, uploadSocioImageSuccess } from './sociosSlice';
import { deleteSocioImageAPI, destroySocioAPI, indexSociosAPI, searchSociosAPI, showSocioAPI, storeSocioAPI, updateSocioAPI, uploadSocioImageAPI } from '../../../helper/api/backend';

function* indexSociosSaga(_action: any): Generator<any, any, any> {
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

function* uploadSocioImageSaga(action: any): Generator<any, any, any> {
    try {
        // opcional: no limpies todo si te afecta otros flags, pero ok si así lo manejas
        yield put(clearSociosRequest());

        const { id, file } = action.payload;
        const res = yield call(uploadSocioImageAPI, id, file);

        // asumiendo tu API responde { data, message }
        yield put(uploadSocioImageSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(uploadSocioImageFailure(error?.response?.data?.message || "Error al subir imagen"));
    }
}

function* deleteSocioImageSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSociosRequest());

        const res = yield call(deleteSocioImageAPI, action.payload);
        yield put(deleteSocioImageSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(deleteSocioImageFailure(error?.response?.data?.message || "Error al borrar imagen"));
    }
}

export function* watchSociosSaga() {
    yield takeLatest(indexSociosRequest.type, indexSociosSaga);
    yield takeLatest(storeSocioRequest.type, storeSocioSaga);
    yield takeLatest(showSocioRequest.type, showSocioSaga);
    yield takeLatest(updateSocioRequest.type, updateSocioSaga);
    yield takeLatest(destroySocioRequest.type, destroySocioSaga);
    yield takeLatest(searchSociosRequest.type, searchSociosSaga);
    yield takeLatest(uploadSocioImageRequest.type, uploadSocioImageSaga);
    yield takeLatest(deleteSocioImageRequest.type, deleteSocioImageSaga);
}