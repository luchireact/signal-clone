import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI_W8ZBvG8qHS8v-ncahhxowXDlcb8diw",
  authDomain: "signal-clone-7e3ca.firebaseapp.com",
  projectId: "signal-clone-7e3ca",
  storageBucket: "signal-clone-7e3ca.appspot.com",
  messagingSenderId: "87118936649",
  appId: "1:87118936649:web:a41cf633a4049c41dcdd98",
  measurementId: "G-5Y8EVCFE4X"
};

if (!app) {
  app = initializeApp(firebaseConfig);
  
}
let db = getFirestore(app);
let analytics = getAnalytics(app);
let app;
let auth = getAuth(app);



// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2024, 3, 10);
//     }
//   }
// }



// Export the initialized Firebase app and authentication instance
export { app, auth, db, analytics };



