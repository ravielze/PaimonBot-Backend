const {
    isUsernameExist,
    getUserByUsername,
    createUser,
    insertTask,
    removeTask,
} = require("./database");
const bcrypt = require("bcrypt");
const { createData } = require("./data");

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
    if (username.length < 8 || password.length < 4) {
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
    const { code = "", type = "", note = "", deadline = "" } = data;
    console.log(`Creating task: ${code} | ${type} | ${note} | USER: ${userId}`);
    insertTask(createData(code, type, note, deadline), userId);
};

const deleteTask = async (userId, taskId) => {
    const result = await removeTask(userId, taskId);
    console.log(`Deleting task: ${taskId} | USER: ${userId}`);
    return result;
};

module.exports = { login, register, createTask, deleteTask };
