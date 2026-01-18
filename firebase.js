// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyALmKTZrmeL3RC6M5DUEZVbYHTscMlk2Bo",
  authDomain: "mobileapps-c644c.firebaseapp.com",
  projectId: "mobileapps-c644c",
  storageBucket: "mobileapps-c644c.appspot.com",
  messagingSenderId: "105249888360",
  appId: "1:105249888360:web:aba9b2e04c9097788103dd"
};

// ================= INITIALIZE FIREBASE =================
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// ================= SERVICES (GLOBAL) =================
window.auth    = firebase.auth();
window.db      = firebase.firestore();
window.storage = firebase.storage(); // ✅ ITO ANG KULANG (UPLOAD FIX)

// ================= CREATE / UPDATE PATIENT PROFILE =================
window.createPatientProfile = function (user, extraData = {}) {
  return db.collection("users").doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    role: "patient",
    fullName: extraData.fullName || "Patient",
    photoURL: extraData.photoURL || "",
    watchConnected: true,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
};

// ================= REQUIRE AUTH (PAGE PROTECT) =================
window.requireAuth = function (redirect = "index.html") {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.replace(redirect);
    }
  });
};

// ================= SAVE VITALS (WATCH / SIMULATION) =================
window.saveVitals = function (uid, heartRate, fallDetected) {
  return db.collection("vitals").add({
    uid: uid,
    heartRate: heartRate,
    fallDetected: fallDetected,
    time: firebase.firestore.FieldValue.serverTimestamp()
  });
};

// ================= SEND SOS =================
window.sendSOS = function (uid, lat, lng, heartRate, fallDetected) {
  return db.collection("emergencies").add({
    uid: uid,
    lat: lat,
    lng: lng,
    heartRate: heartRate,
    fallDetected: fallDetected,
    status: "ACTIVE",
    time: firebase.firestore.FieldValue.serverTimestamp()
  });
};