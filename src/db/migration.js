// Based on the keyed versions
const migrations = {
  0: [
    {
      query: `CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          income BOOLEAN DEFAULT 0,
          amount INTEGER NOT NULL,
          category_id INT,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
          );`,
    },
    {
      query: `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
        );`,
    },
    {
      query: `CREATE TABLE IF NOT EXISTS budgets (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          amount INTEGER DEFAULT 0
          );`,
    },
    {
      query: `CREATE TABLE IF NOT EXISTS budget_transaction (
            budget_id INT NOT NULL,
            transaction_id INT NOT NULL,
            FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE
            FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
            );`,
    },
  ],
  1: [
    {
      query: `ALTER TABLE transactions ADD COLUMN date TEXT;`,
    },
  ],
  2: [
    {
      query: `ALTER TABLE transactions ADD COLUMN repeat INT;`,
    },
    {
      query: `ALTER TABLE transactions ADD COLUMN end_repeat_date TEXT`,
    },
  ],
};

export default migrations;
