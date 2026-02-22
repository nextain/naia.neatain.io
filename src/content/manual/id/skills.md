Jelajahi dan kelola skill (alat) yang tersedia.

![Skills tab](skills-tab.png)

## Jenis Skill

### Skill Bawaan
Tertanam dalam aplikasi — tidak dapat dinonaktifkan:

| Skill | Fungsi | Tingkat Keamanan |
|-------|----------|---------------|
| `skill_time` | Periksa tanggal/waktu saat ini | T0 |
| `skill_system_status` | Periksa status sistem | T0 |
| `skill_memo` | Simpan/ambil memo | T0 |
| `skill_weather` | Periksa cuaca | T0 |
| `skill_naia_discord` | Kirim/terima DM Discord | T1 |
| `skill_soul` | Kelola kepribadian dan memori AI | T0 |
| `skill_exit` | Keluar dari aplikasi dengan aman | T2 |

### Skill Kustom
Ditambahkan melalui Gateway — dapat diaktifkan/dinonaktifkan:
- Baca/tulis file, eksekusi perintah, pencarian web, dll.
- Tipe Gateway atau Command

## Sumber Skill (Dari mana asalnya?)

- **Skill bawaan**: dibundel dengan aplikasi
- **Skill kustom**: dimuat dari manifes skill lokal (misalnya, `~/.naia/skills/.../skill.json`)
- Perluas kartu skill untuk memeriksa lencana `source`

## Cara Menambahkan Skill Kustom

Naia OS 100% kompatibel dengan ekosistem OpenClaw. Ada tiga cara untuk menambahkan skill:

### 1. Minta AI untuk Membangunnya (Termudah)
Jelaskan apa yang Anda inginkan di obrolan, dan Naia akan menulis kode dan membuat skill untuk Anda.
> "Buat skill yang mengambil nilai tukar saat ini dan menyimpannya ke `~/.naia/skills/exchange/skill.json`."

### 2. Instal dari Clawhub (Cara OpenClaw)
Anda dapat menggunakan alat Terminal (`execute_command`) untuk menginstal plugin langsung dari **[Clawhub.ai](https://clawhub.ai)**, registri skill OpenClaw resmi yang berisi lebih dari 5.700 skill.

> "Jalankan `openclaw plugins install @openclaw/plugin-github` di terminal untuk menginstal plugin Github."

⚠️ **Peringatan Keamanan:** Skill yang diunduh dari Clawhub atau sumber online lainnya ditulis oleh pihak ketiga. Sebelum menginstal, selalu minta AI untuk **"Tinjau kode skill ini untuk mencari risiko keamanan (seperti menghapus file atau mencuri informasi pribadi) sebelum melanjutkan."**

### 3. Penambahan Manual
1. Buat manifes skill di `~/.naia/skills/<skill-name>/skill.json`
2. Tempatkan skrip/eksekusi yang diperlukan untuk skill tersebut di folder yang sama
3. Buka tab Skills dan periksa apakah skill baru muncul
4. Aktifkan menggunakan tombol sakelar
5. Uji dari obrolan dengan permintaan yang seharusnya memicu skill

Jika tidak muncul, mulai ulang aplikasi dan periksa lagi.

## Integrasi Komunitas Botmadang

Naia OS menyertakan skill bawaan (`skill_botmadang`) yang didedikasikan untuk **Botmadang**, komunitas Agen AI Korea.

Anda dapat menginstruksikan Naia untuk memulai aktivitasnya di Botmadang melalui obrolan:
> "Daftar sebagai agen baru di Botmadang. Tetapkan nama Anda menjadi 'naia Agent'."

Setelah terdaftar dan diberi API Key, Naia dapat secara mandiri memposting artikel atau mengomentari utas agen lain.

## Skill Notifikasi (Slack / Discord / Google Chat)

`skill_notify_slack` dan `skill_notify_discord` adalah skill notifikasi kustom yang mengirim pesan melalui webhook.

### Pengaturan Webhook

Untuk menggunakan skill notifikasi, Anda perlu mengkonfigurasi URL webhook. Ada dua metode:

**Metode 1: Variabel Lingkungan (Direkomendasikan)**

```bash
# Tambahkan ke ~/.bashrc atau ~/.zshrc
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T.../B.../xxx"
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/123/abc"
```

**Metode 2: config.json**

```json
// ~/.naia/config.json
{
  "notifications": {
    "slack": {
      "webhookUrl": "https://hooks.slack.com/services/T.../B.../xxx"
    },
    "discord": {
      "webhookUrl": "https://discord.com/api/webhooks/123/abc"
    }
  }
}
```

> Variabel lingkungan lebih diutamakan daripada config.json.

### Contoh Penggunaan

Cukup tanyakan Naia di obrolan:

- "Kirim notifikasi 'deploy complete' ke Slack"
- "Posting laporan status server ke Discord"
- "Beritahu saluran #ops tentang hasil build"

Naia akan secara otomatis memanggil `skill_notify_slack` atau `skill_notify_discord`.

Jika tidak ada webhook yang dikonfigurasi, pesan yang menjelaskan langkah-langkah pengaturan akan ditampilkan.

### Integrasi OpenClaw Gateway (Lanjutan)

Ketika OpenClaw Gateway terhubung, skill notifikasi akan terlebih dahulu mencoba menggunakan RPC `skills.invoke` Gateway. Jika relai Gateway gagal, skill akan kembali ke pengiriman webhook langsung.

Integrasi saluran Gateway menyediakan fitur yang lebih kaya (pemformatan pesan, utas, penyebutan, dll.).

## Skenario Lanjutan: Otomatisasi OpenClaw + cron

Dalam pengaturan otomatisasi tim/pribadi, Anda dapat mendaftarkan skill di OpenClaw dan memicunya sesuai jadwal dengan cron.

Contoh skenario:
- Setiap hari pukul 09:00: hasilkan ringkasan log kerja kemarin
- Setiap jam: pindai folder target dan beri tahu tentang anomali
- Tengah malam: hasilkan dan unggah laporan harian

Alur yang direkomendasikan:
1. Daftarkan skill kustom dan validasi secara lokal terlebih dahulu
2. Konfigurasi webhook skill notifikasi untuk menghubungkan saluran peringatan
3. Tambahkan langkah pemanggilan skill dalam definisi tugas OpenClaw Anda
4. Lampirkan jadwal cron sebagai pemicu berulang
5. Tambahkan kebijakan coba lagi/notifikasi untuk kegagalan

> **Roadmap**: UI penjadwalan cron, dukungan Telegram, dan perutean multi-saluran (mengirim satu pesan ke beberapa saluran secara bersamaan) akan tersedia di pembaruan mendatang.

## Kartu Skill

Setiap skill ditampilkan sebagai kartu:

![Skill card detail](skills-card.png)

- **Nama**: Nama skill (misalnya, `skill_read_file`)
- **Deskripsi**: Ringkasan satu baris (mungkin terpotong)
- **Klik**: Klik kartu untuk memperluas deskripsi lengkap
- **Lencana**: Tipe (bawaan/gateway/command), tingkat keamanan (T0~T3)
- **Tombol ?**: Minta AI untuk menjelaskan skill ini
- **Sakelar**: Aktifkan/nonaktifkan skill kustom

## Pencarian & Manajemen Massal

- **Cari**: Filter berdasarkan nama atau deskripsi skill
- **Aktifkan Semua**: Aktifkan semua skill kustom
- **Nonaktifkan Semua**: Nonaktifkan semua skill kustom
- Jumlah aktif/total ditampilkan (misalnya, 45/50)

## Kelola Skill melalui AI

Anda juga dapat meminta Naia untuk mengelola skill dalam obrolan:

- "Tunjukkan daftar skill yang tersedia"
- "Apakah ada skill terkait cuaca?"
- "Nonaktifkan skill healthcheck"
- "Temukan skill terkait coding"

Naia akan menggunakan alat `skill_skill_manager` secara otomatis.

## Tingkat Keamanan

| Tingkat | Deskripsi | Persetujuan |
|------|------------|----------|
| T0 | Hanya baca, tanpa efek samping | Disetujui Otomatis |
| T1 | Hanya notifikasi | Pemberitahuan ditampilkan |
| T2 | Perhatian diperlukan | Persetujuan pengguna diperlukan |
| T3 | Operasi berbahaya | Persetujuan pengguna diperlukan |