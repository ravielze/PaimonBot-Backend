# Paimon Bot

# Table of contents

-   [General info](#general-info)
-   [Screenshots](#screenshots)
-   [Technologies](#technologies)
-   [Setup & Installation](#setup--installation)
-   [Features](#features)
-   [Status](#status)
-   [Contact](#contact)

# General Info

Paimon bot adalah chatbot yang menggunakan string matching dengan algoritma KMP dan Regex untuk mengingatkan dan menyimpan tanggal-tanggal penting pada tugas dan deadline anda.

# Technologies

-   Node.JS - Version 14.0+
-   PostgreSQL & Node-Postgres
-   Docker
-   NPM
-   Socket IO
-   React
-   Tailwind CSS

# Setup & Installation

## Backend

Dapat dilakukan salah satu dari 3 cara berikut.

### 1. Docker

1. Download image dengan cara `docker pull docker.pkg.github.com/ravielze/paimonbot-backend/paimon-bot:latest`
2. Setup environment variable
3. Jalankan image tersebut

### 2. Tanpa Docker dan Local

1. Clone repository Backend

```sh
git clone https://github.com/ravielze/PaimonBot-Backend.git paimon-bot
cd paimon-bot
```

2. Setup environment variable dengan cara mengcopy file `.env.example` menjadi `.env`
3. Samakan dengan data login database dengan database postgres local
4. Jangan lupa `npm install`
5. Jalankan dengan `node app.js`
6. Untuk melihat tampilan, jalankan frontend, repository dapat dilihat pada [Tautan Berikut](https://github.com/jasonstanleyyoman/Paimonbot-FE) dan untuk bantuan instalasi bisa dilihat pada poin [frontend](#frontend).

### 3. Deployed

1. Buka Link `https://paimonbot.vercel.app/`

## Frontend

1. Clone repository Frontend

```sh
git clone https://github.com/jasonstanleyyoman/Paimonbot-FE.git paimon-bot
cd paimon-bot
```

Untuk menjalankan secara lokal :

```sh
npm start
```

Untuk melakukan build production :

```sh
npm build
```

Untuk menjalankannya, Anda perlu backend dari project ini. Untuk instalasi backend, silahkan ikuti tautan berikut [backend](https://github.com/ravielze/PaimonBot-Backend), Selain itu, perlu juga untuk membuat sebuah file .env untuk konfigurasi.

```sh
touch .env
```

Setelah itu copy semua yang ada di `.env.example` ke file `.env` yang baru. Ubah `REACT_APP_SOCKET_URL` ke url backend yang telah diinstal. Anda juga dapat mengubah nama bot dengan mengubah variabel `REACT_APP_BOT_NAME`.

# Features

## ChatBot Functionality

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

## General Functionality

Fitur secara umum

-   Login
-   Register
-   Penambahan Task Baru
-   Melihat Daftar Task
-   Menampilkan Deadline
-   Memperbaharui Task Tertentu
-   Menandakan Task Sudah Dikerjakan
-   Menampilkan Opsi Help
-   Analisa Typo dan Rekomendasi Kata
-   Menampilkan Pesan Error

## Status

Project sudah selesai.

## Author

1. [Steven Nataniel](https://github.com/ravielze) 13519002
1. [Jason Stanley Yoman](https://github.com/jasonstanleyyoman) 13519019
1. [Kinantan Arya Bagaspati](https://github.com/kinantanbagaspati) 13519044
