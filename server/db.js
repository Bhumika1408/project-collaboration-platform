// server/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Use an actual file for persistent storage in production

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY,
      username TEXT,
      email TEXT,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      project_id INTEGER PRIMARY KEY,
      project_name TEXT,
      description TEXT,
      start_date TEXT,
      end_date TEXT,
      status TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      task_id INTEGER PRIMARY KEY,
      task_name TEXT,
      description TEXT,
      due_date TEXT,
      status TEXT,
      assigned_to INTEGER,
      project_id INTEGER,
      FOREIGN KEY (assigned_to) REFERENCES users(user_id),
      FOREIGN KEY (project_id) REFERENCES projects(project_id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      comment_id INTEGER PRIMARY KEY,
      task_id INTEGER,
      user_id INTEGER,
      comment_text TEXT,
      timestamp TEXT,
      FOREIGN KEY (task_id) REFERENCES tasks(task_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS attachments (
      attachment_id INTEGER PRIMARY KEY,
      task_id INTEGER,
      user_id INTEGER,
      file_path TEXT,
      upload_date TEXT,
      FOREIGN KEY (task_id) REFERENCES tasks(task_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
  `);

  // Sample data (you can remove this in a real application)
  db.run(`
    INSERT INTO users (username, email, password) VALUES
    ('user1', 'user1@example.com', 'password1'),
    ('user2', 'user2@example.com', 'password2')
  `);

  db.run(`
    INSERT INTO projects (project_name, description, start_date, end_date, status) VALUES
    ('Project 1', 'Description 1', '2023-01-01', '2023-02-01', 'Ongoing'),
    ('Project 2', 'Description 2', '2023-02-01', '2023-03-01', 'Completed')
  `);

  db.run(`
    INSERT INTO tasks (task_name, description, due_date, status, assigned_to, project_id) VALUES
    ('Task 1', 'Task 1 Description', '2023-01-15', 'In Progress', 1, 1),
    ('Task 2', 'Task 2 Description', '2023-02-15', 'To Do', 2, 1)
  `);
});

module.exports = db;
