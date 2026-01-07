import { call, put, takeLatest } from 'redux-saga/effects';
import { clearAFormRequest, destroyAFormFailure, destroyAFormRequest, destroyAFormSuccess, indexAFormsFailure, indexAFormsRequest, indexAFormsSuccess, showAFormFailure, showAFormRequest, showAFormSuccess, storeAFormFailure, storeAFormRequest, storeAFormSuccess, updateAFormFailure, updateAFormRequest, updateAFormSuccess } from './AFormSlice';
import { destroyAFormAPI, indexAFormsAPI, showAFormAPI, storeAFormAPI, updateAFormAPI } from '../../../../helper/api/backend';

function* indexAFormsSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearAFormRequest());
        const res = yield call(indexAFormsAPI, action.payload);
        yield put(indexAFormsSuccess(res));
    } catch (error: any) {
        yield put(indexAFormsFailure(error.response.data.message || 'Error'));
    }
}

function* storeAFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearAFormRequest());
        const res = yield call(storeAFormAPI, action.payload);
        yield put(storeAFormSuccess(res));
    } catch (error: any) {
        yield put(storeAFormFailure(error.response.data.message || 'Error'));
    }
}

function* showAFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearAFormRequest());
        const res = yield call(showAFormAPI, action.payload);
        yield put(showAFormSuccess(res));
    } catch (error: any) {
        yield put(showAFormFailure(error.response.data.message || 'Error'));
    }
}

function* updateAFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearAFormRequest());
        const res = yield call(updateAFormAPI, action.payload);
        yield put(updateAFormSuccess(res));
    } catch (error: any) {
        yield put(updateAFormFailure(error.response.data.message || 'Error'));
    }
}

function* destroyAFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearAFormRequest());
        const res = yield call(destroyAFormAPI, action.payload);
        yield put(destroyAFormSuccess(res));
    } catch (error: any) {
        yield put(destroyAFormFailure(error.response.data.message || 'Error'));
    }
}

export function* watchAFormSaga() {
    yield takeLatest(indexAFormsRequest.type, indexAFormsSaga);
    yield takeLatest(storeAFormRequest.type, storeAFormSaga);
    yield takeLatest(showAFormRequest.type, showAFormSaga);
    yield takeLatest(updateAFormRequest.type, updateAFormSaga);
    yield takeLatest(destroyAFormRequest.type, destroyAFormSaga);
}