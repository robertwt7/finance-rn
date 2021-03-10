// Based on the keyed versions
const migrations = {
  0: [
    {
      query: `CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          income BOOLEAN DEFAULT 0,
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
};

export default migrations;
