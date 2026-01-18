const chatBox = document.getElementById("chatBox");

// Initial AI greeting
addMessage("AI", "Hello 👋 I’m your AI First Aid Assistant. Please describe your symptoms. ⚠️ I provide general guidance only.");

function sendMessage(){
  const input = document.getElementById("userInput");
  const message = input.value.trim().toLowerCase();
  if(!message) return;

  addMessage("You", message);
  input.value = "";

  setTimeout(()=>{
    addMessage("AI", getResponse(message));
  }, 700);
}

function addMessage(sender, text){
  const div = document.createElement("div");
  div.className = sender === "You" ? "user-msg" : "ai-msg";
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getResponse(msg){

  if(msg.includes("chest pain")){
    return "⚠️ Chest pain can be life-threatening.\nSit down, rest, and CALL EMERGENCY SERVICES IMMEDIATELY.";
  }

  if(msg.includes("bleeding")){
    return "Apply firm pressure using a clean cloth. If bleeding continues or is heavy, seek emergency medical help.";
  }

  if(msg.includes("burn")){
    return "Cool the burn under running water for at least 10 minutes. Do NOT apply ice or butter. Seek help if severe.";
  }

  if(msg.includes("fever")){
    return "Rest, drink fluids, and monitor temperature. Seek medical advice if fever lasts more than 2 days or is very high.";
  }

  if(msg.includes("difficulty breathing") || msg.includes("shortness of breath")){
    return "🚨 Difficulty breathing is an emergency. CALL EMERGENCY SERVICES NOW.";
  }

  if(msg.includes("headache")){
    return "Rest in a quiet place and drink water. Seek medical help if headache is severe or sudden.";
  }

  return "I can only give general first aid guidance. If symptoms worsen or feel serious, please contact a medical professional or emergency services.";
}