

# MCU-Form

Medical Check Up (MCU) Form system built with **Node.js + Express**.  
Aplikasi ini digunakan untuk membuat, menyimpan, dan mengelola hasil pemeriksaan MCU dalam bentuk PDF, dengan integrasi tanda tangan elektronik dan upload ke server TTE.

---

## ✨ Features
- 📄 Generate medical report PDF dari data pasien
- 🖋️ Integrasi API tanda tangan elektronik (TTE)
- 🔒 Fallback otomatis → jika gagal tanda tangan, tetap generate laporan unsigned
- ☁️ Upload PDF (signed/unsigned) ke server TTE
- 💾 Simpan metadata report & file ke MySQL
- 📑 Dukungan kop surat & format laporan medis
- 🌐 Bisa diakses via jaringan LAN (192.168.x.x)

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js  
- **Database**: MySQL (mysql2)  
- **PDF Generator**: pdfkit, bwip-js (barcode/QR)  
- **File Upload**: Multer, Axios, FormData  

---

## 📂 Database Structure
Tabel utama:
- `medical_reports` → menyimpan data laporan medis
- `report_files` → menyimpan metadata file PDF (id report, path, status signed/unsigned)

---

## 🚀 Getting Started

### 
1. Clone repository
```bash
git clone https://github.com/anntonw/MCU-Form.git
cd MCU-Form
2. Install dependencies
bash
Copy code
npm install
3. Setup environment
Buat file .env:

env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=mcu_db
API_KEY_TTE=your_api_key
4. Run server
bash
Copy code
node server.js
Akses di:
👉 http://localhost:3000
👉 atau LAN: http://127.0.0.1:3000