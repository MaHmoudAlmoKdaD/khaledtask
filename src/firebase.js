import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDckVdMCy-RVGz97NViB1KsdzNUFIqcVHY",
    authDomain: "task1-6bd86.firebaseapp.com",
    projectId: "task1-6bd86",
    storageBucket: "task1-6bd86.appspot.com",
    messagingSenderId: "521682366676",
    appId: "1:521682366676:web:c90ff3605e562ba6ddcb41"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);