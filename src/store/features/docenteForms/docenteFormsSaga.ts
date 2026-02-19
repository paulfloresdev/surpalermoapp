import { call, put, takeLatest } from 'redux-saga/effects';
import { clearDocenteFormsRequest, destroyDocenteFormFailure, destroyDocenteFormRequest, destroyDocenteFormSuccess, indexDocenteFormsFailure, indexDocenteFormsRequest, indexDocenteFormsSuccess, showDocenteFormFailure, showDocenteFormRequest, showDocenteFormSuccess, storeDocenteFormFailure, storeDocenteFormRequest, storeDocenteFormSuccess, updateDocenteFormFailure, updateDocenteFormRequest, updateDocenteFormSuccess } from './docenteFormsSlice';
import { destroyDocenteFormAPI, indexDocenteFormsAPI, showDocenteFormAPI, storeDocenteFormAPI, updateDocenteFormAPI } from '../../../helper/api/backend';

function* indexDocenteFormsSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocenteFormsRequest());
        const res = yield call(indexDocenteFormsAPI, action.payload);
        yield put(indexDocenteFormsSuccess(res));
    } catch (error: any) {
        yield put(indexDocenteFormsFailure(error?.response?.data?.message || 'Error'));
    }
}


function* storeDocenteFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocenteFormsRequest());
        const res = yield call(storeDocenteFormAPI, action.payload);
        yield put(storeDocenteFormSuccess(res));
    } catch (error: any) {
        yield put(storeDocenteFormFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showDocenteFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocenteFormsRequest());
        const res = yield call(showDocenteFormAPI, action.payload);
        yield put(showDocenteFormSuccess(res));
    } catch (error: any) {
        yield put(showDocenteFormFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateDocenteFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocenteFormsRequest());
        const res = yield call(updateDocenteFormAPI, action.payload);
        yield put(updateDocenteFormSuccess(res));
    } catch (error: any) {
        yield put(updateDocenteFormFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroyDocenteFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocenteFormsRequest());
        const res = yield call(destroyDocenteFormAPI, action.payload);
        yield put(destroyDocenteFormSuccess(res.message));
    } catch (error: any) {
        yield put(destroyDocenteFormFailure(error?.response?.data?.message || 'Error'));
    }
}

export function* watchDocenteFormsSaga() {
    yield takeLatest(indexDocenteFormsRequest.type, indexDocenteFormsSaga);
    yield takeLatest(storeDocenteFormRequest.type, storeDocenteFormSaga);
    yield takeLatest(showDocenteFormRequest.type, showDocenteFormSaga);
    yield takeLatest(updateDocenteFormRequest.type, updateDocenteFormSaga);
    yield takeLatest(destroyDocenteFormRequest.type, destroyDocenteFormSaga);
}