import { call, put, takeLatest } from 'redux-saga/effects';
import { destroyProgramaAPI, indexProgramasAPI, paginatedProgramasAPI, showProgramaAPI, storeProgramaAPI, updateProgramaAPI } from '../../../helper/api/backend';
import { destroyProgramaFailure, destroyProgramaRequest, destroyProgramaSuccess, indexProgramasFailure, indexProgramasRequest, indexProgramasSuccess, paginatedProgramasFailure, paginatedProgramasRequest, paginatedProgramasSuccess, showProgramaFailure, showProgramaRequest, showProgramaSuccess, storeProgramaFailure, storeProgramaRequest, storeProgramaSuccess, updateProgramaFailure, updateProgramaRequest, updateProgramaSuccess } from './programasSlice';

function* indexProgramasSaga(): Generator<any, any, any> {
    try {
        const res = yield call(indexProgramasAPI);
        yield put(indexProgramasSuccess(res.data));
    } catch (error: any) {
        yield put(indexProgramasFailure(error?.response?.message || 'Error'));
    }
}

function* paginatedProgramasSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(paginatedProgramasAPI, action.payload);
        yield put(paginatedProgramasSuccess(res.data));
    } catch (error: any) {
        yield put(paginatedProgramasFailure(error?.response?.message || 'Error'))
    }
}

function* storeProgramaSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(storeProgramaAPI, action.payload);
        yield put(storeProgramaSuccess(res.data));
    } catch (error: any) {
        yield put(storeProgramaFailure(error?.response?.message || 'Error'));
    }
}

function* showProgramaSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(showProgramaAPI, action.payload);
        yield put(showProgramaSuccess(res.data));
    } catch (error: any) {
        yield put(showProgramaFailure(error?.response?.message || 'Error'));
    }
}

function* updateProgramaSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(updateProgramaAPI, action.payload);
        yield put(updateProgramaSuccess(res.data));
    } catch (error: any) {
        yield put(updateProgramaFailure(error?.response?.message || 'Error'));
    }
}

function* destroyProgramaSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(destroyProgramaAPI, action.payload);
        yield put(destroyProgramaSuccess(res.data));
    } catch (error: any) {
        yield put(destroyProgramaFailure(error?.response?.message || 'Error'));
    }
}

export function* watchProgramasSaga() {
    yield takeLatest(indexProgramasRequest.type, indexProgramasSaga);
    yield takeLatest(paginatedProgramasRequest.type, paginatedProgramasSaga);
    yield takeLatest(storeProgramaRequest.type, storeProgramaSaga);
    yield takeLatest(showProgramaRequest.type, showProgramaSaga);
    yield takeLatest(updateProgramaRequest.type, updateProgramaSaga);
    yield takeLatest(destroyProgramaRequest.type, destroyProgramaSaga);
}