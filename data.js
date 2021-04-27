const createData = (code, type, note, deadline) => {
    return {
        code,
        type,
        note,
        deadline,
    };
};

var dateFormat = require("dateformat");
const convertDataTime = (x) => {
    x.deadline = dateFormat(x.deadline, "dd-mm-yyyy");
    return x;
};

const convertTime = (date) => {
    return dateFormat(date, "dd-mm-yyyy");
};

const currentTime = () => {
    return dateFormat(new Date(), "dd-mm-yyyy");
};

module.exports = {
    createData,
    convertDataTime,
    convertTime,
    currentTime,
};

/**
 * type: 1
 * body: {
 * code: "IF2121",
 * type: "TUBES",
 * note: "Bot reminder tugas",
 * deadline: "27-04-2021"
 * }
 *
 * type: 2
 * body: {
 * fromDate: (defaultnya now) "01-01-2000"
 * toDate: "31-12-2001"
 * durasi: (opsional soalnya fungsi gw ga nerima nowdate, basically fromDate = now, toDate = now + durasi hari)
 * types: ["Tubes", "Kuis"] (buat filter)
 * }
 *
 * type: 3
 * body: {
 * Code: "IF2211"
 * types: ["Tucil", "Praktikum"] (filter)
 * }
 *
 * type: 4
 * body: {
 * IDTASK: 69,
 * deadline: "01-01-2020"
 * }
 *
 * type: 5
 * body: [69, 420] (ID2 tugas yg kelar dikerjain)
 *
 * type: 6 (help)
 *
 * type: 0 (error)
 *
 */
