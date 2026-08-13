# Debug Real-time Sync Issue

## Các bước kiểm tra

### 1. Kiểm tra Firebase Console

Mở DevTools (F12) trên cả 2 trang (user và admin), xem Console log.

**Khi user submit:**
```
🔥 Saving response: {accepted: true, food: "...", ...}
🔥 Firebase configured: true
🔥 Using Firebase to save...
✅ Saved to Firebase with ID: abc123
```

**Trên trang admin:**
```
🔥 Admin: Setting up real-time listener
🔥 Setting up real-time listener...
🔥 Firebase configured: true
🔥 Starting Firestore onSnapshot listener...
🔥 Received snapshot with X documents
✅ Updated responses: [...]
🔥 Admin: Received X responses
```

### 2. Kiểm tra Firestore Rules

Vào Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /responses/{document} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false;
    }
  }
}
```

**Quan trọng:** Nhấn nút **Publish** sau khi sửa rules!

### 3. Kiểm tra Environment Variables trên Vercel

Vào Vercel > Settings > Environment Variables, đảm bảo có đủ:

- ✅ `VITE_FIREBASE_API_KEY`
- ✅ `VITE_FIREBASE_AUTH_DOMAIN`
- ✅ `VITE_FIREBASE_PROJECT_ID`
- ✅ `VITE_FIREBASE_STORAGE_BUCKET`
- ✅ `VITE_FIREBASE_MESSAGING_SENDER_ID`
- ✅ `VITE_FIREBASE_APP_ID`
- ✅ `VITE_ADMIN_PASSCODE`

**Sau khi thêm/sửa variables, phải Redeploy!**

### 4. Kiểm tra Firestore Database đã tạo chưa

Firebase Console > Build > Firestore Database

- Nếu thấy "Create database", click vào tạo
- Chọn location gần (asia-southeast1)
- Chọn "Start in production mode" hoặc "test mode"

### 5. Test thủ công trên Firestore

1. Vào Firestore Database > Data
2. Tạo collection `responses` thủ công
3. Add document với fields:
   - `accepted`: true
   - `food`: "Test food"
   - `message`: "Test message"
   - `activities`: ["Test"]
   - `createdAt`: timestamp (now)
4. Xem trang admin có hiện không?

### 6. Kiểm tra Network Tab

Mở DevTools > Network:

**Khi user submit:**
- Phải thấy request POST đến `firestore.googleapis.com`
- Status 200

**Trên trang admin:**
- Phải thấy WebSocket connection hoặc long-polling đến Firestore
- Type: `websocket` hoặc `xhr`

## Common Issues

### Issue 1: "Firebase not configured" = true
**Nguyên nhân:** Environment variables chưa đúng trên Vercel

**Fix:**
1. Kiểm tra lại tất cả `VITE_*` variables
2. Redeploy sau khi thêm
3. Hard refresh browser (Ctrl+Shift+R)

### Issue 2: "Permission denied"
**Nguyên nhân:** Firestore Rules chưa cho phép read/write

**Fix:**
```javascript
allow read: if true;   // Phải có dòng này!
allow create: if true; // Phải có dòng này!
```
Nhớ nhấn Publish!

### Issue 3: Listener không trigger
**Nguyên nhân:** 
- Có thể bị cache
- Hoặc listener chưa setup đúng

**Fix:**
1. Hard refresh (Ctrl+Shift+R)
2. Xem Console có log "🔥 Starting Firestore onSnapshot listener..." không
3. Nếu không có, check lại code Admin.jsx

### Issue 4: Data lưu localStorage thay vì Firebase
**Nguyên nhân:** `isFirebaseConfigured` = false

**Fix:**
- Check `.env` hoặc Vercel environment variables
- Đảm bảo tất cả variables có giá trị, không undefined

## Test Real-time Locally

```bash
# Tạo file .env với Firebase config đầy đủ
npm run dev

# Tab 1: http://localhost:5173/admin
# Tab 2: http://localhost:5173/question

# Submit ở tab 2, xem Console cả 2 tabs
```

Nếu local hoạt động nhưng production không:
→ Environment variables trên Vercel chưa đúng!

## Liên hệ Debug

Nếu vẫn không hoạt động, gửi cho tôi:
1. Screenshot Console log (cả user và admin page)
2. Screenshot Firestore Rules
3. Screenshot Vercel Environment Variables (che mất giá trị nhạy cảm)
