import { call, put, takeLatest } from 'redux-saga/effects';
import { clearCoordinadoresRequest, destroyCoordinadorRequest, destroyCoordinadorsFailure, destroyCoordinadorSuccess, indexCoordinadoresFailure, indexCoordinadoresRequest, indexCoordinadoresSuccess, showCoordinadorFailure, showCoordinadorRequest, showCoordinadorSuccess, storeCoordinadorFailure, storeCoordinadorRequest, storeCoordinadorSuccess, updateCoordinadorFailure, updateCoordinadorRequest, updateCoordinadorSuccess } from './coordinadoresSlice';
import { destroyCoordinadorAPI, indexCoordinadoresAPI, showCoordinadorAPI, storeCoordinadorAPI, updateCoordinadorAPI } from '../../../helper/api/backend';

function* indexCoordinadoresSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearCoordinadoresRequest());
        const res = yield call(indexCoordinadoresAPI, action.payload);
        yield put(indexCoordinadoresSuccess(res));
    } catch (error: any) {
        yield put(indexCoordinadoresFailure(error?.response?.data?.message || 'Error'));
    }
}

function* storeCoordinadorSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearCoordinadoresRequest());
        const res = yield call(storeCoordinadorAPI, action.payload);
        yield put(storeCoordinadorSuccess(res));
    } catch (error: any) {
        yield put(storeCoordinadorFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showCoordinadorSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearCoordinadoresRequest());
        const res = yield call(showCoordinadorAPI, action.payload);
        yield put(showCoordinadorSuccess(res));
    } catch (error: any) {
        yield put(showCoordinadorFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateCoordinadorSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearCoordinadoresRequest());
        const res = yield call(updateCoordinadorAPI, action.payload);
        yield put(updateCoordinadorSuccess(res));
    } catch (error: any) {
        yield put(updateCoordinadorFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroyCoordinadorSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearCoordinadoresRequest());
        const res = yield call(destroyCoordinadorAPI, action.payload);
        yield put(destroyCoordinadorSuccess(res.message));
    } catch (error: any) {
        yield put(destroyCoordinadorsFailure(error?.response?.data?.message || 'Error'));
    }
}

export function* watchCoordinadoresSaga() {
    yield takeLatest(indexCoordinadoresRequest.type, indexCoordinadoresSaga);
    yield takeLatest(storeCoordinadorRequest.type, storeCoordinadorSaga);
    yield takeLatest(showCoordinadorRequest.type, showCoordinadorSaga);
    yield takeLatest(updateCoordinadorRequest.type, updateCoordinadorSaga);
    yield takeLatest(destroyCoordinadorRequest.type, destroyCoordinadorSaga);
}