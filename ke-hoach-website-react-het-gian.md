# Kế hoạch xây dựng website "Em hết giận chưa?" ❤️

## 1. Mục tiêu dự án

Xây dựng một website React đơn giản, có thể deploy lên Internet và truy cập bằng QR Code.

Luồng chính:

```text
QR Code
   ↓
Trang 1: Em có đồng ý hết giận không?
   ├── CÓ → Trang 2
   └── KHÔNG → Nút chạy sang vị trí khác
                    ↓
Trang 2: Chủ nhật muốn làm gì?
   ├── Chọn hoạt động
   ├── Chọn món ăn
   ├── Nhập lời nhắn (tùy chọn)
   └── Lưu
          ↓
Firebase Firestore
          ↓
Trang 3: Đã lưu ❤️

Bạn
 ↓
/admin
 ↓
Xem câu trả lời đã lưu
```

---

# 2. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Frontend | React |
| Build tool | Vite |
| Routing | React Router |
| CSS | CSS thuần |
| Database | Firebase Firestore |
| Authentication Admin | Firebase Authentication (có thể làm ở phase sau) |
| Deploy | Vercel |
| Source code | GitHub |
| QR Code | QR trỏ tới URL website |

Không cần Express/Node.js backend riêng cho phiên bản đầu.

---

# 3. Tạo project React

Mở Terminal tại thư mục muốn lưu project.

Chạy:

```bash
npm create vite@latest love-question -- --template react
```

Đi vào project:

```bash
cd love-question
```

Cài dependencies:

```bash
npm install
```

Cài React Router và Firebase:

```bash
npm install react-router-dom firebase
```

Chạy thử project:

```bash
npm run dev
```

Mở:

```text
http://localhost:5173
```

---

# 4. Tạo Git repository

Nếu muốn quản lý code bằng GitHub:

```bash
git init
git add .
git commit -m "Initial React project"
```

Sau đó tạo repository trên GitHub và kết nối:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git branch -M main
git push -u origin main
```

Thay `YOUR_GITHUB_REPOSITORY_URL` bằng URL repository của bạn.

---

# 5. Cấu trúc thư mục

Sau khi setup, chỉnh project thành:

```text
love-question/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── YesNoButtons.jsx
│   │   ├── ActivityOption.jsx
│   │   └── Loading.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SundayPlan.jsx
│   │   ├── Success.jsx
│   │   └── Admin.jsx
│   │
│   ├── firebase/
│   │   └── config.js
│   │
│   ├── services/
│   │   └── responseService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

# 6. Tạo React Router

Các route của website:

```text
/          → Home
/sunday    → SundayPlan
/success   → Success
/admin     → Admin
```

Flow:

```text
Home
 │
 ├── CÓ → /sunday
 │
 └── KHÔNG → random vị trí nút
                 │
                 └── vẫn ở Home

/sunday
 │
 └── LƯU → Firebase
              │
              ↓
           /success

/admin
 │
 └── đọc dữ liệu từ Firebase
```

---

# 7. Làm trang Home

File:

```text
src/pages/Home.jsx
```

Nội dung cần có:

```text
🥺

Em có đồng ý hết giận không?

[ CÓ ❤️ ]

[ KHÔNG 😭 ]
```

Yêu cầu:

- Nút CÓ chuyển sang `/sunday`.
- Nút KHÔNG không chuyển trang.
- Nút KHÔNG sẽ đổi vị trí mỗi lần bấm.
- Có animation khi nút di chuyển.
- Giao diện đẹp trên cả máy tính và điện thoại.

---

# 8. Làm chức năng nút KHÔNG chạy

Trong `Home.jsx`, sử dụng:

```javascript
useState()
```

để lưu vị trí nút.

Ví dụ logic:

```javascript
const [noPosition, setNoPosition] = useState({
  top: "60%",
  left: "60%"
});
```

Khi click:

```javascript
const handleNoClick = () => {
  const top = Math.floor(Math.random() * 60) + 20;
  const left = Math.floor(Math.random() * 60) + 20;

  setNoPosition({
    top: `${top}%`,
    left: `${left}%`
  });
};
```

CSS:

```css
.no-button {
  position: absolute;
  transition: all 0.3s ease;
}
```

Lưu ý: giới hạn vị trí để nút không chạy ra ngoài màn hình, đặc biệt trên điện thoại.

---

# 9. Làm trang SundayPlan

File:

```text
src/pages/SundayPlan.jsx
```

Tiêu đề:

```text
Chủ Nhật mình làm gì? ❤️
```

Danh sách hoạt động:

```text
☐ Đi ăn 🍜
☐ Đi cà phê ☕
☐ Đi xem phim 🎬
☐ Đi dạo 🌿
☐ Chơi game 🎮
☐ Đi mua sắm 🛍️
☐ Ở nhà 🏠
```

Cho phép chọn nhiều hoạt động.

State:

```javascript
const [activities, setActivities] = useState([]);
```

---

# 10. Thêm phần chọn món ăn

Ví dụ:

```text
Muốn ăn gì? 🍜

○ Lẩu
○ BBQ
○ Đồ Nhật
○ Đồ Hàn
○ Đồ Việt
○ Fast Food
○ Để em chọn
```

State:

```javascript
const [food, setFood] = useState("");
```

Chỉ chọn một món.

---

# 11. Thêm lời nhắn

Có thể thêm:

```text
Em muốn nói gì với anh không? ❤️

[                              ]
[                              ]
[                              ]
```

State:

```javascript
const [message, setMessage] = useState("");
```

Phần này có thể để tùy chọn.

---

# 12. Nút LƯU

Cuối trang:

```text
[ LƯU LỰA CHỌN ❤️ ]
```

Khi click:

1. Kiểm tra người dùng đã chọn hoạt động chưa.
2. Kiểm tra món ăn nếu yêu cầu bắt buộc.
3. Gửi dữ liệu lên Firebase.
4. Nếu thành công → `/success`.
5. Nếu lỗi → hiển thị thông báo.

Dữ liệu cần lưu:

```javascript
{
  accepted: true,
  activities: [
    "Đi ăn",
    "Đi cà phê",
    "Đi dạo"
  ],
  food: "Lẩu",
  message: "Mình đi nhé ❤️",
  createdAt: timestamp
}
```

---

# 13. Tạo Firebase

Vào Firebase Console và tạo một Firebase project.

Sau đó:

1. Tạo Web App.
2. Lấy Firebase configuration.
3. Tạo Firestore Database.
4. Cấu hình Security Rules.
5. Kết nối Firebase với React.

Tạo file:

```text
src/firebase/config.js
```

Không hard-code thông tin cấu hình trực tiếp trong component.

---

# 14. Tạo biến môi trường

Tạo file:

```text
.env
```

Ví dụ:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Không commit file `.env` chứa secret riêng tư lên GitHub.

Thêm vào `.gitignore`:

```text
.env
.env.local
```

Lưu ý: Firebase Web API key không phải là mật khẩu database. Bảo mật thực tế của Firestore phải được đảm bảo bằng Security Rules và Authentication.

---

# 15. Tạo Firebase service

File:

```text
src/services/responseService.js
```

Mục đích:

```text
Component
   ↓
responseService
   ↓
Firebase Firestore
```

Không nên viết toàn bộ code Firebase trực tiếp trong `SundayPlan.jsx`.

Service cần có các chức năng:

```text
saveResponse()
getResponses()
```

Sau này nếu cần có thể thêm:

```text
getLatestResponse()
deleteResponse()
```

---

# 16. Tạo trang Success

File:

```text
src/pages/Success.jsx
```

Sau khi lưu thành công:

```text
❤️ ❤️ ❤️

Đã lưu lựa chọn rồi!

Chủ Nhật mình:

🍜 Đi ăn
☕ Đi cà phê
🌿 Đi dạo

Món ăn:
🍲 Lẩu

Hẹn Chủ Nhật nhé ❤️
```

Có thể truyền dữ liệu từ state hoặc đọc lại response vừa lưu.

---

# 17. Tạo trang Admin

File:

```text
src/pages/Admin.jsx
```

Route:

```text
/admin
```

Trang này đọc dữ liệu từ Firestore.

Ví dụ:

```text
KẾT QUẢ ❤️

Hết giận:
CÓ ❤️

Chủ Nhật:

✓ Đi ăn
✓ Đi cà phê
✓ Đi dạo

Món ăn:
Lẩu

Lời nhắn:
"Mình đi nhé ❤️"

Thời gian:
13/08/2026 22:40
```

Nếu có nhiều response:

```text
Responses: 5

#1
13/08/2026
Lẩu

#2
14/08/2026
BBQ

#3
15/08/2026
Đồ Nhật
```

---

# 18. Bảo vệ trang Admin

Không nên để `/admin` cho bất kỳ ai cũng xem được.

Có thể làm 2 bước:

### Phiên bản MVP

Dùng một lớp login đơn giản.

### Phiên bản hoàn chỉnh

Dùng:

```text
Firebase Authentication
        ↓
Login Admin
        ↓
Firebase Security Rules
        ↓
Firestore
```

Admin mới có quyền đọc responses.

---

# 19. Thiết kế giao diện

Phong cách đề xuất:

```text
Phong cách:
- Tối giản
- Dễ thương
- Romantic
- Mobile-first
- Nền sáng
- Card bo góc
- Animation nhẹ
```

Màu sắc có thể sử dụng:

```text
Background: #fff5f7
Primary:     #ff4f7b
Secondary:   #ff8fab
Text:        #333333
Card:        #ffffff
```

Không cần quá nhiều animation.

Chỉ cần:

- Fade in.
- Button hover.
- Button KHÔNG di chuyển.
- Success animation.

---

# 20. Responsive

Website bắt buộc phải test:

```text
Desktop
1920 x 1080

Laptop
1366 x 768

Tablet

Mobile
390 x 844
```

Đặc biệt trang Home phải đảm bảo nút KHÔNG không chạy ra khỏi viewport.

---

# 21. Test chức năng

Trước khi deploy, kiểm tra:

### Home

```text
[ ] Trang mở bình thường
[ ] Nút CÓ hoạt động
[ ] Nút KHÔNG không chuyển trang
[ ] Nút KHÔNG đổi vị trí
[ ] Nút không chạy ra ngoài màn hình
[ ] Animation hoạt động
```

### SundayPlan

```text
[ ] Chọn được nhiều hoạt động
[ ] Bỏ chọn được hoạt động
[ ] Chọn được món ăn
[ ] Nhập được lời nhắn
[ ] Validate hoạt động
[ ] Nút Lưu hoạt động
```

### Firebase

```text
[ ] Response được lưu
[ ] createdAt được lưu
[ ] Không lỗi Firestore
[ ] Admin đọc được response
```

### Success

```text
[ ] Chuyển sang Success sau khi lưu
[ ] Hiển thị đúng lựa chọn
```

### Mobile

```text
[ ] Không bị tràn ngang
[ ] Nút không bị che
[ ] Checkbox dễ bấm
[ ] Text không bị vỡ
```

---

# 22. Chạy production build

Trước khi deploy:

```bash
npm run build
```

Nếu build thành công:

```text
dist/
```

được tạo ra.

Có thể test production build bằng:

```bash
npm run preview
```

---

# 23. Push lên GitHub

```bash
git add .
git commit -m "Complete love question website"
git push
```

---

# 24. Deploy Vercel

Vào Vercel:

1. Đăng nhập bằng GitHub.
2. Import repository.
3. Chọn project React.
4. Thêm các Environment Variables Firebase.
5. Deploy.
6. Lấy URL website.

Ví dụ:

```text
https://love-question.vercel.app
```

---

# 25. Tạo QR Code

QR Code phải trỏ tới URL production:

```text
https://love-question.vercel.app
```

Không dùng:

```text
http://localhost:5173
```

vì điện thoại bên ngoài máy tính sẽ không truy cập được localhost của máy bạn.

Flow cuối cùng:

```text
QR CODE
   ↓
https://love-question.vercel.app
   ↓
HOME
   ↓
CÓ ❤️
   ↓
SUNDAY PLAN
   ↓
LƯU
   ↓
FIREBASE
   ↓
SUCCESS
```

---

# 26. Thứ tự thực hiện thực tế

Làm đúng thứ tự này để tránh bị rối:

```text
PHASE 1 — PROJECT
[ ] Tạo React + Vite
[ ] npm install
[ ] Cài react-router-dom
[ ] Cài firebase
[ ] Tạo folder structure

PHASE 2 — HOME
[ ] Tạo Home.jsx
[ ] Tạo giao diện
[ ] Nút CÓ
[ ] Nút KHÔNG
[ ] Random vị trí nút KHÔNG
[ ] Animation
[ ] Responsive

PHASE 3 — SUNDAY PLAN
[ ] Tạo SundayPlan.jsx
[ ] Checkbox hoạt động
[ ] Chọn món ăn
[ ] Textarea lời nhắn
[ ] Nút Lưu
[ ] Validate

PHASE 4 — FIREBASE
[ ] Tạo Firebase project
[ ] Tạo Firestore
[ ] Tạo config.js
[ ] Tạo .env
[ ] Tạo responseService.js
[ ] Save response

PHASE 5 — SUCCESS
[ ] Tạo Success.jsx
[ ] Hiển thị lựa chọn
[ ] Animation

PHASE 6 — ADMIN
[ ] Tạo Admin.jsx
[ ] Đọc Firestore
[ ] Hiển thị response
[ ] Thêm login Admin
[ ] Security Rules

PHASE 7 — DEPLOY
[ ] npm run build
[ ] Test production
[ ] Push GitHub
[ ] Deploy Vercel
[ ] Thêm Environment Variables
[ ] Test trên điện thoại

PHASE 8 — QR
[ ] Tạo QR
[ ] Quét QR bằng điện thoại
[ ] Test toàn bộ flow
[ ] Hoàn thành ❤️
```

---

# 27. Phiên bản MVP cuối cùng

Sau khi hoàn thành, website sẽ có:

```text
                 QR ❤️
                   │
                   ▼
        ┌────────────────────┐
        │   EM HẾT GIẬN? 🥺  │
        │                    │
        │   [ CÓ ❤️ ]        │
        │                    │
        │   [ KHÔNG 😭 ]     │
        └─────────┬──────────┘
                  │
                 CÓ
                  │
                  ▼
        ┌────────────────────┐
        │ CHỦ NHẬT LÀM GÌ?   │
        │                    │
        │ ☑ Đi ăn            │
        │ ☑ Cà phê           │
        │ ☐ Xem phim         │
        │ ☑ Đi dạo           │
        │                    │
        │ Ăn gì?             │
        │ ○ Lẩu              │
        │ ○ BBQ               │
        │ ○ Đồ Nhật          │
        │                    │
        │ [ LƯU ❤️ ]         │
        └─────────┬──────────┘
                  │
                  ▼
              FIREBASE
                  │
                  ▼
        ┌────────────────────┐
        │   ĐÃ LƯU RỒI ❤️    │
        └────────────────────┘


                 BẠN
                  │
                  ▼
               /admin
                  │
                  ▼
          Xem câu trả lời
```

**Mục tiêu cuối cùng:** một project React nhỏ, dễ deploy, có database để lưu lựa chọn và có QR Code để người nhận chỉ cần quét là vào được website.
