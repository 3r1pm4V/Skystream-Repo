# SkyStream Plugin Hub (h0dev Converted)

Đây là repository chứa các plugin SkyStream đã được chuyển đổi từ các extension CloudStream 3 (nhánh `movie` của `h0dev/0cs3`).

## Cấu trúc Repository
- `mega_repo.json`: File đăng ký trung tâm cho SkyStream.
- `plugins/`: Thư mục chứa mã nguồn các plugin.
  - `phimmoichill/`
  - `motphim/`
  - `tvhay/`
  - `phimbathu/`
  - `donghoa/`
  - `hh3d/`
  - `phimnet/`

## Cách sử dụng
Mỗi thư mục plugin chứa:
1. `plugin.json`: Cấu hình metadata và domain.
2. `src/index.ts`: Mã nguồn xử lý logic scraping và streaming.

Các plugin này sử dụng `skystream-sdk` và `skystream-extractors` để tối ưu hóa việc lấy link stream.
