import cors from "cors";
import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp } from "firebase/app";

cors({
  origin: [
    "http://localhost:5500",
    "https://us-central1-classmanager-b66fa.cloudfunctions.net/enrollmentComplete",
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

// sendSolapiRequest
const testData = {
  to: "01045773013",
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

// enrollmentComplete
const testData2 = {
  to: "01045773013",
  disableSms: true,
  from: "01024405830",
  studioName: "Bunt",
  studioAddress: "경상북도 포항시 남구 지곡로 83 포스빌 6동 306호",
  instructorName: "공태현",
  genre: "팝핀",
  time: "12/10 13:30",
  payment: "현장 카드",
};

// enrollmentCompleteAccountNumber
const testData3 = {
  to: "01045773013",
  disableSms: true,
  from: "01024405830",
  studioName: "Bunt",
  studioAddress: "경상북도 포항시 남구 지곡로 83 포스빌 6동 306호",
  instructorName: "공태현",
  genre: "팝핀",
  time: "12/10 13:30",
  studioAccountNumber: "신한은행 110-394-175758 장성훈",
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
