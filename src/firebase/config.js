import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Vite chỉ expose biến có prefix VITE_, nên phải thêm prefix vào Vercel
// Hoặc dùng window để access biến từ build-time
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)

let app = null
let db = null

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    // Sử dụng (default) database
    db = getFirestore(app, '(default)')
    console.log('✅ Firebase initialized successfully')
    console.log('📦 Project ID:', firebaseConfig.projectId)
    console.log('🔥 Firestore instance:', db ? 'Connected' : 'Failed')
  } catch (error) {
    console.error('❌ Firebase initialization error:', error)
    app = null
    db = null
  }
}

export { app, db }
