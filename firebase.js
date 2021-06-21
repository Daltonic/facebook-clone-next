import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import { firebaseConfig } from './app.config'

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore()
const storage = app.storage()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export { db, auth, storage, provider, timestamp }
