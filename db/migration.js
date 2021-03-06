// Based on the keyed versions
const migrations = {
  0: [
    {
      query: `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
        );`,
    },
    {
      query: `CREATE TABLE IF NOT EXISTS form_types (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
        );`,
    },
    {
      query: `CREATE TABLE IF NOT EXISTS forms (
        id INTEGER PRIMARY KEY,
        payload TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0,
        user_id INT NOT NULL,
        form_type_id INT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (form_type_id) REFERENCES form_types(id) ON DELETE CASCADE
        );`,
    },
  ],
};

export default migrations;
