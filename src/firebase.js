import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD8hdcKnDcK_JU9e_mwDCTQEfjiwIa_tAs',
  authDomain: 'blog-6893.firebaseapp.com',
  projectId: 'blog-6893',
  storageBucket: 'blog-6893.appspot.com',
  messagingSenderId: '762731237488',
  appId: '1:762731237488:web:186a51b1d9a88f015f24b5',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
