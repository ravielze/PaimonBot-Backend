const { Pool } = require("pg");
const { convertDataTime, convertTime, currentTime } = require("./data");
const bcrypt = require("bcrypt");
require("dotenv").config();

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

const createUserTable = () => {
    var table = `
    CREATE TABLE IF NOT EXISTS "user" (
        "user_id" SERIAL PRIMARY KEY,
        "username" VARCHAR(32) UNIQUE NOT NULL,
        "password" VARCHAR(128) NOT NULL
    )`;
    pool.query(table).catch((err) =>
        setImmediate(() => {
            throw err;
        })
    );
};

const getUserByUsername = (username) => {
    var query = `
    SELECT * from "user"
    WHERE username = $1`;
    return pool
        .query(query, [username])
        .then((res) => res.rows[0])
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

const isUsernameExist = (username) => {
    var query = `
    SELECT * from "user"
    WHERE username = $1`;
    return pool
        .query(query, [username])
        .then((res) => {
            return res.rowCount != 0;
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

const createUser = async (username, password) => {
    const salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);
    var query = `
    INSERT INTO "user"
      (username, password)
      VALUES
      ($1, $2) RETURNING user_id`;
    return pool
        .query(query, [username, hashedPassword])
        .then((res) => res.rows[0].user_id)
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

/**
 * IDTASK (INT) | Code VARCHAR(6) | type VARCHAR(16) | Note VARCHAR(1024) | deadline (DATE) | Done (BOOL)
 */
const createTaskTable = () => {
    var table = `
        CREATE TABLE IF NOT EXISTS "task" (
        "user_id" INT,
        "task_id" SERIAL,
        "code" VARCHAR(6) DEFAULT '',
        "type" VARCHAR(12) DEFAULT '',
        "note" VARCHAR(1024) DEFAULT '',
        "deadline" DATE DEFAULT NOW(),
        "done" BOOLEAN DEFAULT FALSE,
        FOREIGN KEY(user_id) REFERENCES "user" (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (user_id, task_id)
        )`;
    pool.query(table).catch((err) =>
        setImmediate(() => {
            throw err;
        })
    );
};

const insertTask = (data, userId) => {
    var query = `
    INSERT INTO "task"
      (user_id, code, type, note, deadline)
      VALUES
      ($1, $2, $3, $4, $5)`;
    pool.query(query, [
        userId,
        data.code,
        data.type,
        data.note,
        data.deadline,
    ]).catch((err) =>
        setImmediate(() => {
            throw err;
        })
    );
};

const removeTask = (userId, idtask) => {
    var query = `
    UPDATE "task" SET done = TRUE
    WHERE user_id = $2 AND deadline >= to_date($3, 'dd-mm-yyyy')
    task_id = $1 AND done = FALSE`;
    return pool
        .query(query, [idtask, userId, currentTime()])
        .then((res) => res.rowCount != 0)
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

const updateTask = (idtask, deadline, userId) => {
    var query = `
    UPDATE "task" SET deadline = $2
    WHERE
    task_id = $1 AND user_id = $3`;
    return pool
        .query(query, [idtask, deadline, userId])
        .then((res) => res.rowCount != 0)
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

const getTasksByCode = (code, userId) => {
    var query = `
    SELECT * from "task"
    WHERE code = $1 AND user_id = $2 AND done = FALSE`;
    return pool
        .query(query, [code, userId])
        .then((res) => {
            res.rows.map((x) => convertDataTime(x));
            return res.rows;
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

const getTasks = (userId) => {
    var query = `
    SELECT * from "task"
    WHERE done = FALSE AND
    deadline >= to_date($2, 'dd-mm-yyyy') AND
    user_id = $1
    ORDER BY deadline ASC`;
    return pool
        .query(query, [userId, currentTime()])
        .then((res) => {
            res.rows.map((x) => convertDataTime(x));
            return res.rows;
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};
const getFilteredTasks = async (userId, code, filterType) => {
    var result = [];
    var query = `
    SELECT * from "task"
    WHERE done = FALSE AND
    deadline >= to_date($4, 'dd-mm-yyyy') AND
    AND code = $3 AND
    user_id = $1 AND type = $2
    ORDER BY deadline ASC`;
    for (var i = 0; i < filterType.length; i++) {
        var rs = await pool
            .query(query, [userId, filterType[i], code, currentTime()])
            .then((res) => {
                res.rows.map((x) => convertDataTime(x));
                return res.rows;
            })
            .catch((err) =>
                setImmediate(() => {
                    throw err;
                })
            );
        result.push(...rs);
    }
    return result;
};

const getTasksByDate = (fromDate, toDate, userId) => {
    var query = `
    SELECT * from "task"
    WHERE done = FALSE AND
    deadline >= to_date($1, 'dd-mm-yyyy') AND
    deadline <= to_date($2, 'dd-mm-yyyy')
    AND user_id = $2
    ORDER BY deadline ASC`;
    return pool
        .query(query, [fromDate, toDate, userId])
        .then((res) => {
            res.rows.map((x) => convertDataTime(x));
            return res.rows;
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

const getTodayTask = (userId) => {
    var query = `
    SELECT * from "task"
    WHERE done = FALSE AND
    deadline = to_date($1, 'dd-mm-yyyy')
    AND user_id = $2
    ORDER BY deadline ASC`;
    return pool
        .query(query, [currentTime(), userId])
        .then((res) => {
            res.rows.map((x) => convertDataTime(x));
            return res.rows;
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

const getTasksByDay = (day, userId) => {
    if (day == 0) {
        return getTodayTask(userId);
    }
    var query = `
    SELECT * from "task"
    WHERE done = FALSE AND
    deadline >= to_date($3, 'dd-mm-yyyy') AND
    deadline <= to_date($1, 'dd-mm-yyyy')
    AND user_id = $2
    ORDER BY deadline ASC`;
    var time = new Date();
    time = time.setDate(time.getDate() + day);
    var t = convertTime(time);
    return pool
        .query(query, [t, userId, currentTime()])
        .then((res) => {
            res.rows.map((x) => convertDataTime(x));
            return res.rows;
        })
        .catch((err) =>
            setImmediate(() => {
                throw err;
            })
        );
};

module.exports = {
    createTaskTable,
    insertTask,
    removeTask,
    updateTask,
    getTasksByCode,
    getTasks,
    getTasksByDate,
    getTasksByDay,
    createUserTable,
    createUser,
    getUserByUsername,
    isUsernameExist,
    getFilteredTasks,
};
