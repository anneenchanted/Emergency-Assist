let heartRate = 80;
let fallDetected = false;

// Simulate heart rate changes every 3 seconds
setInterval(() => {
  heartRate = Math.floor(Math.random() * (130 - 60) + 60);
  updateVitals();
}, 3000);

// Simulate fall detection (manual trigger)
function simulateFall(){
  fallDetected = true;
  updateVitals();
  triggerAutoSOS();
}

// Update vitals in Firebase
function updateVitals(){
  const user = auth.currentUser;
  if(!user) return;

  db.collection("vitals")
    .doc(user.uid)
    .set({
      heartRate: heartRate,
      fallDetected: fallDetected,
      time: new Date()
    });
  
  updateUI();
}

// Auto SOS when fall detected
function triggerAutoSOS(){
  navigator.geolocation.getCurrentPosition(pos => {
    db.collection("emergencies").add({
      user: auth.currentUser.uid,
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      time: new Date(),
      status: "ACTIVE",
      reason: "Fall detected by watch"
    });

    alert("🚨 Fall detected! Emergency alert sent automatically.");
  });
}

// Optional UI update (for demo)
function updateUI(){
  const hrEl = document.getElementById("heartRate");
  const fallEl = document.getElementById("fallStatus");

  if(hrEl) hrEl.innerText = heartRate + " bpm";
  if(fallEl) fallEl.innerText = fallDetected ? "YES" : "NO";
}