Konfigurasi semua pengaturan aplikasi. Klik **Simpan** untuk menerapkan perubahan.

![Settings overview](settings-overview.png)

## Bahasa

- Beralih antara **Korea** / **Inggris**
- Diterapkan segera

## Tema

8 tema warna tersedia:

| Tema | Suasana |
|-------|------|
| Espresso | Cokelat hangat (default) |
| Midnight | Biru tua |
| Ocean | Biru laut |
| Forest | Hijau alami |
| Rose | Ungu mawar |
| Latte | Krem terang |
| Sakura | Merah muda bunga sakura |
| Cloud | Abu-abu terang |

Klik contoh warna untuk pratinjau instan.

## Avatar

### Model VRM
- Pilih dari 4 model bawaan atau **Pilih Berkas** untuk memuat VRM kustom
- Klik untuk pratinjau instan
- Keluar tanpa menyimpan akan kembali ke model sebelumnya

### Gambar Latar Belakang
- Gradien default atau latar belakang bawaan
- **Pilih Berkas** untuk memuat gambar kustom (PNG, JPG, WebP)

## Persona

Sesuaikan kepribadian, gaya bicara, dan nama Naia dalam teks bebas. Tag emosi ditambahkan secara otomatis.

![Persona settings](settings-persona.png)

## Akun Nextain

Kelola integrasi Nextain.

### Saat Terhubung

- ID Pengguna ditampilkan
- **Saldo kredit** ditampilkan (kueri waktu nyata)
- Tombol **Dashboard**: Buka dashboard Nextain di browser
- Tombol **Isi Kredit**: Buka halaman penagihan Nextain
- Tombol **Putuskan Sambungan**: Hapus tautan akun Nextain
- Pengaturan otomatis sinkron ke Nextain saat disimpan

### Saat Tidak Terhubung
- Tombol **Masuk Nextain**: Masuk melalui browser, otomatis terhubung

## Manual Pengguna

Klik "Manual Pengguna" untuk membuka halaman ini di browser.

## Pengaturan AI

- **Penyedia**: Gemini (default), OpenAI, Claude, Grok, xAI, Ollama, Claude Code CLI
- **Model**: Nama model (misalnya, gemini-2.5-flash)
- **API Key**: Kunci API penyedia (tidak diperlukan jika menggunakan Nextain)

## Suara (TTS/STT)

- **Respon Suara (TTS)**: ON/OFF
- **Input Suara (STT)**: ON/OFF
- **Google API Key**: Kunci TTS/STT khusus (biarkan kosong untuk menggunakan kunci obrolan)
- **Suara TTS**: Pilih dari 11 suara Korea
  - Neural2: Kualitas tinggi ($16/1M karakter)
  - WaveNet: Alami ($16/1M karakter)
  - Standard: Dasar ($4/1M karakter)
- Tombol **Pratinjau** untuk menguji suara yang dipilih

## Alat

Kelola izin kontrol sistem yang tersedia untuk Naia.

- **Aktifkan Alat**: Master ON/OFF untuk fitur alat
- **URL Gateway / Token Gateway**: Dikelola secara otomatis di lingkungan pengguna normal, sehingga input manual tidak diperlukan
  - Hanya pengguna tingkat lanjut yang menjalankan Gateway yang di-hosting sendiri yang perlu memeriksa/mengedit nilai-nilai ini
- **Alat yang Diizinkan**: Alat yang ditandai sebagai "Selalu Izinkan"
  - **Hapus Alat yang Diizinkan**: Atur ulang semua persetujuan

> **Panduan Tingkat Keamanan (T0~T3)**
> Sistem keamanan 4 tingkat diterapkan berdasarkan dampak sistem saat AI menggunakan alat.
> - **T0 (Hanya Baca)**: Tugas kueri. Dijalankan secara otomatis tanpa campur tangan pengguna.
> - **T1 (Beritahu)**: Pencarian/notifikasi eksternal sederhana. Menampilkan peringatan di layar saat dieksekusi.
> - **T2 (Hati-hati)**: Perubahan sistem seperti membuat/mengedit berkas. Membutuhkan persetujuan pengguna secara eksplisit.
> - **T3 (Berbahaya)**: Tugas berbahaya seperti menjalankan perintah terminal. Membutuhkan persetujuan setiap saat.

## Saluran

- **Manajemen Saluran**: Periksa status saluran messenger yang terhubung dan kendalikan integrasi dengan layanan eksternal.
- (Kontrol detail dilakukan di tab Saluran.)

## Integrasi

Kelola integrasi messenger eksternal di halaman **Pengaturan > Integrasi**.

- **Integrasi Discord**: Otomatis tertaut saat Anda masuk dengan Discord. Kirim DM ke bot untuk mengobrol dengan Naia.
- **Integrasi Google Chat**: Direncanakan untuk pembaruan mendatang.
- Status koneksi (terhubung/tidak terhubung) ditampilkan sebagai lencana.

## Perangkat & Kata Pembangun

![Device Settings](settings-device.png)

- **Daftar Kata Pembangun**: Kelola kata-kata untuk membangunkan AI (misalnya, "Hey Naia", "Hello Naia")
- **Pemasangan Perangkat**: Kelola integrasi perangkat eksternal (misalnya, node OpenClaw yang dipasangkan) dan koneksi dengan perangkat rumah pintar.
- Termasuk fitur untuk persetujuan perangkat dan reset token.

## Memori (Fakta)

Kelola fakta yang dipelajari Naia dari percakapan.
- Setiap fakta menampilkan **kunci** dan **nilai**
- Tombol **Hapus** untuk menghapus fakta yang tidak perlu
- Fakta yang disimpan memengaruhi personalisasi respons dalam obrolan berikutnya
- Menghapus banyak fakta dapat mengurangi kualitas personalisasi

## Simpan & Atur Ulang

- **Simpan**: Terapkan semua perubahan
- **Atur Ulang Semua**: Pulihkan semua pengaturan dan kamera ke default (membutuhkan konfirmasi)