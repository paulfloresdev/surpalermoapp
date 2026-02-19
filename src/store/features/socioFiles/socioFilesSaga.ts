import { call, put, takeLatest } from "redux-saga/effects";
import {
    clearSocioFilesRequest,
    paginatedSocioFilesFailure,
    paginatedSocioFilesRequest,
    paginatedSocioFilesSuccess,
    storeSocioFileFailure,
    storeSocioFileRequest,
    storeSocioFileSuccess,
    destroySocioFileFailure,
    destroySocioFileRequest,
    destroySocioFileSuccess,
} from "./socioFilesSlice";

import { paginatedSocioFilesAPI, storeSocioFileAPI, destroySocioFileAPI } from "../../../helper/api/backend";

function* paginatedSocioFilesSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioFilesRequest());
        const res = yield call(paginatedSocioFilesAPI, action.payload);
        yield put(paginatedSocioFilesSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(paginatedSocioFilesFailure(error?.response?.data?.message || "Error al buscar archivos"));
    }
}

function* storeSocioFileSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioFilesRequest());
        const res = yield call(storeSocioFileAPI, action.payload);
        yield put(storeSocioFileSuccess({ data: res.data, message: res.message }));
    } catch (error: any) {
        yield put(storeSocioFileFailure(error?.response?.data?.message || "Error al subir archivo"));
    }
}

function* destroySocioFileSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearSocioFilesRequest());
        const res = yield call(destroySocioFileAPI, action.payload);
        yield put(destroySocioFileSuccess(res.message || "Archivo eliminado"));
    } catch (error: any) {
        yield put(destroySocioFileFailure(error?.response?.data?.message || "Error al eliminar archivo"));
    }
}

export function* watchSocioFilesSaga() {
    yield takeLatest(paginatedSocioFilesRequest.type, paginatedSocioFilesSaga);
    yield takeLatest(storeSocioFileRequest.type, storeSocioFileSaga);
    yield takeLatest(destroySocioFileRequest.type, destroySocioFileSaga);
}
