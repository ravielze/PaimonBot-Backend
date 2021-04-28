Fitur paimon-bot:
1. Menambah Task
Bot akan mendeteksi pesan yang memiliki:
- Kata penting tipe deadline (Kuis, Ujian, Tubes, Tucil, Praktikum)
- Kode mata kuliah (2 huruf diikuti 4 bilangan)
- Note (String diantara kode matkul dan deadline)
- Tanggal deadline (format xx-xx-xxxx)
Dengan urutan demikian, kemudian menambahkan task tersebut

2. Mendaftarkan Task dalam durasi waktu
Bot akan mendeteksi pesan yang memiliki:
- Kata kunci "deadline"
- Tanggal mulai (jika tidak diberikan dianggap sekarang) dan akhir, atau
- Kata penting "hari ini", "x hari", atau "x minggu", dengan x sebuah bilangan
Tidak harus dengan urutan demikian,
kemudian mengembalikan semua task dalam jangka waktu tersebut

3. Menampilkan deadline dari beberapa task tertentu
Bot akan mendeteksi pesan yang memiliki:
- Kata kunci "kapan"
- Filter tipe mata kuliah (jika tidak diberikan dianggap Tucil dan Tubes)
- Kode mata kuliah (2 huruf diikuti 4 bilangan)
Tidak harus dengan urutan demikian,
kemudian mengembalikan daftar deadline task sesuai spesifikasi yang diberikan

4. Memperbarui deadline dari suatu Task
Bot akan mendeteksi pesan yang memiliki:
- Kata kunci "dimajukan" atau "diundur"
- Kata penting "task x", dengan x sebuah bilangan
- Tanggal baru (format xx-xx-xxxx)
Tidak harus dengan urutan demikian,
kemudian memperbarui deadline task x dengan tanggal baru

5. Mencatat suatu Task selesai
Bot akan mendeteksi pesan yang memiliki:
- Kata kunci "kelar"
- Kata penting "task x", dengan x sebuah bilangan
Tidak harus dengan urutan demikian,
kemudian memperbarui status task x sebagai selesai

6. Menampilkan daftar Fitur
Jika pesan mengandung kata "help" didalamnya

Kata penting:
Kuis, Ujian, Tubes, Tucil, Praktikum, task x, hari ini, x hari, x minggu

Kata kunci:
deadline, kapan, dimajukan, diundur, kelar, help