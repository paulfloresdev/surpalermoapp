import { call, put, takeLatest } from 'redux-saga/effects';
import { asignarNoTicketFailure, asignarNoTicketRequest, asignarNoTicketSuccess, clearTicketRequest, destroyTicketFailure, destroyTicketRequest, destroyTicketSuccess, facturarByIdFailure, facturarByIdRequest, facturarByIdSuccess, facturarByTicketFailure, facturarByTicketRequest, facturarByTicketSuccess, indexTicketsFailure, indexTicketsRequest, indexTicketsSuccess, searchTicketsFailure, searchTicketsRequest, searchTicketsSuccess, showTicketFailure, showTicketRequest, showTicketSuccess, storeTicketFailure, storeTicketRequest, storeTicketSuccess, updateTicketFailure, updateTicketRequest, updateTicketSuccess } from './ticketsSlice';
import { asignarNoTicketAPI, destroyTicketAPI, facturarByIdAPI, facturarByTicketAPI, indexTicketsAPI, searchTicketsAPI, showTicketAPI, storeTicketAPI, updateTicketAPI } from '../../../helper/api/backend';

function* indexTicketsSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearTicketRequest());
        const res = yield call(indexTicketsAPI, action.payload);
        yield put(indexTicketsSuccess(res));
    } catch (error: any) {
        yield put(indexTicketsFailure(error.response.data.message || 'Error'));
    }
}

function* storeTicketSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearTicketRequest());
        const res = yield call(storeTicketAPI, action.payload);
        yield put(storeTicketSuccess(res));
    } catch (error: any) {
        yield put(storeTicketFailure(error.response.data.message || 'Error'));
    }
}

function* showTicketSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearTicketRequest());
        const res = yield call(showTicketAPI, action.payload);
        yield put(showTicketSuccess(res));
    } catch (error: any) {
        yield put(showTicketFailure(error.response.data.message || 'Error'));
    }
}

function* updateTicketSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearTicketRequest());
        const res = yield call(updateTicketAPI, action.payload);
        yield put(updateTicketSuccess(res));
    } catch (error: any) {
        yield put(updateTicketFailure(error.response.data.message || 'Error'));
    }
}

function* destroyTicketSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearTicketRequest());
        const res = yield call(destroyTicketAPI, action.payload);
        yield put(destroyTicketSuccess(res));
    } catch (error: any) {
        yield put(destroyTicketFailure(error.response.data.message || 'Error'));
    }
}

function* searchTicketsSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearTicketRequest());
        const res = yield call(searchTicketsAPI, action.payload);
        yield put(searchTicketsSuccess(res));
    } catch (error: any) {
        yield put(searchTicketsFailure(error.response.data.message || 'Error'));
    }
}

function* facturarByTicketSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearTicketRequest());
        const res = yield call(facturarByTicketAPI, action.payload);
        yield put(facturarByTicketSuccess(res));
    } catch (error: any) {
        yield put(facturarByTicketFailure(error.response.data.message || 'Error'));
    }
}

function* facturarByIdSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearTicketRequest());
        const res = yield call(facturarByIdAPI, action.payload);
        yield put(facturarByIdSuccess(res));
    } catch (error: any) {
        yield put(facturarByIdFailure(error.response.data.message || 'Error'));
    }
}

function* asignarNoTicketSaga(action: any): Generator<any, any, any> {
    try {
        yield put(clearTicketRequest());
        const res = yield call(asignarNoTicketAPI, action.payload);
        yield put(asignarNoTicketSuccess(res));
    } catch (error: any) {
        yield put(asignarNoTicketFailure(error.response.data.message || 'Error'));
    }
}

export function* watchTicketsSaga() {
    yield takeLatest(indexTicketsRequest.type, indexTicketsSaga);
    yield takeLatest(storeTicketRequest.type, storeTicketSaga);
    yield takeLatest(showTicketRequest.type, showTicketSaga);
    yield takeLatest(updateTicketRequest.type, updateTicketSaga);
    yield takeLatest(destroyTicketRequest.type, destroyTicketSaga);
    yield takeLatest(searchTicketsRequest.type, searchTicketsSaga);
    yield takeLatest(facturarByTicketRequest.type, facturarByTicketSaga);
    yield takeLatest(facturarByIdRequest.type, facturarByIdSaga);
    yield takeLatest(asignarNoTicketRequest.type, asignarNoTicketSaga);
}