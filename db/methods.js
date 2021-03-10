import { db } from "./index";

// https://docs.expo.io/versions/latest/sdk/sqlite/
export function insertData(sqlStatement, args) {
  let id;
  let affected;

  db.transaction((tx) => {
    tx.executeSql(sqlStatement, args, (_, { insertId, rowsAffected }) => {
      id = insertId;
      affected = rowsAffected;
    });
  });

  return { id, affected };
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
