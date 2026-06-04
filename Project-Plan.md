# Project Plan: OpenJob RESTful API Versi 1

Project plan ini disusun untuk menyelesaikan perbaikan submission OpenJob RESTful API Versi 1 sesuai dengan catatan reviewer dan instruksi kelas.

## 📋 Catatan Masalah Utama dari Reviewer
1. **Endpoint yang Belum Lengkap**: Endpoint untuk `companies`, `categories`, `jobs`, `applications`, `bookmarks`, dan `documents` belum diimplementasikan atau belum didaftarkan di router utama (`src/routes/index.js`), sehingga menghasilkan error `404 Not Found`.
2. **Kerapian Codebase**: Berkas-berkas `.txt` yang merupakan salinan dari kode harus dihapus agar codebase bersih dan rapi.
3. **Database & Migrations**: Memastikan migrasi berjalan sukses dan semua data disimpan di PostgreSQL menggunakan `node-pg-migrate`.
4. **ESLint**: Menambahkan ESLint untuk membantu menjaga kualitas kode.
5. **Project Structure**: Memastikan project structure sesuai dengan best practice.
6. **Documentation**: Menambahkan dokumentasi API sesuai dengan best practice menggunakan struktur swagger api.
7. **Testing**: Memastikan semua test case mendapatkan status **PASSED**.
8. **Security**: Memastikan API aman dari serangan seperti SQL Injection, XSS, CSRF, dll.
9. **Error Handling**: Memastikan error handling sesuai dengan standard response API.
10. **Performance**: Memastikan API berjalan dengan baik dan responsif.
11. **Code Duplication**: Menghindari duplikasi kode (DRY - Don't Repeat Yourself).
12. **Database Design**: Memastikan database design sesuai dengan best practice.
13. **Code Style**: Memastikan code style sesuai dengan best practice.
14. **Environment Variables**: Memastikan environment variables sesuai dengan best practice.
15. **Logging**: Memastikan logging sesuai dengan best practice.

---

## 🛠️ Rencana Langkah Kerja (Step-by-Step)

### FASE 1: Inisialisasi & Verifikasi Database
- [ ] Konfigurasi file `.env` lokal untuk koneksi PostgreSQL.
- [ ] Menjalankan migrasi menggunakan perintah `npm run migrate:up` untuk membuat semua tabel.
- [ ] Memastikan database terhubung dengan baik melalui `src/config/database.js`.

### FASE 2: Implementasi Fitur Per Resource

#### 1. Perusahaan (Companies)
- [ ] Implementasi Model: `src/models/Company.js` (Create, FindAll, FindById, Update, Delete).
- [ ] Joi Validation: `src/validators/companyValidator.js`.
- [ ] Controller: `src/controllers/CompanyController.js`.
- [ ] Router: `src/routes/companyRoutes.js` (GET public, POST/PUT/DELETE protected).

#### 2. Kategori (Categories)
- [ ] Implementasi Model: `src/models/Category.js`.
- [ ] Joi Validation: `src/validators/categoryValidator.js`.
- [ ] Controller: `src/controllers/CategoryController.js`.
- [ ] Router: `src/routes/categoryRoutes.js` (GET public, POST/PUT/DELETE protected).

#### 3. Lowongan Pekerjaan (Jobs)
- [ ] Implementasi Model: `src/models/Job.js`.
- [ ] Dukungan Query Parameter (Advanced): `?title` (pencarian berdasarkan judul lowongan) & `?company-name` (pencarian berdasarkan nama perusahaan).
- [ ] Joi Validation: `src/validators/jobValidator.js`.
- [ ] Controller: `src/controllers/JobController.js`.
- [ ] Router: `src/routes/jobRoutes.js`.
  - Endpoint GET public: `/jobs`, `/jobs/:id`, `/jobs/company/:companyId`, `/jobs/category/:categoryId`.
  - Endpoint POST/PUT/DELETE protected.

#### 4. Lamaran Pekerjaan (Applications)
- [ ] Implementasi Model: `src/models/Application.js`.
- [ ] Joi Validation: `src/validators/applicationValidator.js`.
- [ ] Controller: `src/controllers/ApplicationController.js`.
- [ ] Router: `src/routes/applicationRoutes.js` (Semua endpoint protected: POST apply, GET list, GET detail, PUT status, DELETE).

#### 5. Bookmark (Bookmarks)
- [ ] Implementasi Model: `src/models/Bookmark.js`.
- [ ] Controller: `src/controllers/BookmarkController.js`.
- [ ] Router: `src/routes/bookmarkRoutes.js`.
  - `POST /jobs/:jobId/bookmark` (Protected)
  - `GET /jobs/:jobId/bookmark/:id` (Protected)
  - `DELETE /jobs/:jobId/bookmark` (Protected)
  - `GET /bookmarks` (Protected)

#### 6. Dokumen (Documents)
- [ ] Implementasi Model: `src/models/Document.js`.
- [ ] Integrasi Multer: Konfigurasi upload file multipart/form-data (maksimal 2MB, hanya menerima PDF/Image, disimpan ke folder `uploads/`).
- [ ] Controller: `src/controllers/DocumentController.js` (Upload document, Get all, Get by ID, Delete document & file di disk).
- [ ] Router: `src/routes/documentRoutes.js`.
  - `GET /documents` & `GET /documents/:id` (Public)
  - `POST /documents` & `DELETE /documents/:id` (Protected)

#### 7. Profile
- [ ] Controller: `src/controllers/ProfileController.js`.
- [ ] Router: `src/routes/profileRoutes.js` (Protected).
  - `GET /profile` -> Profil user yang login.
  - `GET /profile/applications` -> Daftar lamaran user yang login.
  - `GET /profile/bookmarks` -> Daftar bookmark user yang login.

---

### FASE 3: Integrasi & Pembersihan Codebase
- [ ] Mendaftarkan semua router baru ke dalam router utama `src/routes/index.js`.
- [ ] Merancang dan membuat ERD dengan nama berkas `ERD-OpenJob-versi-1.png` sesuai dengan struktur tabel migrasi.
- [ ] Menghapus semua file `.txt` cadangan di seluruh folder (seperti `UserController.txt`, `AuthService.txt`, dll) agar kode bersih.

---

### FASE 4: Pengujian & Validasi Akhir
- [ ] Menjalankan server lokal dengan `npm run start:dev`.
- [ ] Melakukan pengujian mandiri menggunakan Postman Collection yang sudah diunduh untuk memastikan seluruh test case (baik Mandatory maupun Opsional) mendapatkan status **PASSED**.
- [ ] Memeriksa penanganan error (seperti token expired, validasi Joi, unique constraints, dll) agar sesuai format standard response API.
