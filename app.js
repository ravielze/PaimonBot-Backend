const express = require("express");
const { convertString } = require("./algorithm");
const { createTaskTable, createUserTable } = require("./database");
require("dotenv").config();
const { login, register, runUsecase, sendTask } = require("./usecase");

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
        if (userId == -1) {
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
            socket.emit("message", {
                message: `Selamat datang kembali ${username}!`,
            });
            var result = await sendTask(userId);
            socket.emit("message", { message: result });
            socket.emit("sticker", 5);
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
    socket.on("message", async (data) => {
        const { message = "" } = data;
        if (userId != -1) {
            const result = convertString(message);
            const response = await runUsecase(userId, result);
            socket.emit("message", { message: response[0] });
            var box = [0, 1, 1, 1, 0];
            if (box[(Math.random() * box.length) | 0] == 0) {
                socket.emit("sticker", parseInt(box[1]));
            }
        } else {
            socket.emit("message", {
                message: "Anda perlu melakukan login/register.",
            });
        }
    });
});

createUserTable();
createTaskTable();
