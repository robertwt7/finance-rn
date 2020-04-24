import { all } from "redux-saga/effects";
import { persistCombineReducers } from "redux-persist";
import { storage } from "redux-persist/lib/storage";

const config = {
	key: "root",
	storage,
};

/**
 * Instead of persisting each reducer, we persist everything because its react native (app)
 */
export const rootReducer = persistCombineReducers(config, {});

// Do a redux saga if available
export function* rootSaga() {
	yield all([]);
}
