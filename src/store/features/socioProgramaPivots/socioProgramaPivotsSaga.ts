import { call, put, takeLatest } from 'redux-saga/effects';
import { destroySocioProgramaPivotAPI, indexSocioProgramaPivotsAPI, searchSocioProgramaPivotsAPI, showSocioProgramaPivotAPI, storeSocioProgramaPivotAPI, updateSocioProgramaPivotAPI } from '../../../helper/api/backend';
import { destroySocioProgramaPivotFailure, destroySocioProgramaPivotRequest, destroySocioProgramaPivotSuccess, indexSocioProgramaPivotsFailure, indexSocioProgramaPivotsRequest, indexSocioProgramaPivotsSuccess, searchSocioProgramaPivotsFailure, searchSocioProgramaPivotsRequest, searchSocioProgramaPivotsSuccess, showSocioProgramaPivotFailure, showSocioProgramaPivotRequest, showSocioProgramaPivotSuccess, storeSocioProgramaPivotFailure, storeSocioProgramaPivotRequest, storeSocioProgramaPivotSuccess, updateSocioProgramaPivotFailure, updateSocioProgramaPivotRequest, updateSocioProgramaPivotSuccess } from './socioProgramaPivotsSlice';

function* indexSocioProgramaPivotsSaga(): Generator<any, any, any> {
    try {
        const res = yield call(indexSocioProgramaPivotsAPI);
        yield put(indexSocioProgramaPivotsSuccess(res.data));
    } catch (error: any) {
        yield put(indexSocioProgramaPivotsFailure(error?.response?.message || 'Error'));
    }
}

function* storeSocioProgramaPivotSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(storeSocioProgramaPivotAPI, action.payload);
        yield put(storeSocioProgramaPivotSuccess(res.data));
    } catch (error: any) {
        yield put(storeSocioProgramaPivotFailure(error?.response?.message || 'Error'));
    }
}

function* showSocioProgramaPivotSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(showSocioProgramaPivotAPI, action.payload);
        yield put(showSocioProgramaPivotSuccess(res.data));
    } catch (error: any) {
        yield put(showSocioProgramaPivotFailure(error?.response?.message || 'Error'));
    }
}

function* updateSocioProgramaPivotSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(updateSocioProgramaPivotAPI, action.payload);
        yield put(updateSocioProgramaPivotSuccess(res.data));
    } catch (error: any) {
        yield put(updateSocioProgramaPivotFailure(error?.response?.message || 'Error'));
    }
}

function* destroySocioProgramaPivotSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(destroySocioProgramaPivotAPI, action.payload);
        yield put(destroySocioProgramaPivotSuccess(res.data));
    } catch (error: any) {
        yield put(destroySocioProgramaPivotFailure(error?.response?.message || 'Error'));
    }
}

function* searchSocioProgramaPivotsSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(searchSocioProgramaPivotsAPI, action.payload);
        yield put(searchSocioProgramaPivotsSuccess(res.data));
    } catch (error: any) {
        yield put(searchSocioProgramaPivotsFailure(error?.response?.message || 'Error'));
    }
}

export function* watchSocioProgramaPivotsSaga() {
    yield takeLatest(indexSocioProgramaPivotsRequest.type, indexSocioProgramaPivotsSaga);
    yield takeLatest(storeSocioProgramaPivotRequest.type, storeSocioProgramaPivotSaga);
    yield takeLatest(showSocioProgramaPivotRequest.type, showSocioProgramaPivotSaga);
    yield takeLatest(updateSocioProgramaPivotRequest.type, updateSocioProgramaPivotSaga);
    yield takeLatest(destroySocioProgramaPivotRequest.type, destroySocioProgramaPivotSaga);
    yield takeLatest(searchSocioProgramaPivotsRequest.type, searchSocioProgramaPivotsSaga);
}

