const express = require("express");
const { createData } = require("./data");
require("dotenv").config();
const {
    createTaskTable,
    insertTask,
    emptyData,
    deleteTask,
    updateTask,
} = require("./database");

var app = express();
var server = app.listen(3000);
var io = require("socket.io")(server);

createTaskTable();
const dummy1 = createData("IF1111", "TUBES", "Apa ya", "30-04-2021");
const dummy2 = createData("IF1112", "TUCIL", "gatau", "01-05-2021");
insertTask(dummy1);
insertTask(dummy2);
