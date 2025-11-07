import { call, put, takeLatest } from 'redux-saga/effects';
import { searchSociosAPI } from '../../../../helper/api/backend';
import { searchSociosFailure, searchSociosRequest, searchSociosSuccess } from './searchSociosSlice';

function* searchSociosSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(searchSociosAPI, action.payload);
        yield put(searchSociosSuccess(res.data));
    } catch (error: any) {
        yield put(searchSociosFailure(error?.response?.message || 'Error al buscar socios'));
    }
}

export function* watchSearchSociosSaga() {
    yield takeLatest(searchSociosRequest.type, searchSociosSaga);
}