import { db } from "./index";

// https://docs.expo.io/versions/latest/sdk/sqlite/
export function insertData(sqlStatement, args, successCallback) {
  db.transaction((tx) => {
    tx.executeSql(sqlStatement, args, successCallback, (err) => {
      console.log("Error insert data");
      console.log(err);
    });
  });
}

export function selectData(sqlStatement, args, successCallback) {
  db.transaction((tx) => {
    tx.executeSql(sqlStatement, args, successCallback, (err) => {
      console.log("Error select data");
      console.log(err);
    });
  });
}
