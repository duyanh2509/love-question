# Cai dat Firebase cho love-question

Ung dung da co san code luu vao Firestore trong:

- `src/firebase/config.js`
- `src/services/responseService.js`
- `src/pages/Admin.jsx`

Neu chua co file `.env`, app se luu tam vao `localStorage` de test UI. Muon luu that len Firebase thi lam cac buoc sau.

## 1. Tao Firebase project

1. Vao Firebase Console.
2. Tao project moi.
3. Tao Web App trong project.
4. Tao Firestore Database.
5. Chon region gan ban nhat.

Neu man hinh Firestore van hien nut `Create database` thi database chua duoc tao. App se chua the luu du lieu that va collection `responses` chua the xuat hien.

## 2. Tao file `.env`

Copy noi dung tu `.env.example` sang file `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_PASSCODE=mat_khau_admin_cua_ban
```

Sau khi sua `.env`, tat dev server va chay lai:

```bash
npm run dev
```

## 3. Firestore collection

App se tu tao collection:

```text
responses
```

Ban khong can tao collection thu cong. Collection `responses` chi xuat hien sau khi:

1. Cloud Firestore database da duoc tao.
2. Rules cho phep ghi vao `responses`.
3. Nguoi dung submit form thanh cong tu website.

Moi document co dang:

```js
{
  accepted: true,
  activities: ["Di an", "Di ca phe"],
  food: "Lau",
  message: "Loi nhan tuy chon",
  createdAt: serverTimestamp()
}
```

## 4. Firestore Rules MVP

Rules nay cho phep nguoi nhan submit cau tra loi, va cho phep trang admin doc danh sach. Day la ban MVP, tien loi nhung chua phai bao mat hoan chinh.

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /responses/{responseId} {
      allow create: if request.resource.data.accepted == true
        && request.resource.data.activities is list
        && request.resource.data.activities.size() > 0
        && request.resource.data.food is string
        && request.resource.data.food.size() > 0
        && request.resource.data.message is string
        && request.resource.data.createdAt == request.time;

      allow read: if true;
      allow update, delete: if false;
    }
  }
}
```

## 5. Xem ket qua

1. Mo `/`.
2. Bam `Co`.
3. Chon ke hoach va bam `Luu lua chon`.
4. Mo `/admin`.
5. Nhap passcode trong `VITE_ADMIN_PASSCODE`.

Neu `/admin` hien "Dang doc du lieu tu Firebase Firestore" la da noi Firebase thanh cong.

## 6. Bao mat phase sau

De bao mat that, nen them Firebase Authentication cho admin va sua rules thanh:

```js
allow read: if request.auth != null;
```

Khi do trang `/admin` can dang nhap Firebase thay vi passcode frontend.
