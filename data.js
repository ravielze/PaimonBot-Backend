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

module.exports = { emptyData, createData };
