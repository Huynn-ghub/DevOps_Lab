# **DEVOPS MINI PROJECT**

1. ## **MỤC TIÊU**

Làm việc với project thực tế từ GitHub

Áp dụng DevOps cơ bản: Git, Environment Variables, Docker, Docker Compose

Triển khai hệ thống gồm Backend \+ Frontend \+ Database

2. ## **YÊU CẦU**

Làm cá nhân (mỗi sinh viên 1 bài)

1. ### **Tạo project** 

Cách 1:

Clone từ GitHub:

Repo public

Có Backend \+ Frontend \+ Database

Cách 2:

Tự tạo trên Local, phải có tối thiểu:

Backend:

≥ 2 API (GET \+ POST/PUT)

Frontend:

hiển thị dữ liệu từ backend

có tương tác (form/button)

Database:

lưu trữ dữ liệu thực (bắt buộc)

2. ### **Git** 

2.1. Tạo repository riêng

2.2. Có commit history:

≥ 5 commit

message rõ ràng

2.3. Có ít nhất 3 branch (main/master, develop, feature)

3. ### **Tính năng ứng dụng**

*3.1 Trang thông tin cá nhân*

Route: /about hoặc tương đương

Hiển thị:

Họ tên sinh viên

Mã số sinh viên

Lớp

Cần ảnh chụp màn hình trang này khi app đang chạy

*3.2 Health Check*

Endpoint: /health

Trả về:

*{ "status": "ok" }*

*3.3 Environment Variables*

Phải sử dụng .env:

PORT

DB\_HOST / DB\_URL

APP\_NAME

4. ### **Database**

Ứng dụng sử dụng database:

MySQL / PostgreSQL / MongoDB / ...

Không được dùng dữ liệu hard-code

5. ### **Docker**

Phải có Dockerfile cho:

Backend

Frontend

Database chạy container riêng

---

6. ### **Docker Compose**

Phải có file docker-compose.yml

Yêu cầu:

Chạy được toàn bộ hệ thống:

Backend

Frontend

Database

---

7. ### **Docker Hub**

Build image:

Backend

Frontend

Push lên Docker Hub

3. ## **SẢN PHẨM NỘP**

   1. ### **File tài liệu (.pdf hoặc .docx):**

      1. #### ***Cấu trúc file tài liệu***

Phần A: Thông tin chung

- Thông tin sinh viên  
- Giới thiệu ứng dụng (mục đích, người dùng, phạm vi)  
- Tính năng  
- Use cases

Phần B: Minh chứng

- Link repository GitHub  
- Link Docker Hub  
- Ảnh chụp:  
* Ảnh VSCode thể hiện lịch sử  
* Ảnh github.com hiển thị danh sách các branch  
* Ảnh Docker đã cài đặt xong các ứng dụng  
* Trang /about  
* Endpoint /health hoạt động

  2. #### ***CheckList***

Có commit history

Có BE \+ FE \+ DB

Có /about (có thông tin sinh viên)

Có /health

Có .env và .env.example

Có Dockerfile

Có docker-compose

Push Docker Hub