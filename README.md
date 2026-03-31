# TodoApp – Kanban Task Manager

> Đồ án thực hành học phần **DevOps** – Quản lý công việc theo phong cách Kanban

**Sinh viên:** Đồng Thanh Huyền &nbsp;|&nbsp; **MSSV:** 2251220032 &nbsp;|&nbsp; **Lớp:** 22CT1

---

## Tính năng

- **Kanban Board** – Quản lý task theo 3 cột: To Do / In Progress / Done
- **Drag & Drop** – Kéo thả task giữa các cột (task Done bị khóa)
- **Priority** – Phân loại mức độ ưu tiên: Low / Medium / High
- **Pomodoro Timer** – Đếm ngược 15/25/50 phút gắn với từng task
- **Gamification** – Hệ thống Level + EXP + Streak
- **Analytics** – Biểu đồ thống kê theo Priority và Status
- **Dark / Light Mode** – Chuyển đổi giao diện, lưu vào localStorage
- **Trang /about** – Thông tin sinh viên
- **Endpoint /health** – Kiểm tra trạng thái server

---

## Tech Stack

| Layer | Công nghệ |
|:---|:---|
| Backend | Node.js, Express.js |
| Frontend | React, Vite, TailwindCSS |
| Database | MongoDB Atlas (cloud) |
| DevOps | Docker, Docker Compose, Docker Hub |
| Version Control | Git, GitHub |

---

## API Endpoints

| Method | Endpoint | Mô tả |
|:---|:---|:---|
| GET | `/health` | Health check – trả về `{ "status": "ok" }` |
| GET | `/api/todos` | Lấy danh sách task |
| POST | `/api/todos` | Tạo task mới |
| PATCH | `/api/todos/:id` | Cập nhật trạng thái task |
| DELETE | `/api/todos/:id` | Xóa task |
| GET | `/api/stats` | Lấy thống kê (EXP, Level, Streak) |
| POST | `/api/stats/exp` | Cộng EXP sau phiên Pomodoro |

---

## Chạy Local (Development)

### 1. Backend

```bash
cd backend
cp .env.example .env   # Điền DB_URL từ MongoDB Atlas
npm install
npm run dev
# → http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## Chạy bằng Docker Compose

```bash
docker-compose up --build
```

| Service | URL |
|:---|:---|
| Frontend | http://localhost |
| Backend | http://localhost:5000 |
| Health Check | http://localhost:5000/health |

---

## Docker Hub

| Image | Link |
|:---|:---|
| Backend | `docker pull dthuyen1/todoapp-backend:latest` |
| Frontend | `docker pull dthuyen1/todoapp-frontend:latest` |

---

## Cấu trúc Project

```
DevOps_Project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── validators/
│   │   ├── models/
│   │   └── app.js
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Branches

| Branch | Mục đích |
|:---|:---|
| `main` | Nhánh chính, code ổn định |
| `develop` | Tích hợp các tính năng |
| `feature/backend` | Phát triển backend |
| `feature/frontend` | Phát triển frontend |
| `feature/darkmode` | Tính năng dark mode |
