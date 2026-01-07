import { call, put, takeLatest } from 'redux-saga/effects';
import { clearBFormRequest, destroyBFormFailure, destroyBFormRequest, destroyBFormSuccess, indexBFormsFailure, indexBFormsRequest, indexBFormsSuccess, showBFormFailure, showBFormRequest, showBFormSuccess, storeBFormFailure, storeBFormRequest, storeBFormSuccess, updateBFormFailure, updateBFormRequest, updateBFormSuccess } from './BFormSlice';
import { destroyBFormAPI, indexBFormsAPI, showBFormAPI, storeBFormAPI, updateBFormAPI } from '../../../../helper/api/backend';

function* indexBFormsSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearBFormRequest());
        const res = yield call(indexBFormsAPI, action.payload);
        yield put(indexBFormsSuccess(res));
    } catch (error: any) {
        yield put(indexBFormsFailure(error.response.data.message || 'Error'));
    }
}

function* storeBFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearBFormRequest());
        const res = yield call(storeBFormAPI, action.payload);
        yield put(storeBFormSuccess(res));
    } catch (error: any) {
        yield put(storeBFormFailure(error.response.data.message || 'Error'));
    }
}

function* showBFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearBFormRequest());
        const res = yield call(showBFormAPI, action.payload);
        yield put(showBFormSuccess(res));
    } catch (error: any) {
        yield put(showBFormFailure(error.response.data.message || 'Error'));
    }
}

function* updateBFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearBFormRequest());
        const res = yield call(updateBFormAPI, action.payload);
        yield put(updateBFormSuccess(res));
    } catch (error: any) {
        yield put(updateBFormFailure(error.response.data.message || 'Error'));
    }
}

function* destroyBFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearBFormRequest());
        const res = yield call(destroyBFormAPI, action.payload);
        yield put(destroyBFormSuccess(res));
    } catch (error: any) {
        yield put(destroyBFormFailure(error.response.data.message || 'Error'));
    }
}

export function* watchBFormSaga() {
    yield takeLatest(indexBFormsRequest.type, indexBFormsSaga);
    yield takeLatest(storeBFormRequest.type, storeBFormSaga);
    yield takeLatest(showBFormRequest.type, showBFormSaga);
    yield takeLatest(updateBFormRequest.type, updateBFormSaga);
    yield takeLatest(destroyBFormRequest.type, destroyBFormSaga);
}