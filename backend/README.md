# Backend – TodoApp

Node.js + Express REST API với MongoDB Atlas.

## Cài đặt & chạy

```bash
cp .env.example .env   # Điền DB_URL
npm install
npm run dev            # http://localhost:5000
```

## Biến môi trường (.env)

```
PORT=5000
DB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/tododb
APP_NAME=TodoApp
```

## API Endpoints

| Method | Endpoint | Mô tả |
|:---|:---|:---|
| GET | `/health` | Health check |
| GET | `/api/todos` | Lấy tất cả task |
| POST | `/api/todos` | Tạo task mới |
| PATCH | `/api/todos/:id` | Cập nhật trạng thái |
| DELETE | `/api/todos/:id` | Xóa task |
| GET | `/api/stats` | Lấy thống kê |
| POST | `/api/stats/exp` | Cộng EXP |

## Cấu trúc

```
src/
├── controllers/
├── services/
├── repositories/
├── routes/
├── models/
├── middlewares/
├── validators/
└── app.js
```
