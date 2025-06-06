import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Hier Ihre Firebase-Konfiguration einfügen
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveProfile = async (profile) => {
  try {
    const profileRef = doc(db, 'profiles', profile.uniqueId);
    await setDoc(profileRef, profile);
    return true;
  } catch (error) {
    console.error('Fehler beim Speichern des Profils:', error);
    return false;
  }
};

export const getProfile = async (uniqueId) => {
  try {
    const profileRef = doc(db, 'profiles', uniqueId);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
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