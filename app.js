const express = require("express");
const { createData } = require("./data");
const { createTaskTable, createUserTable } = require("./database");
require("dotenv").config();
const { login, register, createTask, deleteTask } = require("./usecase");

var app = express();
var server = app.listen(3000);
var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

var usercount = 0;
io.on("connection", function (socket) {
    var userId = -1;
    usercount++;
    console.log(
        `Anonymous User Connected\nCurrent User Connected: ${usercount}`
    );
    socket.on("disconnect", () => {
        usercount--;
        if (userId != -1) {
            console.log(
                `Anonymous User Disconnected\nCurrent User Connected: ${usercount}`
            );
        } else {
            console.log(
                `User ${userId} Disconnected\nCurrent User Connected: ${usercount}`
            );
        }
    });
    socket.on("login", async (data) => {
        const { username = "", password = "" } = data;
        const loginUserId = await login(username, password);
        if (loginUserId != -1) {
            userId = loginUserId;
            socket.emit("login_success");
            console.log(`User ${username} has logged in`);
            return;
        }
        socket.emit("login_failed");
    });
    socket.on("register", async (data) => {
        const { username = "", password = "" } = data;
        const registerUserId = await register(username, password);
        if (registerUserId != -1) {
            userId = registerUserId;
            socket.emit("register_success");
            console.log(`Registered New User: ${username}`);
            return;
        }
        socket.emit("register_failed");
    });
    socket.on("create_task", async (data) => {
        if (userId != -1) {
            createTask(userId, data);
        }
    });
    socket.on("delete_task", async (data) => {
        if (userId != -1) {
            deleteTask(userId, data);
        }
    });
});

createUserTable();
createTaskTable();
