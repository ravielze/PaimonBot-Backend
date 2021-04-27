const borderFunction = (string) => {
    var bf = [0];
    var j = 0;
    var i = 1;
    while (i < string.length) {
        if (string[i] == string[j]) {
            j++;
            bf.push(j);
            i++;
        } else {
            if (j == 0) {
                bf.push(0);
                i++;
            } else {
                j = bf[j - 1];
            }
        }
    }
    return bf;
};

//Mengembalikan pola pattern muncul mulai idx berapa saja
const findOccurence = (pattern, text) => {
    pattern = pattern.toLowerCase();
    text = text.toLowerCase();
    var bf = borderFunction(pattern);
    var toReturn = [];
    var i = 0;
    var j = 0;
    while (i < text.length) {
        if (text[i] == pattern[j]) {
            i++;
            j++;
        } else if (j == pattern.length) {
            toReturn.push(i - j);
            j = bf[j - 1];
        } else if (j == 0) {
            i++;
        } else {
            j = bf[j - 1];
        }
    }
    if (j == pattern.length) {
        toReturn.push(i - j);
    }
    return toReturn;
};
/*
console.log(borderFunction("AAACAAAAAC"));
console.log(borderFunction("abaAba"));

console.log(findOccurence("tes", "testistes"));
console.log(
    findOccurence(
        "DeaDLiNe",
        "Halo pak bos deadline STIMA 2 hari lagi nih, cek typo dedline deadline"
    )
);
*/

const taskType = ["Kuis", "Ujian", "Tucil", "Tubes", "Praktikum"];
const process = (text) => {
    /*
1. Nambah tugas
Keyword: -
Komponen: Type, Code, Note, Duedate
Type: Kuis, Ujian, Tucil, Tubes, Praktikum
*/

    /*
2. Daftar deadline
Keyword: deadline
Komponen: (fromDate(opsional), endDate) / durasi
Durasi: x hari, x minggu
*/
    if (findOccurence("deadline", text).length > 0) {
        var date = text.match(/\d{2}-\d{2}-\d{4}/g);
        var types = [];
        for (var i = 0; i < 5; i++) {
            if (findOccurence(taskType[i], text).length > 0) {
                types.push(taskType[i]);
            }
        }
        if (date.length > 1) {
            return {
                type: 2,
                body: {
                    fromDate: date[0],
                    toDate: date[1],
                    type: types,
                },
            };
        } else if (date.length == 1) {
            return {
                type: 2,
                body: {
                    toDate: date[0],
                    type: types,
                },
            };
        } else {
            if (/hari ini/i.test(text)) {
                return {
                    type: 2,
                    body: {
                        duration: 0,
                        type: types,
                    },
                };
            }
            var days = /\d* hari/i.exec(text);
            var weeks = /\d* minggu/i.exec(text);
            if (days.length > 0 || weeks.length > 0) {
                return {
                    type: 2,
                    body: {
                        duration:
                            parseInt(days[0].split(" ")[0]) +
                            7 * parseInt(weeks[0].split(" ")[0]),
                        type: types,
                    },
                };
            }
        }
    }

    /*
3. Tampil deadline
Keyword: kapan
Komponen: Code
*/
    if (findOccurence("kapan", text).length > 0) {
        var code = text.match(/[A-Z]{2}\d{4}/g);
        if (code.length > 1) {
            return {
                type: 3,
                body: { Code: code[0] },
            };
        }
    }

    /*
4. Update task
Keyword: dimajukan, diundur, task
Komponen: Date, ID Task
*/
    if (
        findOccurence("dimajukan", text).length > 0 ||
        findOccurence("diundur", text).length > 0
    ) {
        var task = text.match(/task \d*/g);
        var date = text.match(/\d{2}-\d{2}-\d{4}/g);
        if (task.length > 0 && date.length > 0) {
            return {
                type: 4,
                body: {
                    IDTASK: parseInt(task[0].split(" ")[1]),
                    deadline: date[0],
                },
            };
        }
    }

    /*
5. Selesai ngerjain
Keyword: kelar ngerjain, task
Komponen: ID Task
*/
    if (findOccurence("kelar ngerjain", text).length > 0) {
        var taskIDs = text.match(/task \d*/g);
        var IDs = [];
        for (var i = 0; i < taskIDs.length; i++) {
            console.log(taskIDs[i]);
            IDs.push(parseInt(taskIDs[i].split(" ")[1]));
        }
        return { type: 5, body: IDs };
    }

    /*
6. Daftar Fitur
Keyword: Help
*/
    if (findOccurence("Help", text).length > 0) {
        return { type: 6 };
    }

    return { type: 0 };
};

console.log(
    process(
        "Video OS yaitu task 5 dimajukan jadi 01-05-2021 coba anjing minta ditabok"
    )
);

/**
 * IDTASK (INT) | Code VARCHAR(6) | type VARCHAR(16) | Note VARCHAR(1024) | deadline (DATE) | Done (BOOL)
 */

//
