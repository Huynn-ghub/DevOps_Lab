# Frontend – TodoApp

React + Vite + TailwindCSS – Kanban Task Manager UI.

## Cài đặt & chạy

```bash
npm install
npm run dev   # http://localhost:5173
```

## Biến môi trường (.env)

```
VITE_API_URL=http://localhost:5000/api
```

## Trang

| Route | Mô tả |
|:---|:---|
| `/` | Kanban Board (Drag & Drop, Pomodoro, Gamification) |
| `/analytics` | Biểu đồ thống kê theo Priority và Status |
| `/about` | Thông tin sinh viên |

## Cấu trúc

```
src/
├── api/           # Gọi API backend
├── components/    # Navbar
├── pages/         # Home, Analytics, About
├── App.jsx        # Router + Dark mode
└── main.jsx
```

## Build production

```bash
npm run build   # Output: dist/
```
