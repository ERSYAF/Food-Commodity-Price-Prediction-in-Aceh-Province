<<<<<<< HEAD
# 🌾 AcehPangan — Dashboard Prediksi Harga Komoditas

> Sistem prediksi harga komoditas pangan Provinsi Aceh berbasis model **LSTM** dan **LSTM-GRU**
>
> **Penelitian TugaS akhir** · Data: PIHPS Nasional 2021–2024

---


## 🚀 Cara Menjalankan

### Option 1 — Buka Langsung
Buka `index.html` di browser modern (Chrome, Firefox, Edge).

> ⚠️ **Catatan:** Data diload via `fetch()`. Beberapa browser memblokir fetch dari file lokal.
> Gunakan option 2 jika grafik tidak muncul.

### Option 2 — Local Server (Direkomendasikan)

**Python:**
```bash
cd aceh-pangan-project
python -m http.server 8080
# Buka: http://localhost:8080
```

**Node.js (npx):**
```bash
cd aceh-pangan-project
npx serve .
```

**VS Code Live Server:**
Klik kanan `index.html` → Open with Live Server

---

## 📊 Halaman & Fitur

| Halaman | Fitur |
|---|---|
| **Dashboard** `index.html` | KPI harga terkini, grafik prediksi vs aktual, tabel future, metrik evaluasi |
| **Prediksi Baru** `pages/prediksi.html` | Input 30 hari harga, pilih horizon (7/14/30/60 hari), pilih model, hasil chart + tabel |
| **Perbandingan** `pages/perbandingan.html` | Bar chart MAPE/RMSE/MAE, overlay prediksi, kesimpulan analitis |
| **Data** `pages/data.html` | Tren historis interaktif, filter tanggal, statistik deskriptif, export CSV |
| **Tentang** `pages/tentang.html` | Latar belakang, arsitektur model, alur penelitian, glosarium |

---

## 🤖 Model

| Model | File | Input | Output | Unggul di |
|---|---|---|---|---|
| LSTM | `model_lstm_komoditas.h5` | (None, 30, 3) | (None, 3) | Beras, Bawang |
| GRU  | `model_GRU_komoditas.h5`  | (None, 30, 3) | (None, 3) | Cabai |

---

## 📐 Hasil Evaluasi

| Komoditas | MAPE LSTM | MAPE GRU | Pemenang |
|---|---|---|---|
| Beras Medium | **4.51%** | 5.06% | 🟡 LSTM |
| Bawang Merah | **17.58%** | 18.63% | 🟡 LSTM |
| Cabai Merah Keriting | 21.05% | **18.25%** | 🟣 GRU |

---

## 🛠️ Teknologi

- **Model:** Python · TensorFlow/Keras · scikit-learn
- **Dashboard:** HTML5 · CSS3 · Vanilla JS
- **Charts:** Chart.js 4.4.1
- **Font:** Syne (display) + Instrument Sans (body)
- **Data:** PIHPS Nasional Aceh · Jan 2021–Des 2024

---

## 📦 Data

File `data/data.json` berisi:
- `dates_all` — 1.461 tanggal harian
- `actual_all` — harga aktual 3 komoditas (semua periode)
- `test_dates` — tanggal data uji (Mar–Des 2024)
- `actual_test`, `lstm_pred`, `gru_pred` — data uji + prediksi
- `future_dates`, `lstm_future`, `gru_future` — prediksi 30 hari Jan 2025
- `metrics` — RMSE, MAE, MAPE per model per komoditas

---

*Dashboard ini dibuat sebagai bagian dari skripsi penelitian prediksi harga komoditas dan peluang usaha distribusi pangan di Aceh menggunakan model deep learning.*
=======
# Food-Commodity-Price-Prediction-in-Aceh-Province
A comparative study of LSTM and LSTM-GRU models for predicting the prices of Medium Rice, Shallots, and Curly Red Chili using daily data from 2021–2024.
>>>>>>> c34d375d00ca98c3fe44a61e36d4fcf860db6060
