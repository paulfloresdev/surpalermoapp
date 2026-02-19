import { call, put, takeLatest } from "redux-saga/effects";
import {
    clearSocioFileTypesRequest,
    indexSocioFileTypesFailure,
    indexSocioFileTypesRequest,
    indexSocioFileTypesSuccess,
    paginatedSocioFileTypesFailure,
    paginatedSocioFileTypesRequest,
    paginatedSocioFileTypesSuccess,
    storeSocioFileTypeFailure,
    storeSocioFileTypeRequest,
    storeSocioFileTypeSuccess,
    showSocioFileTypeFailure,
    showSocioFileTypeRequest,
    showSocioFileTypeSuccess,
    updateSocioFileTypeFailure,
    updateSocioFileTypeRequest,
    updateSocioFileTypeSuccess,
    destroySocioFileTypeFailure,
    destroySocioFileTypeRequest,
    destroySocioFileTypeSuccess,
} from "./socioFileTypesSlice";

import {
    indexSocioFileTypesAPI,
    paginatedSocioFileTypesAPI,
    storeSocioFileTypeAPI,
    showSocioFileTypeAPI,
    updateSocioFileTypeAPI,
    destroySocioFileTypeAPI,
} from "../../../helper/api/backend";


// INDEX
function* indexSocioFileTypesSaga(): Generator<any, any, any> {
    try {
        yield put(clearSocioFileTypesRequest());
        const res = yield call(indexSocioFileTypesAPI);
        yield put(indexSocioFileTypesSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(indexSocioFileTypesFailure(error?.response?.data?.message || "Error al cargar tipos de archivos"));
    }
}

// PAGINATED
function* paginatedSocioFileTypesSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioFileTypesRequest());
        const res = yield call(paginatedSocioFileTypesAPI, action.payload);
        yield put(paginatedSocioFileTypesSuccess(res.data));
    } catch (error: any) {
        yield put(paginatedSocioFileTypesFailure(error?.response?.data?.message || "Error al cargar tipos de archivos"));
    }
}

// STORE
function* storeSocioFileTypeSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioFileTypesRequest());
        const res = yield call(storeSocioFileTypeAPI, action.payload);
        yield put(storeSocioFileTypeSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(storeSocioFileTypeFailure(error?.response?.data?.message || "Error al crear tipo de archivo"));
    }
}

// SHOW
function* showSocioFileTypeSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioFileTypesRequest());
        const res = yield call(showSocioFileTypeAPI, action.payload);
        yield put(showSocioFileTypeSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(showSocioFileTypeFailure(error?.response?.data?.message || "Error al obtener tipo de archivo"));
    }
}

// UPDATE
function* updateSocioFileTypeSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioFileTypesRequest());
        const res = yield call(updateSocioFileTypeAPI, action.payload);
        yield put(updateSocioFileTypeSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(updateSocioFileTypeFailure(error?.response?.data?.message || "Error al actualizar tipo de archivo"));
    }
}

// DESTROY
function* destroySocioFileTypeSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioFileTypesRequest());
        const res = yield call(destroySocioFileTypeAPI, action.payload);
        yield put(destroySocioFileTypeSuccess(res.message));
    } catch (error: any) {
        yield put(destroySocioFileTypeFailure(error?.response?.data?.message || "Error al eliminar tipo de archivo"));
    }
}

export function* watchSocioFileTypesSaga() {
    yield takeLatest(indexSocioFileTypesRequest.type, indexSocioFileTypesSaga);
    yield takeLatest(paginatedSocioFileTypesRequest.type, paginatedSocioFileTypesSaga);
    yield takeLatest(storeSocioFileTypeRequest.type, storeSocioFileTypeSaga);
    yield takeLatest(showSocioFileTypeRequest.type, showSocioFileTypeSaga);
    yield takeLatest(updateSocioFileTypeRequest.type, updateSocioFileTypeSaga);
    yield takeLatest(destroySocioFileTypeRequest.type, destroySocioFileTypeSaga);
}
