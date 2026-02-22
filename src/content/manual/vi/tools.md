Khi các công cụ được bật, Naia có thể thực hiện nhiều tác vụ khác nhau một cách trực tiếp.

## Các Công Cụ Khả Dụng

| Công Cụ | Chức Năng | Bảo Mật |
|------|----------|----------|
| `execute_command` | Chạy các lệnh trong terminal | T3 |
| `read_file` | Đọc nội dung tệp | T0 |
| `write_file` | Tạo/sửa đổi tệp | T2 |
| `search_files` | Tìm kiếm hệ thống tệp | T0 |
| `web_search` | Tìm kiếm trên Internet | T1 |
| `apply_diff` | Chỉnh sửa tệp (áp dụng diff) | T2 |
| `browser` | Mở các trang web | T1 |
| `sessions_spawn` | Tạo tác nhân phụ | T2 |

## Ví Dụ Sử Dụng

Bạn có thể sử dụng các công cụ thông qua ngôn ngữ tự nhiên:

| Yêu Cầu | Công Cụ Sử Dụng |
|---------|-----------|
| "Hiển thị các tệp trong thư mục này" | `search_files` |
| "Đọc README.md" | `read_file` |
| "Chạy git status" | `execute_command` |
| "Tìm kiếm TypeScript" | `web_search` |
| "Xem lại mã này" | `sessions_spawn` |

## Phê Duyệt Bảo Mật

Mỗi công cụ yêu cầu phê duyệt dựa trên cấp độ bảo mật của nó:

- **T0 (Chỉ đọc)**: Tự động phê duyệt — không có tác dụng phụ
- **T1 (Thông báo)**: Hiển thị thông báo — truy cập bên ngoài nhưng không thay đổi
- **T2 (Thận trọng)**: Cần người dùng phê duyệt — sửa đổi tệp, tạo tác nhân
- **T3 (Nguy hiểm)**: Yêu cầu người dùng phê duyệt — thực thi lệnh

Khi lần đầu phê duyệt, chọn "Luôn cho phép" sẽ tự động phê duyệt công cụ đó cho các lần sau. Bạn có thể đặt lại các công cụ được phép trong Cài đặt > Công cụ.

## Kết Nối Gateway

Các công cụ yêu cầu kết nối Gateway:

1. Bật **Bật Công Cụ** trong Cài đặt > Công cụ
2. Trong môi trường người dùng thông thường, chi tiết kết nối Gateway được xử lý tự động
3. Nếu các công cụ không phản hồi, hãy khởi động lại ứng dụng và thử lại
4. Kiểm tra xem các kỹ năng cần thiết đã được bật trong tab Kỹ năng chưa
5. Chỉ các thiết lập tự lưu trữ/nâng cao mới cần kiểm tra URL/token Gateway thủ công