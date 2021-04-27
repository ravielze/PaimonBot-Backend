const UNKNOWN = [
    "Ngomong ape sih bang!",
    "Aku cuman bot reminder tugas, jangan ngomong aneh-aneh plis...",
    "Aku ngak ngerti :(",
];

const getUnknownMessage = () => {
    return UNKNOWN[(Math.random() * UNKNOWN.length) | 0];
};

const NO_TASK = [
    "Tidak ada task, yey bebas :D",
    "Nyantuy aja bos, gada task/deadline kok!",
    "Yuhuu, tidak ada deadline",
    "Mau banget deadline ya? Ga ada task bosku!",
];

const getNoTaskMessage = () => {
    return NO_TASK[(Math.random() * NO_TASK.length) | 0];
};

const getTask = (header, data) => {
    var result = "";
    if (data.length > 0) {
        result = header + "\n";
        result += getTaskBuilder(data);
    } else {
        result += getNoTaskMessage();
    }
    return result;
};

const getTaskBuilder = (data) => {
    var result = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i].note != "") {
            result += `(ID ${data[i].task_id}) ${data[i].deadline} - ${data[i].code} - ${data[i].note}\n`;
        } else {
            result += `(ID ${data[i].task_id}) ${data[i].deadline} - ${data[i].code}\n`;
        }
    }
    return result;
};

const OK = [
    "Siap bosku, semangat!",
    "Semangat!!!",
    "Oke",
    "Siap",
    "Sip sip sip",
];

const getOkMessage = () => {
    return OK[(Math.random() * OK.length) | 0];
};

const NOT_OK = [
    "Task ID {$$$} tidak ditemukan.",
    "Itu task id siapa? memangnya ada???",
    "Periksa lagi task idnya karena tidak ditemukan.",
];
const getNotOkMessage = (id) => {
    return NOT_OK[(Math.random() * NOT_OK.length) | 0].replace("{$$$}", id);
};

module.exports = { getUnknownMessage, getTask, getOkMessage, getNotOkMessage };
