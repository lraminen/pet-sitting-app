import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmpZqTldELHYBnY7pIFvIVMOfo6Qq6Ve0",
  authDomain: "pet-sitting-app-a1421.firebaseapp.com",
  projectId: "pet-sitting-app-a1421",
  storageBucket: "pet-sitting-app-a1421.appspot.com",
  messagingSenderId: "556335805947",
  appId: "1:556335805947:web:16912feaee39af34e7475e"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);
  export const auth = getAuth(app);