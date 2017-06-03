import firebase from 'firebase'
import firebaseConfig from '../firebase.json'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.database()

export default db
