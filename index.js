import cors from "cors";
import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp } from "firebase/app";

cors({
  origin: [
    "http://localhost:5500",
    "https://us-central1-classmanager-b66fa.cloudfunctions.net/sendMessage",
  ],
  credentials: true,
});

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase and Firebase Authentication

const testData = {
  to: "01050946369",
  disableSms: true,
  from: "01024405830",
  studioName: "Bunt",
  studentName: "레이븐",
  instructorName: "공태현",
  genre: "팝핀",
  time: "12/10 13:30",
  suspended: "코로나",
  studioPhoneNumber: "025094234",
};

try {
  const functions = getFunctions(app);
  const sendSolapiRequest = httpsCallable(functions, "sendSolapiRequest");
  sendSolapiRequest(testData)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
} catch (error) {
  console.error(error);
}
