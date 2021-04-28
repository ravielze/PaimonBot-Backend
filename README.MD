# Paimon Bot

# General Info

Paimon bot adalah chatbot yang menggunakan string matching dengan algoritma KMP dan Regex untuk mengingatkan dan menyimpan tanggal-tanggal penting pada tugas dan deadline anda.

# Technologies

-   Node.JS - Version 14.0+
-   PostgreSQL & Node-Postgres
-   Docker
-   NPM

# Setup & Installation

## Docker

1. Download image dengan cara `docker pull docker.pkg.github.com/ravielze/paimonbot-backend/paimon-bot:latest`
2. Setup environment variable
3. Jalankan image tersebut

## Local

1. Setup environment variable dengan cara mengcopy file `.env.example` menjadi `.env`
2. Samakan dengan data login database dengan database postgres local
3. Jangan lupa `npm install`
4. Jalankan dengan `node app.js`
5. Untuk melihat tampilan, jalankan frontend, repository dapat dilihat pada [Tautan Berikut](https://github.com/jasonstanleyyoman/Paimonbot-FE)

## Deployed

1. Buka Link `https://paimonbot.vercel.app/`

# Fitur:

1. Menambah Task
   Bot akan mendeteksi pesan yang memiliki:

-   Kata penting tipe deadline (Kuis, Ujian, Tubes, Tucil, Praktikum)
-   Kode mata kuliah (2 huruf diikuti 4 bilangan)
-   Note (String diantara kode matkul dan deadline)
-   Tanggal deadline (format xx-xx-xxxx)
    Dengan urutan demikian, kemudian menambahkan task tersebut

2. Mendaftarkan Task dalam durasi waktu
   Bot akan mendeteksi pesan yang memiliki:

-   Kata kunci "deadline"
-   Tanggal mulai (jika tidak diberikan dianggap sekarang) dan akhir, atau
-   Kata penting tipe deadline
-   Kata keterangan waktu "hari ini", "x hari", atau "x minggu", dengan x sebuah bilangan
    Tidak harus dengan urutan demikian,
    kemudian mengembalikan semua task dalam jangka waktu tersebut

3. Menampilkan deadline dari beberapa task tertentu
   Bot akan mendeteksi pesan yang memiliki:

-   Kata kunci "kapan"
-   Filter tipe mata kuliah (jika tidak diberikan dianggap Tucil dan Tubes)
-   Kode mata kuliah (2 huruf diikuti 4 bilangan)
    Tidak harus dengan urutan demikian,
    kemudian mengembalikan daftar deadline task sesuai spesifikasi yang diberikan

4. Memperbarui deadline dari suatu Task
   Bot akan mendeteksi pesan yang memiliki:

-   Kata kunci "dimajukan" atau "diundur"
-   Kata penting "task x", dengan x sebuah bilangan
-   Tanggal baru (format xx-xx-xxxx)
    Tidak harus dengan urutan demikian,
    kemudian memperbarui deadline task x dengan tanggal baru

5. Mencatat suatu Task selesai
   Bot akan mendeteksi pesan yang memiliki:

-   Kata kunci "kelar"
-   Kata penting "task x", dengan x sebuah bilangan
    Tidak harus dengan urutan demikian,
    kemudian memperbarui status task x sebagai selesai

6. Menampilkan daftar Fitur
   Jika pesan mengandung kata "help" didalamnya

Kata penting:
Kuis, Ujian, Tubes, Tucil, Praktikum

Kata kunci:
deadline, kapan, dimajukan, diundur, kelar, help, sejauh ini, hari ini, minggu ini, x hari, x minggu, task x
