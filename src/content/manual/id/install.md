Naia OS dirancang terutama untuk lingkungan Linux, berfokus pada OS Imutabel seperti Bazzite atau lingkungan sandbox aman seperti Flatpak.

## Persyaratan Sistem

- **OS**: Linux (Bazzite, Ubuntu, Fedora, dll.)
- **Display Server**: Wayland (direkomendasikan) atau X11
- **Runtime**: Node.js 22+ (jika membangun dari sumber)
- **Daemon**: Membutuhkan dukungan Systemd User Service

---

## Opsi Penyebaran

Karena Naia OS menampilkan AI yang "mengontrol OS secara langsung," metode penyebaran merupakan pertimbangan penting.

### 1. Distribusi Flatpak (Direkomendasikan)
Ini adalah cara yang paling umum dan aman untuk mendistribusikan aplikasi desktop Linux. Anda dapat dengan mudah menginstalnya melalui toko aplikasi seperti Discover atau GNOME Software.

- **Isolasi Aman**: UI aplikasi (Tauri) dan agen inti (Node.js) berjalan sepenuhnya di dalam sandbox.
- **Eksekusi Host**: Ketika AI perlu menjalankan perintah terminal (misalnya, menginstal paket atau mengelola sistem file host), ia dengan aman keluar dari sandbox menggunakan `flatpak-spawn --host`.
- **Cara Menginstal**:
  Unduh bundel `.flatpak` yang disediakan dan instal melalui terminal:
  ```bash
  flatpak install --user ./Naia-OS.flatpak
  ```

### 2. Citra Terintegrasi Bazzite / BlueBuild (Tingkat Lanjut)
Untuk pengguna tingkat lanjut, Naia OS menyediakan resep BlueBuild untuk mengintegrasikan aplikasi langsung ke dalam citra Bazzite. Ini mengintegrasikan AI secara mendalam ke dalam OS, memungkinkan Naia menyambut Anda segera setelah boot.

---

## 🛠️ (Untuk Pengembang) Panduan Build Flatpak Lokal

Untuk membangun aplikasi sandbox Flatpak dari kode sumber, ikuti langkah-langkah berikut:

1. **Instal Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder
   
   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Tambahkan Dependensi Build (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Jalankan Build Pengemasan**
   Jalankan ini di direktori root proyek (Naia-OS).
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Jalankan Aplikasi**
   ```bash
   flatpak run com.naia.shell
   ```

> **💡 Catatan Pengembang:**
> Untuk memanipulasi lingkungan host pengguna dari dalam sandbox Flatpak, agen AI secara internal membungkus semua permintaan alat `execute_command` dengan `flatpak-spawn --host bash -c ...` di `agent/src/gateway/tool-bridge.ts`.