import { call, put, takeLatest } from 'redux-saga/effects';
import { showSocioAPI } from '../../../../helper/api/backend';
import { showSocioFailure, showSocioRequest, showSocioSuccess } from './showSocioSlice';

function* showSocioSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(showSocioAPI, action.payload);
        yield put(showSocioSuccess(res.data));
    } catch (error: any) {
        yield put(showSocioFailure(error?.response?.message || 'Error al buscar socios'));
    }
}

export function* watchShowSocioSaga() {
    yield takeLatest(showSocioRequest.type, showSocioSaga);
}