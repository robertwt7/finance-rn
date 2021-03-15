import { db } from "./index";

// https://docs.expo.io/versions/latest/sdk/sqlite/
export function insertData(sqlStatement, args, successCallback) {
  db.transaction((tx) => {
    tx.executeSql(sqlStatement, args, successCallback, (err) =>
      console.log(err)
    );
  });
}

export function selectData(sqlStatement, args) {
  let data;
  db.transaction((tx) => {
    tx.executeSql(sqlStatement, args, (_, { rows: { _array } }) => {
      data = _array;
    });
  });

  return data;
}
