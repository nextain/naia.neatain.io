Naia OS được thiết kế chủ yếu cho các môi trường Linux, tập trung vào các hệ điều hành bất biến (Immutable OSs) như Bazzite hoặc các môi trường sandbox bảo mật như Flatpak.

## Yêu cầu hệ thống

- **Hệ điều hành**: Linux (Bazzite, Ubuntu, Fedora, v.v.)
- **Máy chủ hiển thị**: Wayland (được khuyến nghị) hoặc X11
- **Thời gian chạy**: Node.js 22+ (nếu xây dựng từ mã nguồn)
- **Daemon**: Yêu cầu hỗ trợ Systemd User Service

---

## Tùy chọn triển khai

Vì Naia OS có một AI "điều khiển trực tiếp hệ điều hành", phương pháp triển khai là một yếu tố quan trọng cần cân nhắc.

### 1. Phân phối Flatpak (Được khuyến nghị)
Đây là cách phổ biến và an toàn nhất để phân phối các ứng dụng máy tính để bàn Linux. Bạn có thể dễ dàng cài đặt nó thông qua các cửa hàng ứng dụng như Discover hoặc GNOME Software.

- **Cách ly bảo mật**: Giao diện người dùng của ứng dụng (Tauri) và tác nhân cốt lõi (Node.js) chạy hoàn toàn bên trong sandbox.
- **Thực thi trên máy chủ**: Khi AI cần thực thi các lệnh terminal (ví dụ: cài đặt gói hoặc quản lý hệ thống tệp máy chủ), nó sẽ thoát khỏi sandbox một cách an toàn bằng cách sử dụng `flatpak-spawn --host`.
- **Cách cài đặt**:
  Tải xuống gói `.flatpak` được cung cấp và cài đặt qua terminal:
  ```bash
  flatpak install --user ./Naia-OS.flatpak
  ```

### 2. Ảnh tích hợp Bazzite / BlueBuild (Nâng cao)
Đối với người dùng nâng cao, Naia OS cung cấp công thức BlueBuild để đưa ứng dụng trực tiếp vào một ảnh Bazzite. Điều này tích hợp sâu AI vào hệ điều hành, cho phép Naia chào bạn ngay khi khởi động.

---

## 🛠️ (Dành cho nhà phát triển) Hướng dẫn xây dựng Flatpak cục bộ

Để xây dựng ứng dụng sandbox Flatpak từ mã nguồn, hãy làm theo các bước sau:

1. **Cài đặt Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder
   
   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Thêm các phụ thuộc xây dựng (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Chạy bản dựng đóng gói**
   Thực thi lệnh này trong thư mục gốc của dự án (Naia-OS).
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Chạy ứng dụng**
   ```bash
   flatpak run com.naia.shell
   ```

> **💡 Ghi chú dành cho nhà phát triển:**
> Để thao tác môi trường máy chủ của người dùng từ bên trong sandbox Flatpak, tác nhân AI nội bộ bao bọc tất cả các yêu cầu công cụ `execute_command` bằng `flatpak-spawn --host bash -c ...` trong `agent/src/gateway/tool-bridge.ts`.