import { call, put, takeLatest } from 'redux-saga/effects';
import { clearDocentesRequest, destroyDocenteFailure, destroyDocenteRequest, destroyDocenteSuccess, indexDocentesFailure, indexDocentesRequest, indexDocentesSuccess, paginatedDocentesFailure, paginatedDocentesRequest, paginatedDocentesSuccess, showDocenteFailure, showDocenteRequest, showDocenteSuccess, storeDocenteFailure, storeDocenteRequest, storeDocenteSuccess, updateDocenteFailure, updateDocenteRequest, updateDocenteSuccess } from './docentesSlice';
import { destroyDocenteAPI, indexDocentesAPI, paginatedDocentesAPI, showDocenteAPI, storeDocenteAPI, updateDocenteAPI } from '../../../helper/api/backend';

function* indexDocentesSaga(): Generator<any, any, any> {
    try {
        yield put(clearDocentesRequest());
        const res = yield call(indexDocentesAPI);
        yield put(indexDocentesSuccess(res));
    } catch (error: any) {
        yield put(indexDocentesFailure(error?.response?.data?.message || 'Error'));
    }
}

function* paginatedDocentesSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocentesRequest());
        const res = yield call(paginatedDocentesAPI, action.payload);
        yield put(paginatedDocentesSuccess(res));
    } catch (error: any) {
        yield put(paginatedDocentesFailure(error?.response?.data?.message || 'Error'));
    }
}

function* storeDocenteSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocentesRequest());
        const res = yield call(storeDocenteAPI, action.payload);
        yield put(storeDocenteSuccess(res));
    } catch (error: any) {
        yield put(storeDocenteFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showDocenteSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocentesRequest());
        const res = yield call(showDocenteAPI, action.payload);
        yield put(showDocenteSuccess(res));
    } catch (error: any) {
        yield put(showDocenteFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateDocenteSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocentesRequest());
        const res = yield call(updateDocenteAPI, action.payload);
        yield put(updateDocenteSuccess(res));
    } catch (error: any) {
        yield put(updateDocenteFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroyDocenteSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocentesRequest());
        const res = yield call(destroyDocenteAPI, action.payload);
        yield put(destroyDocenteSuccess(res.message));
    } catch (error: any) {
        yield put(destroyDocenteFailure(error?.response?.data?.message || 'Error'))
    }
}

export function* watchDocentesSaga() {
    yield takeLatest(indexDocentesRequest.type, indexDocentesSaga);
    yield takeLatest(paginatedDocentesRequest.type, paginatedDocentesSaga);
    yield takeLatest(storeDocenteRequest.type, storeDocenteSaga);
    yield takeLatest(showDocenteRequest.type, showDocenteSaga);
    yield takeLatest(updateDocenteRequest.type, updateDocenteSaga);
    yield takeLatest(destroyDocenteRequest.type, destroyDocenteSaga);
}

