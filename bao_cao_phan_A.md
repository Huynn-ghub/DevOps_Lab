# BÁO CÁO ĐỒ ÁN DEVOPS MINI PROJECT

---

## PHẦN A: THÔNG TIN CHUNG

---

### 1. Thông Tin Sinh Viên

| Trường | Nội dung |
|---|---|
| **Họ và tên** | Đồng Thanh Huyền |
| **Mã số sinh viên** | 2251220032 |
| **Lớp** | 22CT1 |
| **Tên ứng dụng** | TodoApp – Kanban Task Manager |
| **Công nghệ** | Node.js · Express · MongoDB · React · Vite · TailwindCSS |

---

### 2. Giới Thiệu Ứng Dụng

#### 2.1. Mục đích

**TodoApp – Kanban Task Manager** là ứng dụng quản lý công việc cá nhân theo phong cách Kanban, giúp người dùng tổ chức, theo dõi và hoàn thành các nhiệm vụ một cách hiệu quả và trực quan.

Ứng dụng được phát triển trong khuôn khổ môn học DevOps, áp dụng các kiến thức thực tế về:
- Xây dựng RESTful API với Node.js và Express.js theo kiến trúc Controller → Service → Repository
- Quản lý cơ sở dữ liệu với MongoDB Atlas (cloud)
- Xây dựng giao diện người dùng hiện đại với React, Vite và TailwindCSS
- Quản lý phiên bản mã nguồn với Git

#### 2.2. Người dùng mục tiêu

Ứng dụng hướng đến **người dùng cá nhân** muốn quản lý công việc theo quy trình Kanban, bao gồm:
- Sinh viên quản lý bài tập, deadline theo từng giai đoạn (To Do → In Progress → Done)
- Nhân viên văn phòng theo dõi công việc cá nhân có mức độ ưu tiên
- Bất kỳ ai muốn tăng năng suất với Pomodoro Timer tích hợp sẵn

#### 2.3. Phạm vi ứng dụng

| Phạm vi | Chi tiết |
|---|---|
| **Loại ứng dụng** | Web Application (Full-stack) |
| **Môi trường** | Chạy trên trình duyệt web, triển khai cục bộ |
| **Dữ liệu** | Lưu trữ trên MongoDB Atlas (cloud database) |
| **Quy mô** | Ứng dụng cá nhân, không yêu cầu đăng nhập |
| **Nền tảng** | Desktop Web (responsive) |

---

### 3. Tính Năng

#### 3.1. Tính năng chính

| # | Tính năng | Mô tả |
|---|---|---|
| 1 | **Kanban Board 3 cột** | Hiển thị task theo 3 trạng thái: *To Do*, *In Progress*, *Done* |
| 2 | **Thêm task mới có Priority** | Nhập tiêu đề + chọn mức ưu tiên (Low / Medium / High), lưu vào MongoDB |
| 3 | **Drag & Drop** | Kéo thả task giữa các cột để cập nhật trạng thái, đồng bộ với backend |
| 4 | **Xóa task** | Xóa task khỏi danh sách và database |
| 5 | **Pomodoro Timer** | Floating widget đếm ngược (15/25/50 phút) gắn với task đang chọn, hỏi có hoàn thành không khi hết giờ |
| 6 | **Gamification** | Hệ thống Level + EXP + Streak: hoàn thành task nhận EXP theo độ ưu tiên; lên cấp mỗi 100 EXP |
| 7 | **Confetti Animation** | Hiệu ứng pháo hoa khi kéo task vào cột *Done* hoặc hoàn thành Pomodoro |
| 8 | **Analytics Dashboard** | Trang thống kê: tổng task, tỉ lệ hoàn thành, phân tích theo Priority và trạng thái |
| 9 | **Trang thông tin sinh viên** | Route `/about` hiển thị thông tin cá nhân sinh viên và tech stack |
| 10 | **Health Check** | Endpoint `/health` trả về `{ "status": "ok" }` để kiểm tra server |

#### 3.2. Tính năng kỹ thuật (DevOps)

| # | Tính năng | Mô tả |
|---|---|---|
| 1 | **REST API** | Các endpoints: GET, POST, PATCH, DELETE cho `/api/todos`; GET cho `/api/stats`; POST cho `/api/stats/exp` |
| 2 | **Environment Variables** | Cấu hình qua `.env`: `PORT`, `DB_URL`, `APP_NAME` |
| 3 | **Layered Architecture** | Backend theo mô hình Controller → Service → Repository |
| 4 | **Cloud Database** | Kết nối MongoDB Atlas, dữ liệu persistent |
| 5 | **Vite Proxy** | Frontend proxy `/api` đến backend, tránh CORS issue khi dev |

---

### 4. Use Cases

#### Sơ đồ Use Case

```
                    ┌──────────────────────────────────────┐
                    │       TodoApp – Kanban Manager        │
                    │                                       │
        ┌───┐       │  ┌──────────────────────────────┐    │
        │   │──────►│  │  UC01: Xem Kanban Board      │    │
        │   │       │  └──────────────────────────────┘    │
        │   │       │                                       │
        │   │──────►│  ┌──────────────────────────────┐    │
        │   │       │  │  UC02: Thêm task + Priority  │    │
        │   │       │  └──────────────────────────────┘    │
        │   │       │                                       │
        │Người│     │  ┌──────────────────────────────┐    │
        │dùng │────►│  │  UC03: Drag & Drop task      │    │
        │   │       │  └──────────────────────────────┘    │
        │   │       │                                       │
        │   │──────►│  ┌──────────────────────────────┐    │
        │   │       │  │  UC04: Dùng Pomodoro Timer   │    │
        │   │       │  └──────────────────────────────┘    │
        │   │       │                                       │
        │   │──────►│  ┌──────────────────────────────┐    │
        │   │       │  │  UC05: Xem Analytics         │    │
        │   │       │  └──────────────────────────────┘    │
        │   │       │                                       │
        └───┘       │  ┌──────────────────────────────┐    │
                    │  │  UC06: Xem /about            │    │
                    │  └──────────────────────────────┘    │
                    └──────────────────────────────────────┘
```

#### Chi tiết Use Cases

---

**UC01 – Xem Kanban Board**

| Trường | Nội dung |
|---|---|
| **Actor** | Người dùng |
| **Mô tả** | Người dùng xem toàn bộ task phân chia theo 3 cột trạng thái |
| **Tiền điều kiện** | Ứng dụng đang chạy, kết nối database thành công |
| **Luồng chính** | 1. Người dùng truy cập trang chủ `/` → 2. Hệ thống gọi `GET /api/todos` → 3. Backend truy vấn MongoDB → 4. Task hiển thị theo cột *To Do / In Progress / Done* |
| **Kết quả** | Kanban Board hiển thị đầy đủ task với priority badge và số lượng mỗi cột |

---

**UC02 – Thêm task mới có Priority**

| Trường | Nội dung |
|---|---|
| **Actor** | Người dùng |
| **Mô tả** | Người dùng nhập tiêu đề và chọn mức ưu tiên để tạo task mới |
| **Tiền điều kiện** | Người dùng đang ở trang chủ |
| **Luồng chính** | 1. Người dùng nhập tiêu đề vào ô input → 2. Chọn Priority (Low / Medium / High) → 3. Nhấn nút **"+ Add"** → 4. Hệ thống gọi `POST /api/todos` → 5. Backend lưu vào MongoDB → 6. Task mới xuất hiện ở cột *To Do* |
| **Luồng thay thế** | Nếu để trống input → nút Add bị disabled, không gọi API |
| **Kết quả** | Task mới được lưu vào database và hiển thị ngay trên Kanban Board |

---

**UC03 – Drag & Drop task giữa các cột**

| Trường | Nội dung |
|---|---|
| **Actor** | Người dùng |
| **Mô tả** | Người dùng kéo thả task sang cột khác để cập nhật trạng thái |
| **Tiền điều kiện** | Có ít nhất 1 task trong bảng |
| **Luồng chính** | 1. Người dùng giữ và kéo task card → 2. Thả vào cột đích → 3. Hệ thống gọi `PATCH /api/todos/:id` với `{ status }` → 4. Nếu thả vào cột *Done*: confetti nổ + cộng EXP theo priority → 5. Level tự động cập nhật |
| **Kết quả** | Trạng thái task được cập nhật trong database; EXP/Level thay đổi tức thì |

---

**UC04 – Sử dụng Pomodoro Timer**

| Trường | Nội dung |
|---|---|
| **Actor** | Người dùng |
| **Mô tả** | Người dùng bắt đầu phiên tập trung 15/25/50 phút gắn với một task |
| **Tiền điều kiện** | Có task ở cột *To Do* hoặc *In Progress* |
| **Luồng chính** | 1. Hover vào task → nhấn icon ⏱ → 2. Widget Pomodoro nổi lên ở góc dưới, hiển thị tên task → 3. Chọn thời gian (15/25/50 phút) → 4. Nhấn Play để đếm ngược → 5. Khi hết giờ: confetti + hỏi "Task Done?" → 6. Nếu "Yes": task chuyển sang *Done* + cộng EXP; nếu "Not yet": chỉ cộng 15 EXP Focus |
| **Luồng thay thế** | Nhấn nút Stop (■) bất kỳ lúc nào để hủy phiên |
| **Kết quả** | Task được xử lý hoặc EXP được cộng tùy theo kết quả phiên |

---

**UC05 – Xem Analytics Dashboard**

| Trường | Nội dung |
|---|---|
| **Actor** | Người dùng |
| **Mô tả** | Người dùng xem thống kê tổng quan về tiến độ công việc |
| **Tiền điều kiện** | Ứng dụng đang chạy |
| **Luồng chính** | 1. Nhấn **"Analytics"** trên Navbar → 2. Hệ thống gọi `GET /api/stats` → 3. Hiển thị: tổng task, tỉ lệ hoàn thành, thống kê theo Priority và trạng thái |
| **Kết quả** | Dashboard thống kê hiển thị đầy đủ với biểu đồ |

---

**UC06 – Xem thông tin sinh viên**

| Trường | Nội dung |
|---|---|
| **Actor** | Người dùng / Giảng viên |
| **Mô tả** | Xem trang thông tin cá nhân sinh viên tại route `/about` |
| **Tiền điều kiện** | Ứng dụng đang chạy |
| **Luồng chính** | 1. Người dùng nhấn **"About"** trên Navbar → 2. Điều hướng đến `/about` → 3. Hiển thị: Họ tên, MSSV, Lớp, Tech Stack |
| **Kết quả** | Trang thông tin sinh viên được hiển thị đầy đủ |

---

*Phần B: Minh chứng – xem mục tiếp theo*
