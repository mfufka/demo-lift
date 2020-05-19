import {call, put, takeEvery} from 'redux-saga/effects'

function* callLift(action) {
    try {
        yield call(() => {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'}
            };
            fetch('http://localhost:8080/floor/' + action.payload, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then(() => alert("Okay!"))
                .catch(() => alert("Not okay :("))
        });
        yield put({type: "CALL_LIFT_SUCCEEDED"});
    } catch (e) {
        yield put({type: "CALL_LIFT_FAILED", message: e.message});
    }
}

function* mySaga() {
    yield takeEvery("CALL_LIFT_REQUESTED", callLift);
}

export default mySaga;