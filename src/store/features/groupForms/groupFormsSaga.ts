import { call, put, takeLatest } from 'redux-saga/effects';
import { clearGroupFormsRequest, destroyGroupFormFailure, destroyGroupFormRequest, destroyGroupFormSuccess, indexGroupFormsFailure, indexGroupFormsRequest, indexGroupFormsSuccess, showGroupFormFailure, showGroupFormRequest, showGroupFormSuccess, storeGroupFormFailure, storeGroupFormRequest, storeGroupFormSuccess, updateGroupFormFailure, updateGroupFormRequest, updateGroupFormSuccess } from './groupFormsSlice';
import { destroyGroupFormAPI, indexGroupFormsAPI, showGroupFormAPI, storeGroupFormAPI, updateGroupFormAPI } from '../../../helper/api/backend';

function* indexGroupFormsSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearGroupFormsRequest());
        const res = yield call(indexGroupFormsAPI, action.payload);
        yield put(indexGroupFormsSuccess(res));
    } catch (error: any) {
        yield put(indexGroupFormsFailure(error?.response?.data?.message || 'Error'));
    }
}

function* storeGroupFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearGroupFormsRequest());
        const res = yield call(storeGroupFormAPI, action.payload);
        yield put(storeGroupFormSuccess(res));
    } catch (error: any) {
        yield put(storeGroupFormFailure(error?.response?.data?.message || 'Error'));
    }
}

function* showGroupFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearGroupFormsRequest());
        const res = yield call(showGroupFormAPI, action.payload);
        yield put(showGroupFormSuccess(res));
    } catch (error: any) {
        yield put(showGroupFormFailure(error?.response?.data?.message || 'Error'));
    }
}

function* updateGroupFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearGroupFormsRequest());
        const res = yield call(updateGroupFormAPI, action.payload);
        yield put(updateGroupFormSuccess(res));
    } catch (error: any) {
        yield put(updateGroupFormFailure(error?.response?.data?.message || 'Error'));
    }
}

function* destroyGroupFormSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearGroupFormsRequest());
        const res = yield call(destroyGroupFormAPI, action.payload);
        yield put(destroyGroupFormSuccess(res.message));
    } catch (error: any) {
        yield put(destroyGroupFormFailure(error?.response?.data?.message || 'Error'));
    }
}

export function* watchGroupFormsSaga() {
    yield takeLatest(indexGroupFormsRequest.type, indexGroupFormsSaga);
    yield takeLatest(storeGroupFormRequest.type, storeGroupFormSaga);
    yield takeLatest(showGroupFormRequest.type, showGroupFormSaga);
    yield takeLatest(updateGroupFormRequest.type, updateGroupFormSaga);
    yield takeLatest(destroyGroupFormRequest.type, destroyGroupFormSaga);
}
