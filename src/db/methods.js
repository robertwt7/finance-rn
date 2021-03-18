import { db } from "./index";

// https://docs.expo.io/versions/latest/sdk/sqlite/
export function executeSQL(sqlStatement, args, successCallback) {
  db.transaction((tx) => {
    tx.executeSql(sqlStatement, args, successCallback, (err) => {
      console.log("Error executing sql");
      console.log(err);
    });
  });
}
