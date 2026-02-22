Ketika alat diaktifkan, Naia dapat melakukan berbagai tugas secara langsung.

## Alat yang Tersedia

| Alat | Fungsi | Keamanan |
|------|----------|----------|
| execute_command | Jalankan perintah terminal | T3 |
| read_file | Baca isi file | T0 |
| write_file | Buat/modifikasi file | T2 |
| search_files | Cari sistem file | T0 |
| web_search | Pencarian internet | T1 |
| apply_diff | Edit file (terapkan diff) | T2 |
| browser | Buka halaman web | T1 |
| sessions_spawn | Buat sub-agen | T2 |

## Contoh Penggunaan

Anda dapat menggunakan alat melalui bahasa alami:

| Permintaan | Alat yang Digunakan |
|------------|---------------------|
| "Tampilkan file di folder ini" | search_files |
| "Baca README.md" | read_file |
| "Jalankan git status" | execute_command |
| "Cari TypeScript" | web_search |
| "Tinjau kode ini" | sessions_spawn |

## Persetujuan Keamanan

Setiap alat memerlukan persetujuan berdasarkan tingkat keamanannya:

- **T0 (Hanya-baca)**: Disetujui otomatis — tanpa efek samping
- **T1 (Pemberitahuan)**: Pemberitahuan ditampilkan — akses eksternal tetapi tanpa perubahan
- **T2 (Perhatian)**: Diperlukan persetujuan pengguna — modifikasi file, pembuatan agen
- **T3 (Berbahaya)**: Diperlukan persetujuan pengguna — eksekusi perintah

Saat pertama kali menyetujui, memilih "Selalu Izinkan" akan otomatis menyetujui alat tersebut di kemudian hari. Anda dapat mengatur ulang alat yang diizinkan di Settings > Tools.

## Koneksi Gateway

Alat memerlukan koneksi Gateway:

1. Aktifkan **Aktifkan Alat** di Settings > Tools
2. Di lingkungan pengguna normal, detail koneksi Gateway ditangani secara otomatis
3. Jika alat tidak merespons, mulai ulang aplikasi dan coba lagi
4. Periksa apakah skill yang diperlukan diaktifkan di tab Skills
5. Hanya pengaturan self-hosted/lanjutan yang memerlukan pemeriksaan URL/token Gateway secara manual