const {
    isUsernameExist,
    getUserByUsername,
    createUser,
    insertTask,
    removeTask,
    getTasksByDate,
    getTasksByDay,
    getFilteredTasks,
    updateTask,
} = require("./database");
const bcrypt = require("bcrypt");
const { createData, currentTime } = require("./data");
const {
    getUnknownMessage,
    getOkMessage,
    getTask,
    getNotOkMessage,
} = require("./message");

const login = async (username, password) => {
    const exist = await isUsernameExist(username).then((exist) => {
        return exist;
    });
    if (exist) {
        const userData = await getUserByUsername(username);
        const valid = await bcrypt.compare(password, userData.password);
        if (!valid) {
            return -1;
        }
        return userData.user_id;
    }
    return -1;
};

const register = async (username, password) => {
    if (username.length < 4 || password.length < 8) {
        return -1;
    }
    const exist = await isUsernameExist(username).then((exist) => {
        return exist;
    });
    if (!exist) {
        const userData = await createUser(username, password);
        return userData;
    }
    return -1;
};

const createTask = (userId, data) => {
    const { code = "", type = "", note = "", deadline = currentTime() } = data;
    insertTask(createData(code, type, note, deadline), userId);
    return true;
};

const getAllTaskByDate = async (userId, data) => {
    const { fromDate = currentTime(), toDate = currentTime() } = data;
    const result = await getTasksByDate(fromDate, toDate, userId);
    return result;
};

const getAllTaskByDuration = async (userId, data) => {
    const { duration = 0 } = data;
    const result = await getTasksByDay(duration, userId);
    return result;
};

const getAllTaskByCodeAndType = async (userId, data) => {
    const { type = [], code = "" } = data;
    const result = await getFilteredTasks(userId, code, type);
    return result;
};

const updateDeadline = async (userId, data) => {
    const { deadline = currentTime(), taskId = -1 } = data;
    const result = await updateTask(taskId, deadline, userId);
    return result;
};

const markDone = async (userId, data) => {
    const { taskId = -1 } = data;
    const result = await removeTask(userId, taskId);
    return result;
};

const runUsecase = async (userId, data) => {
    const { type = 0, body = {} } = data;
    try {
        switch (parseInt(type)) {
            case 0:
                return [getUnknownMessage(), 0];
            case 1:
                createTask(userId, body);
                return [getOkMessage(), 1];
            case 2:
                var result = await getAllTaskByDate(userId, body);
                return [getTask("[Daftar Deadline/Task]", result), 2];
            case 3:
                var result = await getAllTaskByCodeAndType(userId, body);
                return [getTask("[Daftar Deadline/Task]", result), 3];
            case 4:
                var result = await updateDeadline(userId, body);
                if (result) {
                    return [getOkMessage(), 4];
                } else {
                    return [getNotOkMessage(body.taskId), 4];
                }
            case 5:
                var result = await markDone(userId, body);
                if (result) {
                    return [getOkMessage(), 5];
                } else {
                    return [getNotOkMessage(body.taskId), 5];
                }
            case 6:
                return ["masih todo", 6];
            case 7:
                var result = await getAllTaskByDuration(userId, body);
                return [getTask("[Daftar Deadline/Task]", result), 7];
            default:
                return [getUnknownMessage(), 0];
        }
    } catch (err) {
        console.log(err);
        console.log(type);
        return ["Terjadi kesalahan pada sistem", 0];
    }
};

const sendTask = async (userId) => {
    var result = await getTasksByDay(7, userId);
    return getTask("[Daftar Deadline/Task untuk 1 Minggu kedepan]\n", result);
};

module.exports = { runUsecase, sendTask, login, register };
