const emptyData = () => {
    return {
        code: "",
        type: "",
        note: "",
        deadline: "",
    };
};

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

module.exports = { emptyData, createData, convertDataTime, convertTime };

/**
 * type: 1
 * data: {
 * Code: "IF2121",
 * Type: "TUBES",
 * Note: "Bot reminder tugas",
 * Duedate: "27-04-2021"
 * }
 *
 * type: 2
 * body: {
 * fromDate: (defaultnya now) "01-01-2000"
 * toDate: "31-12-2001"
 * durasi: (opsional soalnya fungsi gw ga nerima nowdate, basically fromDate = now, toDate = now + durasi hari)
 * types: ["Hari"]
 * }
 *
 * type: 3
 * body: {
 * Code: "IF2211"
 * }
 *
 * type: 4
 * body: {
 * IDTASK: 69,
 * deadline: "01-01-2020"
 * }
 *
 * type: 5
 * body:
 *
 *
 */
