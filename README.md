# OpenJob RESTful API - Versi 1

<p align="center">
  <img src="./gitignore/ERD-OpenJob-versi-1.png" alt="OpenJob Schema" width="400">
</p>

RESTful API untuk platform internal rekrutmen calon karyawan perusahaan multinasional. Platform ini dibangun menggunakan **Node.js**, **Express.js**, dan **PostgreSQL** sebagai media penyimpanan data dengan teknik migrasi skema database yang dikelola oleh **node-pg-migrate**.

---

## :ledger: Index

- [About](#beginner-about)
- [Usage](#zap-usage)
  - [Installation](#electric_plug-installation)
  - [Commands](#package-commands)
- [Development](#wrench-development)
  - [Pre-Requisites](#notebook-pre-requisites)
  - [Development Environment](#nut_and_bolt-development-environment)
  - [File Structure](#file_folder-file-structure)
- [Community](#cherry_blossom-community)
  - [Contribution](#fire-contribution)
  - [Branches](#cactus-branches)
- [Resources](#page_facing_up-resources)
- [Gallery](#camera-gallery)
- [Credit/Acknowledgment](#star2-creditacknowledgment)
- [License](#lock-license)

---

## :beginner: About

**OpenJob RESTful API** dirancang sebagai sistem backend yang kuat dan aman untuk menangani data lamaran kerja, profil kandidat, profil perusahaan, daftar lowongan, bookmark, dan manajemen dokumen pelamar.

### Fitur Utama:
- **Autentikasi & Otorisasi**: Implementasi Access Token (JWT dengan durasi 3 jam) dan Refresh Token Rotation untuk keamanan maksimal.
- **Validasi Data**: Menggunakan middleware `Joi` untuk memvalidasi seluruh input payload.
- **Pencarian Lowongan Tingkat Lanjut (Advanced Search)**: Pencarian job berdasarkan judul (`?title`) dan nama perusahaan (`?company-name`) secara case-insensitive.
- **Sistem Upload Dokumen**: Upload berkas lamaran/CV dalam format PDF/Gambar dengan pembatasan ukuran dan pembersihan otomatis file fisik saat metadata dokumen dihapus.
- **Manajemen Hubungan PostgreSQL**: Skema database yang normal dengan relasi antar tabel (One-to-Many / Many-to-Many).

---

## :zap: Usage

### :electric_plug: Installation

1. Clone repositori ke mesin lokal Anda:
   ```bash
   git clone https://github.com/bajiff/openjob-api-v1.git
   cd openjob-api-v1
   ```

2. Instal seluruh dependensi proyek:
   ```bash
   npm install
   ```

3. Salin berkas konfigurasi `.env` dan sesuaikan dengan kredensial PostgreSQL lokal Anda:
   ```bash
   cp .example.env .env
   ```

4. Konfigurasi berkas `.env`:
   ```env
   # Server
   HOST=localhost
   PORT=3000

   # Database
   PGUSER=baji
   PGPASSWORD=baji12!@
   PGDATABASE=openjob_db
   PGHOST=localhost
   PGPORT=5432

   # JWT Keys
   ACCESS_TOKEN_KEY=rahasia_access_token_super_kuat_3_jam
   REFRESH_TOKEN_KEY=rahasia_refresh_token_super_kuat_selamanya
   ```

5. Jalankan migrasi database PostgreSQL:
   ```bash
   npm run migrate:up
   ```

6. Jalankan server lokal:
   ```bash
   npm run start:dev
   ```

---

### :package: Commands

Berikut adalah perintah npm yang tersedia dalam proyek ini:

| Perintah | Deskripsi |
| --- | --- |
| `npm start` | Menjalankan server dalam mode produksi. |
| `npm run start:dev` | Menjalankan server dalam mode pengembangan menggunakan `nodemon`. |
| `npm run migrate:create <name>` | Membuat berkas migrasi database baru. |
| `npm run migrate:up` | Menjalankan migrasi database ke atas. |
| `npm run migrate:down` | Membatalkan migrasi database ke bawah. |

---

## :wrench: Development

### :notebook: Pre-Requisites

Sebelum memulai kontribusi pengembangan, pastikan perangkat Anda telah terinstal tools berikut:
- **Node.js** (Versi LTS terbaru v22 disarankan)
- **PostgreSQL** (Versi 15 atau lebih baru)
- **Postman** (Untuk import koleksi uji mandiri)

---

### :nut_and_bolt: Development Environment

1. Pastikan PostgreSQL server lokal Anda aktif.
2. Buat database baru bernama `openjob_db` (atau sesuai konfigurasi di `.env` Anda).
3. Import berkas pengujian Postman Collection: `OpenJob RESTful API Test V1 Collection` & `Environment` untuk memverifikasi fungsionalitas endpoint Anda.

---

### :file_folder: File Structure

```
openjob-api-v1/
├── gitignore/
│   ├── Catatan-dari-Reviewer-v1.txt
│   ├── ERD-OpenJob-versi-1.png
│   ├── Instructions-Belajar-Fundamental-Back-End-dengan-JavaScript.txt
│   ├── Project-Plan.md
│   └── progress.txt
├── migrations/
│   └── 1776174356303_create-table-users.js
│   └── ... (berkas migrasi lainnya)
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── AuthController.js
│   │   ├── UserController.js
│   │   ├── CompanyController.js
│   │   ├── CategoryController.js
│   │   ├── JobController.js
│   │   ├── ApplicationController.js
│   │   ├── BookmarkController.js
│   │   ├── DocumentController.js
│   │   └── ProfileController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── upload.js
│   │   └── validations.js
│   ├── models/
│   │   ├── Auth.js
│   │   ├── User.js
│   │   ├── Company.js
│   │   ├── Category.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   ├── Bookmark.js
│   │   └── Document.js
│   ├── routes/
│   │   ├── index.js
│   │   └── ... (berkas routing masing-masing resource)
│   ├── utils/
│   │   ├── generateId.js
│   │   └── response.js
│   ├── validators/
│   │   └── ... (skema validasi Joi)
│   ├── app.js
│   └── server.js
├── uploads/
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## :cherry_blossom: Community

### :fire: Contribution

Kontribusi Anda sangat dihargai. Jika Anda menemukan bug atau ingin menambahkan fitur baru:
1. **Laporkan Bug** melalui sistem issue di repositori proyek.
2. **Kirim Feature Request** jika ingin mengusulkan ide fungsionalitas baru.
3. **Kirim Pull Request** untuk perbaikan bug langsung atau penambahan fitur.

---

### :cactus: Branches

Alur branch dalam repositori pengembangan proyek ini dibagi menjadi:
1. **`dev`** sebagai branch pengembangan utama yang menampung seluruh perbaikan berkas dan fitur baru.
2. **`main`** sebagai branch produksi utama yang stabil untuk pengiriman rilis/submission final.

*Semua branch fitur baru harus dibuat dengan format penamaan `feat-NAMA-FITUR` sebelum digabungkan kembali ke branch `dev`.*

---

## :page_facing_up: Resources
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Joi Validation Reference](https://joi.dev/)
- [node-pg-migrate Documentation](https://salsita.github.io/node-pg-migrate/)

---

## :camera: Gallery

Tangkapan layar Diagram ERD Skema Database OpenJob:
![Diagram ERD OpenJob](./gitignore/ERD-OpenJob-versi-1.png)

---

## :star2: Credit/Acknowledgment
- Dikembangkan oleh **Bagus Aji Fernando (Baji)** sebagai syarat pemenuhan kelas Backend Fundamental JavaScript.
- Terima kasih untuk tim Reviewer atas koreksi dan masukannya pada pengembangan rilis ini.

---

## :lock: License
Proyek ini dilisensikan di bawah **ISC License** - lihat berkas `package.json` untuk detailnya.
