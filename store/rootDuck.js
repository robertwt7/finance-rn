import { all } from "redux-saga/effects";
import { persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import * as budget from "./ducks/budget.duck";

const config = {
  key: "root",
  storage: AsyncStorage,
};

/**
 * Instead of persisting each reducer, we persist everything because its react native (app)
 */
export const rootReducer = persistCombineReducers(config, {
  budget: budget.reducer,
});

// Do a redux saga if available
export function* rootSaga() {
  yield all([]);
}
