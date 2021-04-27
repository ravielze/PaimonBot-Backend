/**
 * {
 * Code: "IF2121",
 * Type: "TUBES",
 * Note: "Bot reminder tugas",
 * Duedate: "27-04-2021"
 * }
 */

/* REGEX
Duedate: ([0-9]^2 -)^2 [0-9]^4
Code: ([A-Z])^2 [0-9]^4
*/

/*FITURS

1. Nambah tugas
Keyword: -
Komponen: Type, Code, Note, Duedate
Type: Kuis, Ujian, Tucil, Tubes, Praktikum

2. Daftar deadline
Keyword: deadline
Komponen: (fromDate(opsional), endDate) / durasi
Durasi: x hari, x minggu

3. Tampil deadline
Keyword: kapan
Komponen: Code

4. Update task
Keyword: dimajukan, diundur, task
Komponen: Date, ID Task

5. Selesai ngerjain
Keyword: kelar ngerjain, task
Komponen: ID Task

6. Daftar Fitur
Keyword: Help

*/

/**
 * IDTASK (INT) | Code VARCHAR(6) | type VARCHAR(16) | Note VARCHAR(1024) | deadline (DATE) | Done (BOOL)
 */
/**
 * {
 * Code: "IF2121",
 * Type: "TUBES",
 * Note: "Bot reminder tugas",
 * Duedate: "27-04-2021"
 * }
 */

//

const borderFunction = (string) => {
    console.log(string);
};
