const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const crypto = require("crypto");
const FormData = require("form-data");

const app = express();

// parser untuk x-www-form-urlencoded (tetap perlu untuk non-file forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// koneksi mysql
const db = mysql.createPool({
    host: "localhost",
    user: "root",    // sesuaikan
    password: "",    // sesuaikan
    database: "mcu_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Optional: cek koneksi pertama
db.getConnection((err, conn) => {
    if (err) {
        console.error("❌ MySQL connection failed:", err.message);
        process.exit(1);
    }
    console.log("✅ MySQL pool connected...");
    conn.release();
});


// static frontend & file upload
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/reports", express.static(path.join(__dirname, "reports")));
app.get("/404", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});


// multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, unique + ext);
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
    fileFilter: (req, file, cb) => {
        if (/^image\/(jpeg|png|gif|webp)$/.test(file.mimetype)) cb(null, true);
        else cb(new Error("Only image files (jpg/png/gif/webp) are allowed"));
    }
});

const toBool = v => (v === "1" || v === "on" || v === true) ? 1 : 0;

// helper konversi checkbox -> 0/1
function toEnumYN(v) {
    if (!v) return "No"; // default
    return String(v).trim().toLowerCase() === "yes" ? "Yes" : "No";
  }

// API untuk ambil daftar dokter (untuk dropdown)
app.get("/api/doctors", (req, res) => {
    db.query("SELECT id, name, idmd5 FROM doctor_tb ORDER BY name", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// handle submit form (dengan upload foto)
app.post("/submit", upload.single("photo"), (req, res) => {
    const b = req.body;

    const data = {
        // Identitas
        medical_record_no: b.medical_record_no || null,
        name: b.name || null,
        sex: b.sex || null,
        birth_date: b.birth_date || null,
        nationality: b.nationality || null,
        address: b.address || null,
        company: b.company || null,
        photo_path: req.file ? `/uploads/${req.file.filename}` : null,

        // Medical History
        diphteria: toEnumYN(b.diphteria),
        sinusitis: toEnumYN(b.sinusitis),
        bronchitis_chronic: toEnumYN(b.bronchitis_chronic),
        pulmonary_tbc: toEnumYN(b.pulmonary_tbc),
        asthma: toEnumYN(b.asthma),
        covid: toEnumYN(b.covid),
        kidney_disease: toEnumYN(b.kidney_disease),
        epilepsy: toEnumYN(b.epilepsy),
        hypertension: toEnumYN(b.hypertension),
        vericose_vein: toEnumYN(b.vericose_vein),
        rheumatoid_arthritis: toEnumYN(b.rheumatoid_arthritis),
        thyroid: toEnumYN(b.thyroid),
        stroke: toEnumYN(b.stroke),
        polio: toEnumYN(b.polio),
        meningitis: toEnumYN(b.meningitis),
        hepatitis: toEnumYN(b.hepatitis),
        tumor: toEnumYN(b.tumor),
        other_history: b.other_history || null,

        // Medical Examination
        height: b.height ? parseInt(b.height) : null,
        weight: b.weight ? parseInt(b.weight) : null,
        blood_pressure: b.blood_pressure || null,
        pulse: b.pulse || null,
        eyes_right: b.eyes_right || null,
        eyes_left: b.eyes_left || null,
        color_vision: b.color_vision || null,
        color_blindness: b.color_blindness || null,
        hemoglobin: b.hemoglobin || null, // gunakan 'hemoglobin' jika sudah rename kolom
        sgot: b.sgot || null,
        sgpt: b.sgpt || null,
        chest_xray: b.chest_xray || null,
        head_neck: b.head_neck || null,
        hearing_right: b.hearing_right || null,
        hearing_left: b.hearing_left || null,
        abdomen_hernia: toBool(b.abdomen_hernia),
        abdomen_tumor: toBool(b.abdomen_tumor),

        // Immunoserology
        hbsag: b.hbsag || null,
        vdrl: b.vdrl || null,
        tpha: b.tpha || null,
        hiv: b.hiv || null,

        // Skin & Nail
        skin_disease: toBool(b.skin_disease),
        nail: toBool(b.nail),

        // Urinalysis
        urinalysis_protein: toBool(b.urinalysis_protein),
        urinalysis_bilirubin: toBool(b.urinalysis_bilirubin),
        urinalysis_glucose: toBool(b.urinalysis_glucose),
        urinalysis_other: b.urinalysis_other || null,

        // Internal
        internal_heart: toBool(b.internal_heart),
        internal_lung: toBool(b.internal_lung),
        internal_liver: toBool(b.internal_liver),
        internal_spleen: toBool(b.internal_spleen),
        internal_kidney: toBool(b.internal_kidney),
        internal_thyroid: toBool(b.internal_thyroid),
        conclusion: b.conclusion || null,
        doctor_id: b.doctor_id ? parseInt(b.doctor_id) : null
    };

    const sql = "INSERT INTO medical_reports SET ?";
    db.query(sql, data, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("❌ Error saving report: " + err.message);
        }

        // 🔹 Ambil nama dokter berdasarkan doctor_id
        const axios = require("axios");

        db.query("SELECT name, pat FROM doctor_tb WHERE id = ?", [data.doctor_id], (err2, rows) => {
            if (err2) {
                console.error(err2);
                return res.status(500).send("❌ Error fetching doctor data: " + err2.message);
            }

            data.doctor_name = rows.length > 0 ? rows[0].name : "________________";
            const doctorPat = rows.length > 0 ? rows[0].pat : null;

            if (!doctorPat) {
                return res.status(400).send("❌ Doctor PAT not found.");
            }

            const reportId = result.insertId; // ID dari DB
            const baseName = reportId.toString(); // nama awal file, misalnya "123"

            
            const qrText = `Medical Check Up a.n ${data.name}`;

            // Generate PDF dulu
            const generateMedicalReport = require("./generateReport");
            const reportsDir = path.join(__dirname, "reports");
            if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

            const filePath = path.join(reportsDir, `report_${result.insertId}.pdf`);
            const statusFile = `Sukses`;

            generateMedicalReport({ ...data, qrText }, filePath, async () => {
                try {
                    
            
                    // 4️⃣ Generate nama file unik
                    // Nama file yang dikirim ke server (biarkan server yang rename pakai md5)
                    const fileName = baseName + ".pdf";
            
                    // 5️⃣ Upload ke server TTE
                    try {
                        
            
                        // 6️⃣ Simpan ke tabel report_files
                        const sqlFile ="INSERT INTO report_files (report_id, file_path, status) VALUES (?, ?, ?)";
                            db.query(sqlFile, [reportId, filePath, statusFile], (err2) => {
                                if (err2) {
                                    console.error("❌ Error insert report_files:", err2);
                                    return res.status(500).send("❌ Gagal simpan file report");
                                }
                                res.send(
                                    `✅ Report tersimpan, file ${filePath}, status=${statusFile}`
                                );
                            });
            
                    } catch (uploadErr) {
                        console.error("❌ Upload failed:", uploadErr.message);
                        res.status(500).send("❌ Upload failed: " + uploadErr.message);
                    }
            
                } catch (err) {
                    console.error("❌ Unexpected error:", err);
                    res.status(500).send("❌ Unexpected error: " + err.message);
                }
            });
        });
    });
});
// GET data medical_report
app.get('/api/medical_reports', (req, res) => {
    db.query(
        "SELECT mr.id, mr.medical_record_no, mr.name, mr.sex, DATE(mr.birth_date) AS birth_dates, mr.company, d.name AS doctor_name FROM medical_reports mr LEFT JOIN doctor_tb d ON mr.doctor_id = d.id WHERE DATE(mr.created_at) = CURDATE() ORDER BY mr.id DESC;",
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

// DELETE medical report
app.delete("/api/medical_reports/:id", (req, res) => {
    const id = req.params.id;

    // Hapus data dari DB
    db.query("DELETE FROM medical_reports WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("❌ Error deleting report:", err.message);
            return res.status(500).json({ error: "Gagal menghapus data" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Data tidak ditemukan" });
        }

        // Hapus juga file PDF kalau ada
        const filePath = path.join(__dirname, "reports", `report_${id}.pdf`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({ success: true, message: "✅ Data berhasil dihapus" });
    });
});

// error handler agar tidak crash saat upload salah tipe file
app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).send(err.message || "Bad Request");
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://127.0.0.1:3000");
  });
