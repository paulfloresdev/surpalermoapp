import { call, put, takeLatest } from 'redux-saga/effects';
import { clearEFormRequest, destroyEFormFailure, destroyEFormRequest, destroyEFormSuccess, indexEFormsFailure, indexEFormsRequest, indexEFormsSuccess, showEFormFailure, showEFormRequest, showEFormSuccess, storeEFormFailure, storeEFormRequest, storeEFormSuccess, updateEFormFailure, updateEFormRequest, updateEFormSuccess } from './EFormSlice';
import { destroyEFormAPI, indexEFormsAPI, showEFormAPI, storeEFormAPI, updateEFormAPI } from '../../../../helper/api/backend';

function* indexEFormsSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearEFormRequest());
        const res = yield call(indexEFormsAPI, action.payload);
        yield put(indexEFormsSuccess(res));
    } catch (error: any) {
        yield put(indexEFormsFailure(error.response.data.message || 'Error'));
    }
}

function* storeEFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearEFormRequest());
        const res = yield call(storeEFormAPI, action.payload);
        yield put(storeEFormSuccess(res));
    } catch (error: any) {
        yield put(storeEFormFailure(error.response.data.message || 'Error'));
    }
}

function* showEFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearEFormRequest());
        const res = yield call(showEFormAPI, action.payload);
        yield put(showEFormSuccess(res));
    } catch (error: any) {
        yield put(showEFormFailure(error.response.data.message || 'Error'));
    }
}

function* updateEFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearEFormRequest());
        const res = yield call(updateEFormAPI, action.payload);
        yield put(updateEFormSuccess(res));
    } catch (error: any) {
        yield put(updateEFormFailure(error.response.data.message || 'Error'));
    }
}

function* destroyEFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearEFormRequest());
        const res = yield call(destroyEFormAPI, action.payload);
        yield put(destroyEFormSuccess(res));
    } catch (error: any) {
        yield put(destroyEFormFailure(error.response.data.message || 'Error'));
    }
}

export function* watchEFormSaga() {
    yield takeLatest(indexEFormsRequest.type, indexEFormsSaga);
    yield takeLatest(storeEFormRequest.type, storeEFormSaga);
    yield takeLatest(showEFormRequest.type, showEFormSaga);
    yield takeLatest(updateEFormRequest.type, updateEFormSaga);
    yield takeLatest(destroyEFormRequest.type, destroyEFormSaga);
}