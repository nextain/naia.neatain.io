Tab này quản lý các kênh nhắn tin khác nhau được kết nối với ứng dụng (Discord, Slack, Google Chat, Telegram, v.v.).

![Channels Tab](channels-tab.png)

## Xem Danh Sách Kênh
Bạn có thể xem tất cả các kênh đã kết nối và trạng thái của từng tài khoản một cách nhanh chóng.

- **Thẻ Trạng Thái**: Hiển thị các trạng thái như `connected`, `disconnected`, hoặc `error`.
- **Làm Mới**: Nhấp vào nút làm mới ở trên cùng bên phải để nhận trạng thái mới nhất.

## Đăng Nhập Kênh (Mã QR)
Bạn có thể bắt đầu đăng nhập web để kết nối một kênh cụ thể.
Bằng cách nói với Naia trong cuộc trò chuyện, "Start Discord web login," Naia sẽ hiển thị mã QR hoặc chuyển sang trạng thái chờ xác thực nếu được yêu cầu.

## Tích Hợp Bot Discord

Đăng nhập bằng tài khoản Discord của bạn tại [naia.nextain.io](https://naia.nextain.io) để tự động liên kết tài khoản của bạn. Sau khi liên kết, bạn có thể trò chuyện với Naia qua tin nhắn trực tiếp Discord.

### Cách Sử Dụng
1. **Đăng nhập bằng Discord** tại naia.nextain.io
2. Tài khoản của bạn tự động được liên kết với bot Naia
3. **Gửi tin nhắn trực tiếp** cho bot để bắt đầu trò chuyện
4. Tín dụng sẽ tự động được trừ từ tài khoản naia.nextain.io của bạn

### Tính Năng
- **Chỉ tin nhắn trực tiếp**: Naia phản hồi tin nhắn trực tiếp từ người dùng đã liên kết
- **Tích hợp tín dụng**: Tín dụng từ tài khoản naia.nextain.io của bạn được sử dụng tự động
- **Hướng dẫn người dùng chưa đăng ký**: Người dùng chưa có tài khoản liên kết sẽ nhận được hướng dẫn thiết lập
- **Giới hạn tốc độ**: Giới hạn 10 tin nhắn mỗi phút để bảo vệ tín dụng của bạn

## Tích Hợp Google Chat (Sắp Ra Mắt)

Tích hợp Google Chat được lên kế hoạch cho bản cập nhật tương lai. Hãy theo dõi các thông báo.

## Thông Báo Messenger (Webhooks)
Naia OS kế thừa hệ thống kênh mạnh mẽ của OpenClaw.
Bằng cách nhập URL Webhook của Slack, Discord hoặc Google Chat của bạn vào menu **Cài đặt > Công cụ > Webhooks** hoặc trong màn hình giới thiệu ban đầu, Naia có thể gửi cho bạn tin nhắn với kết quả của các tác vụ quan trọng.

> **Mẹo:** "Let me know on Discord when this file backup is completely finished!"

## Nâng Cao: Xây Dựng Bot Tự Trị 24/7
Bằng cách sử dụng công cụ lệnh terminal (`execute_command`), bạn có thể biến Naia thành một tác nhân tự trị 24/7 cư trú trong Telegram hoặc Discord, vượt ra ngoài máy tính để bàn của bạn.

Ra lệnh cho Naia trong cuộc trò chuyện như sau:
> "My Telegram bot token is `1234:ABC...`. Run `openclaw channels add --channel telegram --token 1234:ABC...` to start my Telegram bot."

Giờ đây, ngay cả khi bạn đóng ứng dụng máy tính để bàn, bạn vẫn có thể trò chuyện với Naia và giao nhiệm vụ bất cứ lúc nào thông qua Telegram trên điện thoại của bạn qua OpenClaw Gateway chạy nền.