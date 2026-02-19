import { call, put, takeLatest } from 'redux-saga/effects';
import { clearFuncionariosRequest, destroyFuncionarioFailure, destroyFuncionarioRequest, destroyFuncionarioSuccess, indexFuncionariosFailure, indexFuncionariosRequest, indexFuncionariosSuccess, paginatedFuncionariosFailure, paginatedFuncionariosRequest, paginatedFuncionariosSuccess, showFuncionarioFailure, showFuncionarioRequest, showFuncionarioSuccess, storeFuncionarioFailure, storeFuncionarioRequest, storeFuncionarioSuccess, updateFuncionarioFailure, updateFuncionarioRequest, updateFuncionarioSuccess } from './funcionariosSlice';
import { destroyFuncionarioAPI, indexFuncionariosAPI, paginatedFuncionariosAPI, showFuncionarioAPI, storeFuncionarioAPI, updateFuncionarioAPI } from '../../../helper/api/backend';

function* indexFuncionariosSaga(): Generator<any, any, any> {
    try {
        yield put(clearFuncionariosRequest());
        const res = yield call(indexFuncionariosAPI);
        yield put(indexFuncionariosSuccess(res));
    } catch (error: any) {
        yield put(indexFuncionariosFailure(error?.response?.data?.message || 'Error'));
    }
}

function* paginatedFuncionariosSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearFuncionariosRequest());
        const res = yield call(paginatedFuncionariosAPI, action.payload);
        yield put(paginatedFuncionariosSuccess(res));
    } catch (error: any) {
        yield put(paginatedFuncionariosFailure(error?.response?.data?.message || 'Error'));
    }
}

function* storeFuncionarioSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearFuncionariosRequest());
        const res = yield call(storeFuncionarioAPI, action.payload);
        yield put(storeFuncionarioSuccess(res));
    } catch (error: any) {
        yield put(storeFuncionarioFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showFuncionarioSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearFuncionariosRequest());
        const res = yield call(showFuncionarioAPI, action.payload);
        yield put(showFuncionarioSuccess(res));
    } catch (error: any) {
        yield put(showFuncionarioFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateFuncionarioSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearFuncionariosRequest());
        const res = yield call(updateFuncionarioAPI, action.payload);
        yield put(updateFuncionarioSuccess(res));
    } catch (error: any) {
        yield put(updateFuncionarioFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroyFuncionarioSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearFuncionariosRequest());
        const res = yield call(destroyFuncionarioAPI, action.payload);
        yield put(destroyFuncionarioSuccess(res.message));
    } catch (error: any) {
        yield put(destroyFuncionarioFailure(error?.response?.data?.message || 'Error'))
    }
}

export function* watchFuncionariosSaga() {
    yield takeLatest(indexFuncionariosRequest.type, indexFuncionariosSaga);
    yield takeLatest(paginatedFuncionariosRequest.type, paginatedFuncionariosSaga);
    yield takeLatest(storeFuncionarioRequest.type, storeFuncionarioSaga);
    yield takeLatest(showFuncionarioRequest.type, showFuncionarioSaga);
    yield takeLatest(updateFuncionarioRequest.type, updateFuncionarioSaga);
    yield takeLatest(destroyFuncionarioRequest.type, destroyFuncionarioSaga);
}