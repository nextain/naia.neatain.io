Cấu hình tất cả cài đặt ứng dụng. Nhấp vào **Lưu** để áp dụng các thay đổi.

![Settings overview](settings-overview.png)

## Ngôn ngữ

- Chuyển đổi giữa **tiếng Hàn** / **tiếng Anh**
- Áp dụng ngay lập tức

## Chủ đề

Có 8 chủ đề màu sắc:

| Chủ đề | Tâm trạng |
|-------|------|
| Espresso | Nâu ấm (mặc định) |
| Midnight | Xanh hải quân đậm |
| Ocean | Xanh lam đậm |
| Forest | Xanh lá tự nhiên |
| Rose | Tím hồng |
| Latte | Kem nhạt |
| Sakura | Hồng hoa anh đào |
| Cloud | Xám nhạt |

Nhấp vào ô màu để xem trước ngay lập lập tức.

## Avatar

### Mô hình VRM
- Chọn từ 4 mô hình tích hợp sẵn hoặc **Chọn Tệp** để tải VRM tùy chỉnh
- Nhấp để xem trước ngay lập tức
- Thoát mà không lưu sẽ hoàn nguyên về mô hình trước đó

### Hình nền
- Gradient mặc định hoặc hình nền tích hợp sẵn
- **Chọn Tệp** để tải hình ảnh tùy chỉnh (PNG, JPG, WebP)

## Tính cách (Persona)

Tùy chỉnh tính cách, phong cách nói chuyện và tên của Naia bằng văn bản tự do. Các thẻ cảm xúc được thêm tự động.

![Persona settings](settings-persona.png)

## Tài khoản Nextain

Quản lý tích hợp Nextain.

### Khi đã kết nối

- ID người dùng được hiển thị
- **Số dư tín dụng** được hiển thị (truy vấn thời gian thực)
- Nút **Bảng điều khiển**: Mở bảng điều khiển Nextain trong trình duyệt
- Nút **Nạp Tín dụng**: Chuyển đến trang thanh toán của Nextain
- Nút **Ngắt kết nối**: Hủy liên kết tài khoản Nextain
- Cài đặt tự động đồng bộ hóa với Nextain khi lưu

### Khi chưa kết nối
- Nút **Đăng nhập Nextain**: Đăng nhập qua trình duyệt, tự động kết nối

## Hướng dẫn sử dụng

Nhấp vào "Hướng dẫn sử dụng" để mở trang này trong trình duyệt.

## Cài đặt AI

- **Nhà cung cấp**: Gemini (mặc định), OpenAI, Claude, Grok, xAI, Ollama, Claude Code CLI
- **Mô hình**: Tên mô hình (ví dụ: gemini-2.5-flash)
- **API Key**: Khóa API của nhà cung cấp (không cần nếu sử dụng Nextain)

## Giọng nói (TTS/STT)

- **Phản hồi bằng giọng nói (TTS)**: BẬT/TẮT
- **Nhập liệu bằng giọng nói (STT)**: BẬT/TẮT
- **Google API Key**: Khóa TTS/STT chuyên dụng (để trống để sử dụng khóa trò chuyện)
- **Giọng TTS**: Chọn từ 11 giọng tiếng Hàn
  - Neural2: Chất lượng cao (16 USD/1 triệu ký tự)
  - WaveNet: Tự nhiên (16 USD/1 triệu ký tự)
  - Standard: Cơ bản (4 USD/1 triệu ký tự)
- Nút **Xem trước** để kiểm tra giọng nói đã chọn

## Công cụ

Quản lý quyền kiểm soát hệ thống có sẵn cho Naia.

- **Bật Công cụ**: BẬT/TẮT chính cho các tính năng công cụ
- **URL Gateway / Mã thông báo Gateway**: Được quản lý tự động trong môi trường người dùng thông thường, vì vậy không yêu cầu nhập thủ công
  - Chỉ người dùng nâng cao chạy Gateway tự lưu trữ mới cần kiểm tra/chỉnh sửa các giá trị này
- **Công cụ được phép**: Các công cụ được đánh dấu là "Luôn cho phép"
  - **Xóa Công cụ được phép**: Đặt lại tất cả các phê duyệt

> **Hướng dẫn các cấp độ bảo mật (T0~T3)**
> Một hệ thống bảo mật 4 cấp được áp dụng dựa trên tác động của hệ thống khi AI sử dụng một công cụ.
> - **T0 (Chỉ đọc)**: Các tác vụ truy vấn. Tự động thực thi mà không cần sự can thiệp của người dùng.
> - **T1 (Thông báo)**: Tìm kiếm/thông báo bên ngoài đơn giản. Hiển thị cảnh báo trên màn hình khi thực thi.
> - **T2 (Thận trọng)**: Thay đổi hệ thống như tạo/chỉnh sửa tệp. Yêu cầu người dùng phê duyệt rõ ràng.
> - **T3 (Nguy hiểm)**: Các tác vụ nguy hiểm như thực thi lệnh terminal. Yêu cầu phê duyệt mỗi lần.

## Kênh

- **Quản lý Kênh**: Kiểm tra trạng thái của các kênh nhắn tin đã kết nối và kiểm soát tích hợp với các dịch vụ bên ngoài.
- (Kiểm soát chi tiết được thực hiện trong tab Kênh.)

## Tích hợp

Quản lý tích hợp trình nhắn tin bên ngoài trên trang **Cài đặt > Tích hợp**.

- **Tích hợp Discord**: Tự động liên kết khi bạn đăng nhập bằng Discord. Gửi tin nhắn trực tiếp cho bot để trò chuyện với Naia.
- **Tích hợp Google Chat**: Dự kiến cho bản cập nhật tương lai.
- Trạng thái kết nối (đã kết nối/chưa kết nối) được hiển thị dưới dạng huy hiệu.

## Thiết bị & Từ đánh thức

![Device Settings](settings-device.png)

- **Danh sách Từ đánh thức**: Quản lý các từ để đánh thức AI (ví dụ: "Hey Naia", "Hello Naia")
- **Ghép nối Thiết bị**: Quản lý tích hợp thiết bị bên ngoài (ví dụ: các node OpenClaw đã ghép nối) và kết nối với các thiết bị nhà thông minh.
- Bao gồm các tính năng phê duyệt thiết bị và đặt lại mã thông báo.

## Bộ nhớ (Sự kiện)

Quản lý các sự kiện Naia đã học được từ các cuộc hội thoại.
- Mỗi sự kiện hiển thị một **khóa** và **giá trị**
- Nút **Xóa** để loại bỏ các sự kiện không cần thiết
- Các sự kiện đã lưu ảnh hưởng đến việc cá nhân hóa phản hồi trong các cuộc trò chuyện sau này
- Việc xóa nhiều sự kiện có thể làm giảm chất lượng cá nhân hóa

## Lưu & Đặt lại

- **Lưu**: Áp dụng tất cả các thay đổi
- **Đặt lại tất cả**: Khôi phục tất cả cài đặt và camera về mặc định (yêu cầu xác nhận)