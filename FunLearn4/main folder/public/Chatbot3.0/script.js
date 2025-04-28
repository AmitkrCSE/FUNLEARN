const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");

const API_KEY = "AIzaSyBmpih2FUKp2G9vdHjcQs1JIo5SJyDoO90";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const userData = {
    message: null,
    file: {
      data:null,
      mime_type:null
    }
}

const initialInputHeight = messageInput.scrollHeight;

//Create message element with dynamic classes and return it
const createMessageElement = (content, classes) => {
    const div = document.createElement("div");
    div.classList.add("message", classes);
    div.innerHTML = content;
    return div;
}

//Generate bot response usin API
const generateBotResponse = async(incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");

  //API request options
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({
      contents:[{
        parts:[{text: userData.message}, ...(userData.file.data ? [{ inline_data: userData.file }] : [])]
      
      }]    
    })
  }

  try{
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if(!response.ok) throw new Error(data.error.message);

    const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    messageElement.innerText = apiResponseText;
  } catch (error) {
    console.log(error);
    messageElement.innerText = error.message;
    messageElement.style.color = "#ff0000";
  } finally{
    userData.file = {};
    incomingMessageDiv.classList.remove("thinking");
    chatBody.scrollTo({ top:chatBody.scrollHeight, behavior: "smooth"});
  }
}

//Handle outgoing user message
const handleOutgoinMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = "";
    messageInput.dispatchEvent(new Event("input"));

    //Create and display user message
    const messageContent = `<div class="message-text"></div>`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top:chatBody.scrollHeight, behavior: "smooth"});

    //Simulate bot response with thinking indicator after a delay
    setTimeout(() =>{
        const messageContent = `<img class="bot-zira" src="Images/robot.avif" alt="" width="50" height="50">
          <div class="message-text">
            <div class="thinking-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>`;
    
    const incomingMessageDiv = createMessageElement(messageContent, "bot-message","thinking");
    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTo({ top:chatBody.scrollHeight, behavior: "smooth"});
    generateBotResponse(incomingMessageDiv);
    }, 600);
}

//Handel Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim(); 
    if(e.key === "Enter" && userMessage && !e.shiftkey && window.innerWidth > 768) {
      handleOutgoinMessage(e);
    }
});
messageInput.addEventListener("input", () => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

sendMessageButton.addEventListener("click",(e) => handleOutgoinMessage(e));
