import { call, put, takeLatest } from 'redux-saga/effects';
import { clearCFormRequest, destroyCFormFailure, destroyCFormRequest, destroyCFormSuccess, indexCFormsFailure, indexCFormsRequest, indexCFormsSuccess, showCFormFailure, showCFormRequest, showCFormSuccess, storeCFormFailure, storeCFormRequest, storeCFormSuccess, updateCFormFailure, updateCFormRequest, updateCFormSuccess } from './CFormSlice';
import { destroyCFormAPI, indexCFormsAPI, showCFormAPI, storeCFormAPI, updateCFormAPI } from '../../../../helper/api/backend';

function* indexCFormsSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearCFormRequest());
        const res = yield call(indexCFormsAPI, action.payload);
        yield put(indexCFormsSuccess(res));
    } catch (error: any) {
        yield put(indexCFormsFailure(error.response.data.message || 'Error'));
    }
}

function* storeCFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearCFormRequest());
        const res = yield call(storeCFormAPI, action.payload);
        yield put(storeCFormSuccess(res));
    } catch (error: any) {
        yield put(storeCFormFailure(error.response.data.message || 'Error'));
    }
}

function* showCFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearCFormRequest());
        const res = yield call(showCFormAPI, action.payload);
        yield put(showCFormSuccess(res));
    } catch (error: any) {
        yield put(showCFormFailure(error.response.data.message || 'Error'));
    }
}

function* updateCFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearCFormRequest());
        const res = yield call(updateCFormAPI, action.payload);
        yield put(updateCFormSuccess(res));
    } catch (error: any) {
        yield put(updateCFormFailure(error.response.data.message || 'Error'));
    }
}

function* destroyCFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearCFormRequest());
        const res = yield call(destroyCFormAPI, action.payload);
        yield put(destroyCFormSuccess(res));
    } catch (error: any) {
        yield put(destroyCFormFailure(error.response.data.message || 'Error'));
    }
}

export function* watchCFormSaga() {
    yield takeLatest(indexCFormsRequest.type, indexCFormsSaga);
    yield takeLatest(storeCFormRequest.type, storeCFormSaga);
    yield takeLatest(showCFormRequest.type, showCFormSaga);
    yield takeLatest(updateCFormRequest.type, updateCFormSaga);
    yield takeLatest(destroyCFormRequest.type, destroyCFormSaga);
}