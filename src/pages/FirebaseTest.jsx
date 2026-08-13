import { useState } from 'react'
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config.js'

function FirebaseTest() {
  const [testResult, setTestResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const testFirebaseConfig = () => {
    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }

    let result = '=== FIREBASE CONFIG ===\n\n'
    result += `isFirebaseConfigured: ${isFirebaseConfigured}\n\n`

    Object.entries(config).forEach(([key, value]) => {
      if (value) {
        result += `✅ ${key}: ${value.substring(0, 20)}...\n`
      } else {
        result += `❌ ${key}: MISSING!\n`
      }
    })

    result += `\ndb object: ${db ? '✅ exists' : '❌ null'}\n`

    setTestResult(result)
  }

  const testWrite = async () => {
    setIsLoading(true)
    setTestResult('Testing write to Firestore...\n')

    try {
      if (!db) {
        setTestResult('❌ ERROR: db is null. Check Firebase config!')
        setIsLoading(false)
        return
      }

      const testData = {
        test: true,
        message: 'Test from FirebaseTest page',
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      }

      setTestResult((prev) => prev + '\n📝 Writing test document...\n')
      const docRef = await addDoc(collection(db, 'responses'), testData)

      setTestResult(
        (prev) => prev + `\n✅ SUCCESS! Document ID: ${docRef.id}\n\nCheck Firebase Console!`,
      )
    } catch (error) {
      setTestResult(
        (prev) =>
          prev +
          `\n❌ ERROR: ${error.message}\n\nCode: ${error.code}\n\nFull error: ${JSON.stringify(error, null, 2)}`,
      )
      console.error('Write test error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const testRead = async () => {
    setIsLoading(true)
    setTestResult('Testing read from Firestore...\n')

    try {
      if (!db) {
        setTestResult('❌ ERROR: db is null. Check Firebase config!')
        setIsLoading(false)
        return
      }

      setTestResult((prev) => prev + '\n📖 Reading responses collection...\n')
      const snapshot = await getDocs(collection(db, 'responses'))

      setTestResult(
        (prev) => prev + `\n✅ SUCCESS! Found ${snapshot.docs.length} documents\n\n`,
      )

      if (snapshot.docs.length === 0) {
        setTestResult((prev) => prev + 'Collection is empty. Try writing first!')
      } else {
        snapshot.docs.forEach((doc) => {
          setTestResult((prev) => prev + `\nDoc ID: ${doc.id}\n${JSON.stringify(doc.data(), null, 2)}\n`)
        })
      }
    } catch (error) {
      setTestResult(
        (prev) =>
          prev +
          `\n❌ ERROR: ${error.message}\n\nCode: ${error.code}\n\nFull error: ${JSON.stringify(error, null, 2)}`,
      )
      console.error('Read test error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="admin-shell fade-in">
        <header className="page-header">
          <p className="eyebrow">Debug Tool</p>
          <h1>Firebase Connection Test</h1>
        </header>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button className="button primary-button" onClick={testFirebaseConfig}>
            1. Check Config
          </button>
          <button
            className="button primary-button"
            onClick={testWrite}
            disabled={isLoading || !isFirebaseConfigured}
          >
            2. Test Write
          </button>
          <button
            className="button primary-button"
            onClick={testRead}
            disabled={isLoading || !isFirebaseConfigured}
          >
            3. Test Read
          </button>
        </div>

        {!isFirebaseConfigured ? (
          <p className="error-message">
            ❌ Firebase chưa được cấu hình đúng! Kiểm tra Environment Variables.
          </p>
        ) : null}

        <pre
          style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '20px',
            borderRadius: '8px',
            overflow: 'auto',
            maxHeight: '500px',
            fontSize: '13px',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {testResult || 'Click "Check Config" để bắt đầu test...'}
        </pre>

        <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
          <h3>📋 Hướng dẫn:</h3>
          <ol>
            <li>
              <strong>Check Config:</strong> Xem Firebase config có đủ không
            </li>
            <li>
              <strong>Test Write:</strong> Thử ghi 1 document vào Firestore
            </li>
            <li>
              <strong>Test Read:</strong> Đọc tất cả documents từ Firestore
            </li>
          </ol>
          <p style={{ marginTop: '10px', color: '#856404' }}>
            <strong>Nếu Test Write lỗi:</strong> Kiểm tra Firestore Rules trong Firebase Console!
          </p>
        </div>
      </section>
    </main>
  )
}

export default FirebaseTest
