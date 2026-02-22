Duyệt và quản lý các kỹ năng (công cụ) có sẵn.

![Thẻ Kỹ năng](skills-tab.png)

## Loại Kỹ năng

### Kỹ năng Tích hợp sẵn
Được nhúng trong ứng dụng — không thể tắt:

| Kỹ năng | Chức năng | Cấp độ Bảo mật |
|-------|----------|---------------|
| `skill_time` | Kiểm tra ngày/giờ hiện tại | T0 |
| `skill_system_status` | Kiểm tra trạng thái hệ thống | T0 |
| `skill_memo` | Lưu/truy xuất ghi nhớ | T0 |
| `skill_weather` | Kiểm tra thời tiết | T0 |
| `skill_naia_discord` | Gửi/nhận tin nhắn trực tiếp Discord | T1 |
| `skill_soul` | Quản lý tính cách và bộ nhớ AI | T0 |
| `skill_exit` | Thoát ứng dụng một cách an toàn | T2 |

### Kỹ năng Tùy chỉnh
Được thêm qua Gateway — có thể bật/tắt:
- Đọc/ghi tệp, thực thi lệnh, tìm kiếm web, v.v.
- Loại Gateway hoặc Command

## Nguồn Kỹ năng (Chúng đến từ đâu?)

- **Kỹ năng tích hợp sẵn**: đi kèm với ứng dụng
- **Kỹ năng tùy chỉnh**: được tải từ các manifest kỹ năng cục bộ (ví dụ: `~/.naia/skills/.../skill.json`)
- Mở rộng thẻ kỹ năng để kiểm tra huy hiệu `source` của nó

## Cách Thêm Kỹ năng Tùy chỉnh

Naia OS tương thích 100% với hệ sinh thái OpenClaw. Có ba cách để thêm kỹ năng:

### 1. Yêu cầu AI Xây dựng (Dễ nhất)
Giải thích những gì bạn muốn trong cuộc trò chuyện, và Naia sẽ viết mã và tạo kỹ năng cho bạn.
> "Xây dựng một kỹ năng lấy tỷ giá hối đoái hiện tại và lưu nó vào `~/.naia/skills/exchange/skill.json`."

### 2. Cài đặt từ Clawhub (Cách của OpenClaw)
Bạn có thể sử dụng công cụ Terminal (`execute_command`) để cài đặt plugin trực tiếp từ **[Clawhub.ai](https://clawhub.ai)**, kho đăng ký kỹ năng OpenClaw chính thức chứa hơn 5.700 kỹ năng.

> "Chạy `openclaw plugins install @openclaw/plugin-github` trong terminal để cài đặt plugin Github."

⚠️ **Cảnh báo Bảo mật:** Các kỹ năng được tải xuống từ Clawhub hoặc các nguồn trực tuyến khác được viết bởi bên thứ ba. Trước khi cài đặt, hãy luôn yêu cầu AI **"Kiểm tra mã của kỹ năng này để tìm bất kỳ rủi ro bảo mật nào (như xóa tệp hoặc đánh cắp thông tin cá nhân) trước khi tiếp tục."**

### 3. Thêm Thủ công
1. Tạo một manifest kỹ năng tại `~/.naia/skills/<skill-name>/skill.json`
2. Đặt bất kỳ script/tệp thực thi cần thiết nào cho kỹ năng đó vào cùng thư mục
3. Mở thẻ Kỹ năng và kiểm tra xem kỹ năng mới có xuất hiện không
4. Bật nó bằng cách sử dụng công tắc
5. Kiểm tra nó từ cuộc trò chuyện với một yêu cầu sẽ kích hoạt kỹ năng

Nếu nó không xuất hiện, hãy khởi động lại ứng dụng và kiểm tra lại.

## Tích hợp Cộng đồng Botmadang

Naia OS bao gồm một kỹ năng tích hợp sẵn (`skill_botmadang`) dành riêng cho **Botmadang**, một cộng đồng AI Agent của Hàn Quốc.

Bạn có thể hướng dẫn Naia bắt đầu các hoạt động của mình trên Botmadang qua trò chuyện:
> "Đăng ký làm tác nhân mới trên Botmadang. Đặt tên của bạn là 'naia Agent'."

Sau khi đăng ký và được cấp API Key, Naia có thể tự động đăng bài viết hoặc bình luận về các chủ đề của các tác nhân khác.

## Kỹ năng Thông báo (Slack / Discord / Google Chat)

`skill_notify_slack` và `skill_notify_discord` là các kỹ năng thông báo tùy chỉnh, gửi tin nhắn qua webhook.

### Thiết lập Webhook

Để sử dụng các kỹ năng thông báo, bạn cần cấu hình URL webhook. Có hai phương pháp:

**Phương pháp 1: Biến môi trường (Khuyên dùng)**

```bash
# Add to ~/.bashrc or ~/.zshrc
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T.../B.../xxx"
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/123/abc"
```

**Phương pháp 2: config.json**

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

> Biến môi trường được ưu tiên hơn config.json.

### Ví dụ Sử dụng

Chỉ cần hỏi Naia trong cuộc trò chuyện:

- "Gửi thông báo 'triển khai hoàn tất' tới Slack"
- "Đăng báo cáo trạng thái máy chủ lên Discord"
- "Thông báo cho kênh #ops về kết quả xây dựng"

Naia sẽ tự động gọi `skill_notify_slack` hoặc `skill_notify_discord`.

Nếu không có webhook nào được cấu hình, một thông báo giải thích các bước thiết lập sẽ được hiển thị.

### Tích hợp OpenClaw Gateway (Nâng cao)

Khi OpenClaw Gateway được kết nối, các kỹ năng thông báo trước tiên sẽ cố gắng sử dụng RPC `skills.invoke` của Gateway. Nếu việc chuyển tiếp qua Gateway thất bại, kỹ năng sẽ quay lại gửi trực tiếp qua webhook.

Tích hợp kênh Gateway cung cấp các tính năng phong phú hơn (định dạng tin nhắn, chủ đề, đề cập, v.v.).

## Kịch bản Nâng cao: Tự động hóa OpenClaw + cron

Trong các thiết lập tự động hóa nhóm/cá nhân, bạn có thể đăng ký kỹ năng trong OpenClaw và kích hoạt chúng theo lịch trình với cron.

Ví dụ các kịch bản:
- Hàng ngày 09:00: tạo bản tóm tắt nhật ký công việc của ngày hôm qua
- Hàng giờ: quét một thư mục mục tiêu và thông báo về các bất thường
- Nửa đêm: tạo và tải lên báo cáo hàng ngày

Quy trình khuyến nghị:
1. Đăng ký kỹ năng tùy chỉnh và xác thực nó cục bộ trước
2. Cấu hình webhook kỹ năng thông báo để kết nối các kênh cảnh báo
3. Thêm bước gọi kỹ năng vào định nghĩa tác vụ OpenClaw của bạn
4. Gắn một lịch trình cron làm trình kích hoạt định kỳ
5. Thêm các chính sách thử lại/thông báo cho các trường hợp thất bại

> **Lộ trình**: giao diện người dùng lập lịch cron, hỗ trợ Telegram và định tuyến đa kênh (gửi một tin nhắn đến nhiều kênh cùng lúc) sẽ có trong các bản cập nhật tương lai.

## Thẻ Kỹ năng

Mỗi kỹ năng được hiển thị dưới dạng một thẻ:

![Chi tiết thẻ kỹ năng](skills-card.png)

- **Tên**: Tên kỹ năng (ví dụ: `skill_read_file`)
- **Mô tả**: Tóm tắt một dòng (có thể bị cắt bớt)
- **Nhấp**: Nhấp vào thẻ để mở rộng mô tả đầy đủ
- **Huy hiệu**: Loại (tích hợp sẵn/gateway/command), cấp độ bảo mật (T0~T3)
- **Nút ?**: Yêu cầu AI giải thích kỹ năng này
- **Công tắc**: Bật/tắt kỹ năng tùy chỉnh

## Tìm kiếm & Quản lý Hàng loạt

- **Tìm kiếm**: Lọc theo tên kỹ năng hoặc mô tả
- **Bật tất cả**: Kích hoạt tất cả các kỹ năng tùy chỉnh
- **Tắt tất cả**: Hủy kích hoạt tất cả các kỹ năng tùy chỉnh
- Số lượng kỹ năng đang hoạt động/tổng số được hiển thị (ví dụ: 45/50)

## Quản lý Kỹ năng qua AI

Bạn cũng có thể yêu cầu Naia quản lý các kỹ năng trong cuộc trò chuyện:

- "Cho tôi xem danh sách các kỹ năng có sẵn"
- "Có kỹ năng nào liên quan đến thời tiết không?"
- "Tắt kỹ năng healthcheck"
- "Tìm các kỹ năng liên quan đến lập trình"

Naia sẽ tự động sử dụng công cụ `skill_skill_manager`.

## Các Cấp độ Bảo mật

| Cấp độ | Mô tả | Phê duyệt |
|------|------------|----------|
| T0 | Chỉ đọc, không có tác dụng phụ | Tự động phê duyệt |
| T1 | Chỉ thông báo | Hiển thị thông báo |
| T2 | Cần thận trọng | Cần người dùng phê duyệt |
| T3 | Thao tác nguy hiểm | Cần người dùng phê duyệt |