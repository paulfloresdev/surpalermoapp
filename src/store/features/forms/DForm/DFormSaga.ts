import { call, put, takeLatest } from 'redux-saga/effects';
import { clearDFormRequest, destroyDFormFailure, destroyDFormRequest, destroyDFormSuccess, indexDFormsFailure, indexDFormsRequest, indexDFormsSuccess, showDFormFailure, showDFormRequest, showDFormSuccess, storeDFormFailure, storeDFormRequest, storeDFormSuccess, updateDFormFailure, updateDFormRequest, updateDFormSuccess } from './DFormSlice';
import { destroyDFormAPI, indexDFormsAPI, showDFormAPI, storeDFormAPI, updateDFormAPI } from '../../../../helper/api/backend';

function* indexDFormsSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDFormRequest());
        const res = yield call(indexDFormsAPI, action.payload);
        yield put(indexDFormsSuccess(res));
    } catch (error: any) {
        yield put(indexDFormsFailure(error.response.data.message || 'Error'));
    }
}

function* storeDFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDFormRequest());
        const res = yield call(storeDFormAPI, action.payload);
        yield put(storeDFormSuccess(res));
    } catch (error: any) {
        yield put(storeDFormFailure(error.response.data.message || 'Error'));
    }
}

function* showDFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDFormRequest());
        const res = yield call(showDFormAPI, action.payload);
        yield put(showDFormSuccess(res));
    } catch (error: any) {
        yield put(showDFormFailure(error.response.data.message || 'Error'));
    }
}

function* updateDFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDFormRequest());
        const res = yield call(updateDFormAPI, action.payload);
        yield put(updateDFormSuccess(res));
    } catch (error: any) {
        yield put(updateDFormFailure(error.response.data.message || 'Error'));
    }
}

function* destroyDFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDFormRequest());
        const res = yield call(destroyDFormAPI, action.payload);
        yield put(destroyDFormSuccess(res));
    } catch (error: any) {
        yield put(destroyDFormFailure(error.response.data.message || 'Error'));
    }
}

export function* watchDFormSaga() {
    yield takeLatest(indexDFormsRequest.type, indexDFormsSaga);
    yield takeLatest(storeDFormRequest.type, storeDFormSaga);
    yield takeLatest(showDFormRequest.type, showDFormSaga);
    yield takeLatest(updateDFormRequest.type, updateDFormSaga);
    yield takeLatest(destroyDFormRequest.type, destroyDFormSaga);
}