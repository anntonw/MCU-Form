// file: generateReport.js
const PDFDocument = require("pdfkit");
const fs = require("fs");
const bwipjs = require("bwip-js");

function generateMedicalReport(data, outputPath, callback) {
    const doc = new PDFDocument({
        size: [595.28, 935.43], // F4 (210mm x 330mm)
        margin: 40
    });
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // ============ HEADER DENGAN KOP ============ 
    const kopPath = "./assets/kop.png"; 
    if (fs.existsSync(kopPath)) {
        // gambar kop full width
        doc.image(kopPath, 40, 20, {
            width: pageWidth,
            align: "center"
        });
    } else {
        // fallback jika kop.png tidak ditemukan
        doc.font("Times-Bold").fontSize(16).text("MEDICAL REPORT", 40, 40, {
            align: "center",
            width: pageWidth,
        });
    }

    

    // ============ HEADER ============
    const headerY = 100;        // geser ke bawah biar tidak nabrak kop
    const headerHeight = 30;

    doc.rect(40, headerY, pageWidth, headerHeight).stroke();
    doc.font("Times-Bold").fontSize(14);

    const textY = headerY + (headerHeight - doc.currentLineHeight()) / 2;
    doc.text("MEDICAL REPORT", 40, textY, {
        align: "center",
        width: pageWidth,
    });

    // ============ IDENTITAS + FOTO ============
    const yStart = headerY + headerHeight; // kasih jarak 20px setelah header
    const col1Width = pageWidth * 0.65;
    const col2Width = pageWidth * 0.35;

    // Kotak identitas
    doc.rect(40, yStart, col1Width, 120).stroke();
    doc.fontSize(11).font("Times-Roman");

    let y = yStart + 10; // kasih padding atas
    const x = 45;
    const labelWidth = 120; // lebar kolom label
    const valueStartX = x + labelWidth + 5; // posisi mulai value

    // Format tanggal lahir
    let birthDateFormatted = "-";
    if (data.birth_date) {
    const birthDate = new Date(data.birth_date);
    birthDateFormatted = birthDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",   // September
        day: "numeric",  // 12
    });
    }

    const identitas = [
        ["Medical Record Number", data.medical_record_no],
        ["Name", data.name],
        ["Sex", data.sex],
        ["Birth Date", birthDateFormatted],
        ["Nationality", data.nationality],
        ["Address", data.address],
        ["Company", data.company],
    ];

    const labelX = x;              // posisi awal label
    const colonX = x + 120;        // posisi tetap untuk titik dua
    const valueX = x + 130;        // posisi tetap untuk value

    identitas.forEach(([label, value]) => {
        // label
        doc.text(label, labelX, y, { width: 120 });
        // titik dua
        doc.text(":", colonX, y, { width: 10 });
        // value
        doc.text(value || "-", valueX, y, { width: col1Width - 140 });
        y += 16;
    });

    // Kotak foto
    // Kotak utama identitas + foto
    doc.rect(40, yStart, pageWidth, 120).stroke();

    // Kotak identitas (kiri)
    doc.rect(40, yStart, col1Width, 120).stroke();

    // Kotak foto (kanan)
    const photoX = 40 + col1Width;
    doc.rect(photoX, yStart, col2Width, 120).stroke();

    // Isi foto
    if (data.photo_path && fs.existsSync("." + data.photo_path)) {
        doc.image("." + data.photo_path, photoX + 10, yStart + 10, {
            fit: [col2Width - 20, 100], // fit agar proporsional
            align: "center",
            valign: "center",
        });
    } else {
        doc.fontSize(10).text("Photo 4x6", photoX, yStart + 50, {
            width: col2Width,
            align: "center",
        });
    }

   // ============ MEDICAL HISTORY ============
   let rowY = yStart + 120; // posisi bawah kotak identitas & foto
    const historyHeight = 25; // tinggi kotak untuk judul "Medical History"

    doc.rect(40, rowY, pageWidth, historyHeight).stroke();

    doc.font("Times-Bold").fontSize(12).text("MEDICAL HISTORY", 40, rowY + (historyHeight - 12) / 2, {
    width: pageWidth,
    align: "center",
    });

    rowY += 25;

    const mhItems = [
      { label: "Diphteria", field: "diphteria" },
      { label: "Sinusitis", field: "sinusitis" },
      { label: "Bronchitis Chronic", field: "bronchitis_chronic" },
      { label: "Pulmonary TBC", field: "pulmonary_tbc" },
      { label: "Asthma", field: "asthma" },
      { label: "Covid", field: "covid" },
      { label: "Kidney Disease", field: "kidney_disease" },
      { label: "Epilepsy", field: "epilepsy" },
      { label: "Hypertension", field: "hypertension" },
      { label: "Vericose Vein", field: "vericose_vein" },
      { label: "Rheumatoid Arthritis", field: "rheumatoid_arthritis" },
      { label: "Thyroid", field: "thyroid" },
      { label: "Stroke", field: "stroke" },
      { label: "Polio", field: "polio" },
      { label: "Meningitis", field: "meningitis" },
      { label: "Hepatitis", field: "hepatitis" },
      { label: "Tumor", field: "tumor" },
      { label: "Other History", field: "other_history" },
    ];

    const colWidth = pageWidth / 3;
    const itemsPerCol = Math.ceil(mhItems.length / 3);
    const boxHeight = 20;

    let maxY = rowY;

    for (let col = 0; col < 3; col++) {
      const x = 40 + col * colWidth;
      let y = rowY;
    
      for (let j = 0; j < itemsPerCol; j++) {
        const idx = col * itemsPerCol + j;
        if (idx >= mhItems.length) break;
    
        const item = mhItems[idx];
        const label = item.label;
        const field = item.field;
    
        const answer = formatAnswer(field, data[field]);
    
        const leftText = `${idx + 1}.  ${label}`;
    
        // kotak rapat
        doc.rect(x, y, colWidth, boxHeight).stroke();
    
        // kiri (nomor + item)
        doc.font("Times-Roman").fontSize(10).text(leftText, x + 5, y + 5, {
          width: colWidth - 50,
          align: "left"
        });
    
        // kanan (Yes/No atau Yes: teks)
        doc.font("Times-Roman").fontSize(10).text(`(${answer})`, x, y + 5, {
          width: colWidth - 10,
          align: "right"
        });
    
        y += boxHeight;
        if (y > maxY) maxY = y;
      }
    }

    function formatAnswer(field, value) {
      if (!value) return "No"; // default kalau kosong/null
    
      const val = value.toString().trim();
    
      if (field === "other_history") {
        // kalau other_history
        if (val.toLowerCase() === "no") {
          return "No";
        } else if (val.toLowerCase() === "yes") {
          return "Yes";
        } else {
          // misalnya: "Yes, pernah operasi"
          return "Yes: " + val;
        }
      } else {
        // field biasa (ENUM Yes/No)
        return val.toLowerCase() === "yes" ? "Yes" : "No";
      }
    }
  

    // ============ MEDICAL EXAMINATION ============
    const examBoxHeight = 25;
    let examY = maxY; // langsung nempel, tanpa spasi

    // kotak header
    doc.rect(40, examY, pageWidth, examBoxHeight).stroke();

    // teks rata tengah pakai Times
    const examFontSize = 12;
    doc.font("Times-Bold").fontSize(examFontSize).text("MEDICAL EXAMINATION", 40, examY + (examBoxHeight / 2) - (examFontSize / 2), {
    width: pageWidth,
    align: "center",
    });

    examY += 25; // posisi konten setelah judul
    const exColWidth = pageWidth / 3;

    // Kolom 1
    const col1X = 40;
    let colY = examY;
    const col1Height = 100;

    doc.rect(col1X, colY, exColWidth, col1Height).stroke();

    const col1Items = [
    ["Height", data.height ? `${data.height} cm` : "-"],
    ["Weight", data.weight ? `${data.weight} kg` : "-"],
    ["Blood Pressure", data.blood_pressure ? `${data.blood_pressure} mmHg` : "-"],
    ["Pulse", data.pulse ? `${data.pulse} /mnt` : "-"],
    ];

    col1Items.forEach((it, idx) => {
    doc.font("Times-Roman").fontSize(10).text(
        `${idx + 1}.  ${it[0]}`,
        col1X + 5,
        colY + 5 + idx * 20,
        { width: exColWidth - 50, align: "left" }
    );

    doc.font("Times-Roman").fontSize(10).text(
        it[1],
        col1X,
        colY + 5 + idx * 20,
        { width: exColWidth - 10, align: "right" }
    );
    });

    // Kolom 2
    const col2X = col1X + exColWidth;
    doc.rect(col2X, colY, exColWidth, 100).stroke();

    let lineY = colY + 5;

    // Eyes label
    doc.font("Times-Roman").fontSize(10).text("Eyes :", col2X + 5, lineY, {
    width: exColWidth - 10,
    align: "left",
    });
    lineY += 20;

    // Eyes Right
    doc.font("Times-Roman").fontSize(10).text("Right", col2X + 20, lineY, {
    width: exColWidth - 60,
    align: "left",
    });
    doc.font("Times-Roman").fontSize(10).text(
    `( ${data.eyes_right || "-"} )`,
    col2X,
    lineY,
    { width: exColWidth - 10, align: "right" }
    );
    lineY += 20;

    // Eyes Left
    doc.font("Times-Roman").fontSize(10).text("Left", col2X + 20, lineY, {
    width: exColWidth - 60,
    align: "left",
    });
    doc.font("Times-Roman").fontSize(10).text(
    `( ${data.eyes_left || "-"} )`,
    col2X,
    lineY,
    { width: exColWidth - 10, align: "right" }
    );
    lineY += 20;

    // Color Vision
    doc.font("Times-Roman").fontSize(10).text("Color Vision", col2X + 5, lineY, {
    width: exColWidth - 50,
    align: "left",
    });
    doc.font("Times-Roman").fontSize(10).text(
    `( ${data.color_vision || "-"} )`,
    col2X,
    lineY,
    { width: exColWidth - 10, align: "right" }
    );
    lineY += 20;

    // Color Blindness
    doc.font("Times-Roman").fontSize(10).text("Color Blindness", col2X + 5, lineY, {
    width: exColWidth - 50,
    align: "left",
    });
    doc.font("Times-Roman").fontSize(10).text(
    `( ${data.color_blindness || "-"} )`,
    col2X,
    lineY,
    { width: exColWidth - 10, align: "right" }
    );

    // Kolom 3 split
    const col3X = col2X + exColWidth;
    let col3Y = colY;

    // Bagian 1: Hemoglobin, SGOT, SGPT
    doc.rect(col3X, col3Y, exColWidth, 50).stroke();
    let lineY3 = col3Y + 5;

    const col3Items1 = [
    ["Hemoglobin", data.hemoglobin],
    ["SGOT", data.sgot],
    ["SGPT", data.sgpt],
    ];

    col3Items1.forEach((it, idx) => {
    // label kiri
    doc.font("Times-Roman").fontSize(10).text(it[0], col3X + 5, lineY3, {
        width: exColWidth - 50,
        align: "left",
    });

    // hasil kanan dalam kurung
    doc.font("Times-Roman").fontSize(10).text(
        `( ${it[1] || "-"} )`,
        col3X,
        lineY3,
        { width: exColWidth - 10, align: "right" }
    );

    lineY3 += 15;
    });

    // Bagian 2: Chest X-Ray

    col3Y += 50; 
    const remainingHeight = 100 - 50; // supaya sama dengan tinggi col2

    doc.rect(col3X, col3Y, exColWidth, remainingHeight).stroke();

    doc.font("Times-Roman").fontSize(10).text("Chest X-Ray", col3X + 5, col3Y + 5, {
    width: exColWidth - 50,
    align: "left",
    });

    doc.font("Times-Roman").fontSize(10).text(
    `( ${data.chest_xray || "-"} )`,
    col3X,
    col3Y + 5,
    { width: exColWidth - 10, align: "right" }
    );

    // ============ ROW 6 ============
    colY += 100;
    const row6Height = 100;

    // Kolom 1: Head, Neck, Hearing
    doc.rect(col1X, colY, exColWidth, row6Height).stroke();

    let lineY6 = colY + 5;

    // Head and Neck
    doc.font("Times-Roman").fontSize(10).text("Head and Neck", col1X + 5, lineY6, {
    width: exColWidth - 50,
    align: "left",
    });
    doc.font("Times-Roman").fontSize(10).text(
    `( ${data.head_neck || "-"} )`,
    col1X,
    lineY6,
    { width: exColWidth - 10, align: "right" }
    );

    lineY6 += 20;

    // Hearing (judul)
    doc.font("Times-Roman").fontSize(10).text("Hearing", col1X + 5, lineY6, {
    width: exColWidth - 10,
    align: "left",
    });
    lineY6 += 15;

    // Hearing Right
    doc.font("Times-Roman").fontSize(10).text("Ears Right", col1X + 15, lineY6, {
    width: exColWidth - 50,
    align: "left",
    });
    doc.font("Times-Roman").fontSize(10).text(
    `( ${data.hearing_right || "-"} )`,
    col1X,
    lineY6,
    { width: exColWidth - 10, align: "right" }
    );

    lineY6 += 15;

    // Hearing Left
    doc.font("Times-Roman").fontSize(10).text("Ears Left", col1X + 15, lineY6, {
    width: exColWidth - 50,
    align: "left",
    });
    doc.font("Times-Roman").fontSize(10).text(
    `( ${data.hearing_left || "-"} )`,
    col1X,
    lineY6,
    { width: exColWidth - 10, align: "right" }
    );

    // kolom 2 abdomen
    doc.rect(col2X, colY, exColWidth, row6Height).stroke();

    let lineY7 = colY + 5;

    // Judul Abdomen
    doc.font("Times-Roman").fontSize(10).text("Abdomen", col2X + 5, lineY7, {
    width: exColWidth - 10,
    align: "left",
    });
    lineY7 += 15;

    // Hernia
    doc.font("Times-Roman").fontSize(10).text("Hernia", col2X + 15, lineY7, {
    width: exColWidth - 50,
    align: "left",
    });
    doc.font("Times-Roman").fontSize(10).text(
    `( ${data.abdomen_hernia ? "Normal" : "Abnormal"} )`,
    col2X,
    lineY7,
    { width: exColWidth - 10, align: "right" }
    );

    lineY7 += 20;

    // Tumor
    doc.font("Times-Roman").fontSize(10).text("Tumor", col2X + 15, lineY7, {
    width: exColWidth - 50,
    align: "left",
    });
    doc.font("Times-Roman").fontSize(10).text(
    `( ${data.abdomen_tumor ? "Normal" : "Abnormal"} )`,
    col2X,
    lineY7,
    { width: exColWidth - 10, align: "right" }
    );

    // kolom 3 immunoserology
    doc.rect(col3X, colY, exColWidth, row6Height).stroke();

    let lineY8 = colY + 5;

    // Judul
    doc.font("Times-Roman").fontSize(10).text("Imunoserologi", col3X + 5, lineY8, {
    width: exColWidth - 10,
    align: "left",
    });
    lineY8 += 15;

    // Daftar item
    const col6Items3 = [
    ["HBsAg", data.hbsag],
    ["VDRL", data.vdrl],
    ["TPHA", data.tpha],
    ["HIV", data.hiv],
    ];

    col6Items3.forEach((it, idx) => {
    doc.font("Times-Roman").fontSize(10).text(it[0], col3X + 15, lineY8 + idx * 20, {
        width: exColWidth - 50,
        align: "left",
    });

    doc.font("Times-Roman").fontSize(10).text(
        `(${it[1] || "-"})`,
        col3X,
        lineY8 + idx * 20,
        { width: exColWidth - 10, align: "right" }
    );
    });

    // ============ ROW 7 ============
    colY += row6Height;
    const row7Height = 100;
    // kolom 1 skin/nail
    doc.rect(col1X, colY, exColWidth, row7Height).stroke();

    let lineY9 = colY + 5;

    // Judul
    doc.font("Times-Roman").fontSize(10).text("Skin & Nail", col1X + 5, lineY9, {
    width: exColWidth - 10,
    align: "left",
    });
    lineY9 += 15;

    // Daftar item
    const col7Items1 = [
    ["Skin Disease", data.skin_disease],
    ["Nail", data.nail],
    ];

    col7Items1.forEach((it, idx) => {
    const checklist = it[1] ? "Normal" : "Abnormal";

    // Label kiri
    doc.font("Times-Roman").fontSize(10).text(it[0], col1X + 15, lineY9 + idx * 20, {
        width: exColWidth - 50,
        align: "left",
    });

    // Hasil kanan (checklist)
    doc.font("Times-Roman").fontSize(10).text(`(${checklist})`, col1X, lineY9 + idx * 20, {
        width: exColWidth - 10,
        align: "right",
    });
    });

    // kolom 2 urinalysis
    doc.rect(col2X, colY, exColWidth, row7Height).stroke();

    let urY = colY + 5;

    // Judul
    doc.font("Times-Roman").fontSize(10).text("Urinalysis", col2X + 5, urY, {
        width: exColWidth - 10,
        align: "left",
      });
      urY += 15;
      
      // Data urinalysis
      const urItems = [
        { label: "Protein", field: "urinalysis_protein" },
        { label: "Bilirubin", field: "urinalysis_bilirubin" },
        { label: "Glucose", field: "urinalysis_glucose" },
        { label: "Other", field: "urinalysis_other" },
      ];
      
      for (let i = 0; i < urItems.length; i++) {
        const { label, field } = urItems[i];
        const rawVal = data[field];
      
        let status = "-";
      
        if (field === "urinalysis_other") {
          if (rawVal && rawVal.trim() !== "") {
            // kalau ada teks tambahan
            status = rawVal;
          } else {
            status = "-";
          }
        } else {
          const val =
            rawVal === true ||
            rawVal === "true" ||
            rawVal === 1 ||
            rawVal === "1";
      
          status =
            rawVal === null || rawVal === undefined || rawVal === ""
              ? "-"
              : val
              ? "Normal"
              : "Abnormal";
        }
      
        // Cetak dalam satu baris: Label (Status)
        doc.font("Times-Roman").fontSize(10).text(label, col2X + 5, urY, {
          width: exColWidth * 0.6, // 60% untuk label
          align: "left",
        });
      
        // Cetak status kanan
        doc.font("Times-Roman").fontSize(10).text(`(${status})`, col2X + 5, urY, {
          width: exColWidth - 10,
          align: "right",
        });
      
        urY += 20;
      }
      
      

    // kolom 3 internal
    doc.rect(col3X, colY, exColWidth, row7Height).stroke();

    let intY = colY + 5;

    // Judul
    doc.font("Times-Roman").fontSize(10).text("Internal Disease", col3X + 5, intY, {
    width: exColWidth - 10,
    align: "left",
    });
    intY += 15;

    // Data Internal Disease
    const col7Items3 = [
    ["Heart", data.internal_heart],
    ["Lung", data.internal_lung],
    ["Thyroid", data.internal_thyroid],
    ["Liver", data.internal_liver],
    ["Spleen", data.internal_spleen],
    ["Kidney", data.internal_kidney],
    ];

    // Bagi jadi 2 kolom
    const itemsPerSubCol = Math.ceil(col7Items3.length / 2);
    const intColWidth = exColWidth / 2;

    for (let c = 0; c < 2; c++) {
    const x = col3X + c * intColWidth;
    let y = intY;

    for (let j = 0; j < itemsPerSubCol; j++) {
        const idx = c * itemsPerSubCol + j;
        if (idx >= col7Items3.length) break;

        const [label, val] = col7Items3[idx];
        const checklist = val ? "Normal" : "Abnormal";

        // Label kiri
        doc.font("Times-Roman").fontSize(10).text(label, x + 5, y, {
        width: intColWidth - 50,
        align: "left",
        });

        // Hasil kanan
        doc.font("Times-Roman").fontSize(10).text(`(${checklist})`, x, y, {
        width: intColWidth - 10,
        align: "right",
        });

        y += 20;
    }
    }

    // ============ CONCLUSION & SUGGESTION ============
    const createdAt = new Date(data.created_at || new Date());
    const expiredAt = new Date(createdAt);
    expiredAt.setMonth(expiredAt.getMonth() + 3);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const startDate = createdAt.toLocaleDateString("en-US", options);
    const endDate = expiredAt.toLocaleDateString("en-US", options);

    colY += row7Height + 20;

    // --- KOLOM 1: Conclusion & Suggestion ---
    let col1Y = colY;

    // Label Conclusion
    doc.font("Times-Roman").fontSize(12).text("Conclusion:", col1X, col1Y);

    // Hasil conclusion di bawahnya (turun 20px misalnya)
    col1Y += 10;
    doc.font("Times-Bold").fontSize(11).text(data.conclusion || "-", col1X, col1Y, {
    width: colWidth - 20,
    align: "left",
    });
    
    col1Y += 40;
    doc.font("Times-Roman").fontSize(12).text("Suggestion:", col1X, col1Y);
    
    col1Y += 10;
    doc.font("Times-Bold").fontSize(11).text(`Issued: ${startDate}`, col1X, col1Y, {
      width: colWidth - 20,
      align: "left",
    });
    
    col1Y += 10;
    doc.font("Times-Bold").fontSize(11).text(`Valid Until: ${endDate}`, col1X, col1Y, {
      width: colWidth - 20,
      align: "left",
    });
    
    // --- KOLOM 2: QR Code ---
    if (data.qrText) {
    bwipjs.toBuffer(
      {
        bcid: "qrcode",
        text: data.qrText,
        scale: 2,           // kecil agar muat
        includetext: false,
        eclevel: "M",
      },
      (err, png) => {
        if (err) {
          console.error("QR Code error:", err);
        } else {
          const qrSize = 60;
          const qrX = col2X + (colWidth - qrSize) / 2; // posisi tengah kolom
          const qrY = colY + 20;
          doc.image(png, qrX, qrY, { width: qrSize });
    
          // --- KOLOM 3: Tanda Tangan ---
          let col3Y = colY;
          doc.font("Times-Roman").fontSize(11).text(`Brebes, ${startDate}`, col3X, col3Y, {
            width: colWidth - 20,
            align: "center",
          });
    
          col3Y += 20;
          doc.font("Times-Roman").fontSize(11).text("Examination", col3X, col3Y, {
            width: colWidth - 20,
            align: "center",
          });
    
          col3Y += 70;
          doc.font("Times-Roman").fontSize(11).text(data.doctor_name || "________________", col3X, col3Y, {
            width: colWidth - 20,
            align: "center",
          });

          const kopFooterPath = "./assets/kop-footer.png"; 
            if (fs.existsSync(kopFooterPath)) {
                const footerHeight = 80; // tinggi footer
                const footerY = doc.page.height - footerHeight - 10; // posisi dari bawah (20px padding)

                doc.image(kopFooterPath, 40, footerY, {
                    width: pageWidth,   // biar full width
                    align: "center"
                });
            } else {
                // fallback kalau gambar footer tidak ada
                doc.font("Times-Italic").fontSize(10).text("Rumah Sakit Bhakti Asih Brebes - Footer", 40, doc.page.height - 40, {
                    align: "center",
                    width: pageWidth,
                });
            }

    
          // end PDF setelah semua selesai
          doc.end();
        }
      }
    );
}

    stream.on("finish", () => {
        if (callback) callback();
      });
}

// contoh penggunaan
// generateMedicalReport(reportData, "output/medical_report.pdf");
module.exports = generateMedicalReport;
