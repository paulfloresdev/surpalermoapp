import { call, put, takeLatest } from 'redux-saga/effects';
import { clearDocenteGrupoPivotsRequest, destroyDocenteGrupoPivotRequest, destroyDocenteGrupoPivotsFailure, destroyDocenteGrupoPivotSuccess, indexDocenteGrupoPivotsFailure, indexDocenteGrupoPivotsRequest, indexDocenteGrupoPivotsSuccess, showDocenteGrupoPivotFailure, showDocenteGrupoPivotRequest, showDocenteGrupoPivotSuccess, storeDocenteGrupoPivotFailure, storeDocenteGrupoPivotRequest, storeDocenteGrupoPivotSuccess, updateDocenteGrupoPivotFailure, updateDocenteGrupoPivotRequest, updateDocenteGrupoPivotSuccess } from './docenteGrupoPivotsSlice';
import { destroyDocenteGrupoPivotAPI, indexDocenteGrupoPivotsAPI, showDocenteGrupoPivotAPI, storeDocenteGrupoPivotAPI, updateDocenteGrupoPivotAPI } from '../../../helper/api/backend';

function* indexDocenteGrupoPivotsSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocenteGrupoPivotsRequest());
        const res = yield call(indexDocenteGrupoPivotsAPI, action.payload);
        yield put(indexDocenteGrupoPivotsSuccess(res));
    } catch (error: any) {
        yield put(indexDocenteGrupoPivotsFailure(error?.response?.data?.message || 'Error'));
    }
}

function* storeDocenteGrupoPivotSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocenteGrupoPivotsRequest());
        const res = yield call(storeDocenteGrupoPivotAPI, action.payload);
        yield put(storeDocenteGrupoPivotSuccess(res));
    } catch (error: any) {
        yield put(storeDocenteGrupoPivotFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showDocenteGrupoPivotSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocenteGrupoPivotsRequest());
        const res = yield call(showDocenteGrupoPivotAPI, action.payload);
        yield put(showDocenteGrupoPivotSuccess(res));
    } catch (error: any) {
        yield put(showDocenteGrupoPivotFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateDocenteGrupoPivotSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocenteGrupoPivotsRequest());
        const res = yield call(updateDocenteGrupoPivotAPI, action.payload);
        yield put(updateDocenteGrupoPivotSuccess(res));
    } catch (error: any) {
        yield put(updateDocenteGrupoPivotFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroyDocenteGrupoPivotSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearDocenteGrupoPivotsRequest());
        const res = yield call(destroyDocenteGrupoPivotAPI, action.payload);
        yield put(destroyDocenteGrupoPivotSuccess(res.message));
    } catch (error: any) {
        yield put(destroyDocenteGrupoPivotsFailure(error?.response?.data?.message || 'Error'));
    }
}

export function* watchDocenteGrupoPivotsSaga() {
    yield takeLatest(indexDocenteGrupoPivotsRequest.type, indexDocenteGrupoPivotsSaga);
    yield takeLatest(storeDocenteGrupoPivotRequest.type, storeDocenteGrupoPivotSaga);
    yield takeLatest(showDocenteGrupoPivotRequest.type, showDocenteGrupoPivotSaga);
    yield takeLatest(updateDocenteGrupoPivotRequest.type, updateDocenteGrupoPivotSaga);
    yield takeLatest(destroyDocenteGrupoPivotRequest.type, destroyDocenteGrupoPivotSaga);
}