import { call, put, takeLatest } from 'redux-saga/effects';
import { destroyMutualistaAPI, indexMutualistasAPI, searchMutualistasAPI, showMutualistaAPI, storeMutualistaAPI, updateMutualistaAPI } from '../../../helper/api/backend';
import { clearMutualistasRequest, destroyMutualistaFailure, destroyMutualistaRequest, destroyMutualistaSuccess, indexMutualistasFailure, indexMutualistasRequest, indexMutualistasSuccess, searchMutualistasFailure, searchMutualistasRequest, searchMutualistasSuccess, showMutualistaFailure, showMutualistaRequest, showMutualistaSuccess, storeMutualistaFailure, storeMutualistaRequest, storeMutualistaSuccess, updateMutualistaFailure, updateMutualistaRequest, updateMutualistaSuccess } from './mutualistasSlice';

function* indexMutualistasSaga(): Generator<any, any, any> {
    try {
        yield put(clearMutualistasRequest());
        const res = yield call(indexMutualistasAPI);
        yield put(indexMutualistasSuccess(res.data));
    } catch (error: any) {
        yield put(indexMutualistasFailure(error?.response?.data?.message || 'Error'));
    }
}

function* searchMutualistasSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearMutualistasRequest());
        const res = yield call(searchMutualistasAPI, action.payload);
        yield put(searchMutualistasSuccess(res.data));
    } catch (error: any) {
        yield put(searchMutualistasFailure(error?.response?.data?.message || 'Error'))
    }
}

function* storeMutualistaSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearMutualistasRequest());
        const res = yield call(storeMutualistaAPI, action.payload);
        yield put(storeMutualistaSuccess(res.data));
    } catch (error: any) {
        yield put(storeMutualistaFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showMutualistaSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearMutualistasRequest());
        const res = yield call(showMutualistaAPI, action.payload);
        yield put(showMutualistaSuccess(res.data));
    } catch (error: any) {
        yield put(showMutualistaFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateMutualistaSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearMutualistasRequest());
        const res = yield call(updateMutualistaAPI, action.payload);
        yield put(updateMutualistaSuccess(res.data));
    } catch (error: any) {
        yield put(updateMutualistaFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroyMutualistaSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearMutualistasRequest());
        const res = yield call(destroyMutualistaAPI, action.payload);
        yield put(destroyMutualistaSuccess(res.data));
    } catch (error: any) {
        yield put(destroyMutualistaFailure(error?.response?.data?.message || 'Error'));
    }
}

export function* watchMutualistasSaga() {
    yield takeLatest(indexMutualistasRequest.type, indexMutualistasSaga);
    yield takeLatest(searchMutualistasRequest.type, searchMutualistasSaga);
    yield takeLatest(storeMutualistaRequest.type, storeMutualistaSaga);
    yield takeLatest(showMutualistaRequest.type, showMutualistaSaga);
    yield takeLatest(updateMutualistaRequest.type, updateMutualistaSaga);
    yield takeLatest(destroyMutualistaRequest.type, destroyMutualistaSaga);
}