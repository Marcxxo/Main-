import firebase from 'firebase/app';
import 'firebase/firestore'; // Importiere das Firestore-Modul für Side Effects

const firebaseConfig = {
  // Hier Ihre Firebase-Konfiguration einfügen
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Greife auf Firestore über das initialisierte App-Objekt zu

export const saveProfile = async (profile) => {
  try {
    const profileRef = db.collection('profiles').doc(profile.uniqueId);
    await profileRef.set(profile);
    return true;
  } catch (error) {
    console.error('Fehler beim Speichern des Profils:', error);
    return false;
  }
};

export const getProfile = async (uniqueId) => {
  try {
    const profileRef = db.collection('profiles').doc(uniqueId);
    const profileSnap = await profileRef.get();
    
    if (profileSnap.exists) {
      return profileSnap.data();
    } else {
      console.log('Kein Profil gefunden');
      return null;
    }
  } catch (error) {
    console.error('Fehler beim Laden des Profils:', error);
    return null;
  }
}; 