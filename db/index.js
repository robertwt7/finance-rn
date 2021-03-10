import * as SQLLite from "expo-sqlite";
import migrations from "./migration";

export const db = SQLLite.openDatabase("FinanceDB");
export default class FinanceDB {
  constructor() {
    this.db = db;
    this.versionRecord = {};
  }

  setVersionRecord = (data) => {
    this.versionRecord = data;
  };

  getDB() {
    return this.db;
  }

  init() {
    this.db.transaction((tx) => {
      tx.executeSql(`
      CREATE TABLE IF NOT EXISTS schema_version (
        version INT NOT NULL
      );
      `);

      // Get the current db version
      tx.executeSql(
        `
      SELECT version FROM schema_version;
      `,
        undefined,
        (_, { rows: { _array } }) => this.setVersionRecord(_array)
      );

      const version = this.versionRecord.length
        ? this.versionRecord[0].version
        : 0;

      let counter = 0;
      // Execute migration based on the version
      Object.keys(migrations).forEach((ver) => {
        if (ver >= version) {
          migrations[ver].forEach((item) => {
            tx.executeSql(item.query, undefined, undefined, (_, err) => {
              console.log("Error in db creation:");
              console.log(err);
            });
          });

          // Next version to migrate would be migration key + 1÷
          counter = parseInt(ver, 10) + 1;
        }
      });

      // Add counter to the version number for how many times db is executed
      if (version === 0) {
        tx.executeSql(`
          INSERT INTO schema_version
          VALUES (${counter});
        `);

        // Execute forms seeder here!!
      } else {
        // Add future migrations here for update
        tx.executeSql(`
        UPDATE schema_version
        SET version = ${counter};
        `);
      }
    });
  }
}
