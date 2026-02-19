import { call, put, takeLatest } from 'redux-saga/effects';
import { clearMedicosRequest, destroyMedicoFailure, destroyMedicoRequest, destroyMedicoSuccess, indexMedicosFailure, indexMedicosRequest, indexMedicosSuccess, paginatedMedicosFailure, paginatedMedicosRequest, paginatedMedicosSuccess, showMedicoFailure, showMedicoRequest, showMedicoSuccess, storeMedicoFailure, storeMedicoRequest, storeMedicoSuccess, updateMedicoFailure, updateMedicoRequest, updateMedicoSuccess } from './medicosSlice';
import { destroyMedicoAPI, indexMedicosAPI, paginatedMedicosAPI, showMedicoAPI, storeMedicoAPI, updateMedicoAPI } from '../../../helper/api/backend';

function* indexMedicosSaga(): Generator<any, any, any> {
    try {
        yield put(clearMedicosRequest());
        const res = yield call(indexMedicosAPI);
        yield put(indexMedicosSuccess(res));
    } catch (error: any) {
        yield put(indexMedicosFailure(error?.response?.data?.message || 'Error'));
    }
}

function* paginatedMedicosSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearMedicosRequest());
        const res = yield call(paginatedMedicosAPI, action.payload);
        yield put(paginatedMedicosSuccess(res));
    } catch (error: any) {
        yield put(paginatedMedicosFailure(error?.response?.data?.message || 'Error'));
    }
}

function* storeMedicoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearMedicosRequest());
        const res = yield call(storeMedicoAPI, action.payload);
        yield put(storeMedicoSuccess(res));
    } catch (error: any) {
        yield put(storeMedicoFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showMedicoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearMedicosRequest());
        const res = yield call(showMedicoAPI, action.payload);
        yield put(showMedicoSuccess(res));
    } catch (error: any) {
        yield put(showMedicoFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateMedicoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearMedicosRequest());
        const res = yield call(updateMedicoAPI, action.payload);
        yield put(updateMedicoSuccess(res));
    } catch (error: any) {
        yield put(updateMedicoFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroyMedicoSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearMedicosRequest());
        const res = yield call(destroyMedicoAPI, action.payload);
        yield put(destroyMedicoSuccess(res.message));
    } catch (error: any) {
        yield put(destroyMedicoFailure(error?.response?.data?.message || 'Error'))
    }
}

export function* watchMedicosSaga() {
    yield takeLatest(indexMedicosRequest.type, indexMedicosSaga);
    yield takeLatest(paginatedMedicosRequest.type, paginatedMedicosSaga);
    yield takeLatest(storeMedicoRequest.type, storeMedicoSaga);
    yield takeLatest(showMedicoRequest.type, showMedicoSaga);
    yield takeLatest(updateMedicoRequest.type, updateMedicoSaga);
    yield takeLatest(destroyMedicoRequest.type, destroyMedicoSaga);
}
