import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase config - hardcoded để deploy dễ dàng
const firebaseConfig = {
  apiKey: 'AIzaSyBkI57xYFxdeiwG8o7n5WzwOR-D3X_OoKY',
  authDomain: 'love-c7574.firebaseapp.com',
  projectId: 'love-c7574',
  storageBucket: 'love-c7574.firebasestorage.app',
  messagingSenderId: '285587532601',
  appId: '1:285587532601:web:ac9b5337a8581f41d756e8',
  measurementId: 'G-0GVLV03YF7',
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)

let app = null
let db = null

try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  console.log('✅ Firebase initialized successfully')
  console.log('📦 Project ID:', firebaseConfig.projectId)
  console.log('🔥 Firestore instance:', db ? 'Connected' : 'Failed')
} catch (error) {
  console.error('❌ Firebase initialization error:', error)
  app = null
  db = null
}

export { app, db }
