import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config.js'

const COLLECTION = 'responses'
const LOCAL_KEY = 'love-question-responses'

const readLocalResponses = () => {
  const raw = localStorage.getItem(LOCAL_KEY)
  return raw ? JSON.parse(raw) : []
}

const writeLocalResponses = (responses) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(responses))
}

export const saveResponse = async (payload) => {
  const response = {
    accepted: true,
    activities: payload.activities,
    food: payload.food,
    message: payload.message?.trim() || '',
  }

  if (isFirebaseConfigured) {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...response,
      createdAt: serverTimestamp(),
    })

    return {
      id: docRef.id,
      ...response,
      createdAt: new Date().toISOString(),
      storage: 'firebase',
    }
  }

  const saved = {
    id: crypto.randomUUID(),
    ...response,
    createdAt: new Date().toISOString(),
    storage: 'local',
  }

  writeLocalResponses([saved, ...readLocalResponses()])
  return saved
}

export const getFirebaseSetupErrorMessage = (error) => {
  const code = error?.code || ''

  if (code.includes('permission-denied')) {
    return 'Firebase đã kết nối nhưng Firestore Rules chưa cho phép ghi/đọc collection responses.'
  }

  if (
    code.includes('failed-precondition') ||
    code.includes('not-found') ||
    code.includes('unavailable')
  ) {
    return 'Firebase đã kết nối nhưng Cloud Firestore database chưa được tạo hoặc chưa sẵn sàng.'
  }

  return 'Chưa lưu/đọc được dữ liệu Firebase. Kiểm tra Cloud Firestore database và Rules.'
}

export const getResponses = async () => {
  if (isFirebaseConfigured) {
    const responseQuery = query(
      collection(db, COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(50),
    )
    const snapshot = await getDocs(responseQuery)

    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
        storage: 'firebase',
      }
    })
  }

  return readLocalResponses()
}

/**
 * Lắng nghe real-time updates từ Firestore
 * @param {Function} onUpdate - Callback nhận mảng responses mới khi có thay đổi
 * @param {Function} onError - Callback xử lý lỗi
 * @returns {Function} Unsubscribe function để dừng lắng nghe
 */
export const subscribeToResponses = (onUpdate, onError) => {
  if (!isFirebaseConfigured) {
    // Nếu không có Firebase, trả về responses từ localStorage và hàm unsubscribe rỗng
    onUpdate(readLocalResponses())
    return () => {}
  }

  const responseQuery = query(
    collection(db, COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(50),
  )

  const unsubscribe = onSnapshot(
    responseQuery,
    (snapshot) => {
      const responses = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
          storage: 'firebase',
        }
      })
      onUpdate(responses)
    },
    (error) => {
      console.error('Real-time listener error:', error)
      onError?.(error)
    },
  )

  return unsubscribe
}
