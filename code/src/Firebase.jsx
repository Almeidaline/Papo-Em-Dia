import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA0JKXTqsuDNOaFXbJHQyyIfWGYwFk012Y',
  authDomain: 'papo-em-dia-ab454.firebaseapp.com',
  projectId: 'papo-em-dia-ab454',
  storageBucket: 'papo-em-dia-ab454.appspot.com',
  messagingSenderId: '594945442777',
  appId: '1:594945442777:web:3b0daaeae527c9db734fc8',
  measurementId: 'G-YJX5C6HE5Y'
}

export const app = initializeApp (firebaseConfig)
export const analytics = getAnalytics (app)
export const auth = getAuth ()
export const storage = getStorage ()
export const db = getFirestore ()
