const { Pool } = require("pg");
const connString =
    "tcp://" +
    process.env.PGUSER +
    ":" +
    process.env.PGPASSWORD +
    "@" +
    process.env.PGHOST +
    ":" +
    process.env.PGPORT +
    "/" +
    process.env.PGDB;

const pool = new Pool({
    connectionString: connString,
});

pool.connect((err) => {
    if (err) {
        console.error("Database connection error", err.stack);
    } else {
        console.log("Database connected");
    }
});

/**
 * IDTASK (INT) | Code VARCHAR(6) | type VARCHAR(16) | Note VARCHAR(1024) | deadline (DATE) | Done (BOOL)
 */
const createTaskTable = () => {
    var table = `
        CREATE TABLE IF NOT EXISTS "task" (
        "task_id" SERIAL PRIMARY KEY,
        "code" VARCHAR(6) DEFAULT '',
        "type" VARCHAR(8) DEFAULT '',
        "note" VARCHAR(1024) DEFAULT '',
        "deadline" DATE DEFAULT NOW(),
        "done" BOOLEAN DEFAULT FALSE
        )`;
    pool.query(table)
        .then((res) => console.log(res))
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

const insertTask = (data) => {
    var query = `
    INSERT INTO "task"
      (code, type, note, deadline)
      VALUES
      ($1, $2, $3, $4)`;
    pool.query(query, [data.code, data.type, data.note, data.deadline]).catch(
        (err) =>
            setImmediate(() => {
                throw err;
            })
    );
};

const deleteTask = (idtask) => {
    var query = `
    UPDATE "task" SET done = TRUE
    WHERE
    task_id = $1`;
    pool.query(query, [idtask]).catch((err) =>
        setImmediate(() => {
            throw err;
        })
    );
};

const updateTask = (idtask, deadline) => {
    var query = `
    UPDATE "task" SET deadline = $2
    WHERE
    task_id = $1`;
    pool.query(query, [idtask, deadline]).catch((err) =>
        setImmediate(() => {
            throw err;
        })
    );
};

const getTaskByCode = (code) => {
    var query = `
    SELECT * from "task"
    WHERE code = $1`;
    return pool
        .query(query, [query])
        .then((res) => res.rows)
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

module.exports = {
    createTaskTable,
    insertTask,
    emptyData,
    deleteTask,
    updateTask,
    getTaskByCode,
};
