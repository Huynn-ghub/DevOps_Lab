# TodoApp – DevOps Mini Project

Ứng dụng quản lý công việc (Todo App) xây dựng với Node.js, React và MongoDB.

**Sinh viên:** Đồng Thanh Huyền | **MSSV:** 2251220032 | **Lớp:** 22CT1

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Frontend | React, Vite, TailwindCSS |
| Database | MongoDB Atlas |
| DevOps | Docker, Docker Compose |

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/health` | Health check |
| GET | `/api/tasks` | Lấy danh sách task |
| POST | `/api/tasks` | Tạo task mới |
| PUT | `/api/tasks/:id/toggle` | Toggle hoàn thành |
| PUT | `/api/tasks/:id` | Cập nhật task |
| DELETE | `/api/tasks/:id` | Xóa task |

## Chạy local (Development)

### Backend

```bash
cd backend
cp .env.example .env   # Điền DB_URL từ MongoDB Atlas
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Chạy bằng Docker Compose

```bash
# Tạo file .env ở root với DB_URL và APP_NAME
docker-compose up --build
```

- Frontend: http://localhost
- Backend: http://localhost:5000
- Health: http://localhost:5000/health

## Cấu trúc project

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
