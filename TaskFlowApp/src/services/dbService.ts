import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = "TaskFlow.db";

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: database_name, location: 'default' });
};

export const createTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS Tasks (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT,
        status TEXT,
        createdAt INTEGER
    );`;

  await db.executeSql(query);
};

export const getTasks = async (db: SQLite.SQLiteDatabase) => {
  const tasks: any[] = [];
  const results = await db.executeSql("SELECT * FROM Tasks ORDER BY createdAt DESC");
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      tasks.push(result.rows.item(index));
    }
  });
  return tasks;
};

export const saveTask = async (db: SQLite.SQLiteDatabase, task: any) => {
  const insertQuery = `INSERT OR REPLACE INTO Tasks (id, title, description, priority, status, createdAt) values (?, ?, ?, ?, ?, ?)`;
  return db.executeSql(insertQuery, [
    task.id,
    task.title,
    task.description,
    task.priority,
    task.status,
    task.createdAt
  ]);
};

export const updateTaskStatus = async (db: SQLite.SQLiteDatabase, id: string, status: string) => {
  const updateQuery = `UPDATE Tasks SET status = ? WHERE id = ?`;
  return db.executeSql(updateQuery, [status, id]);
};

export const deleteTaskFromDB = async (db: SQLite.SQLiteDatabase, id: string) => {
  const deleteQuery = `DELETE FROM Tasks WHERE id = ?`;
  return db.executeSql(deleteQuery, [id]);
};
