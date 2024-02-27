const contactForm = document.getElementById("contact-form");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userMessage = document.getElementById("user-message");
let messages = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("messages")) {
    messages = JSON.parse(localStorage.getItem("messages"));
    console.log(localStorage.getItem("messages"));
    console.log(messages.length);
    console.log("Yo");
  } else {
    messages = [];
    console.log(messages);
  }
});

function showSuccessMessage() {
  let successDiv = document.getElementsByClassName("success");

  setTimeout(function () {
    successDiv[0].style.display = "block";
    userEmail.value = "";
    userMessage.value = "";
    userName.value = "";
  }, 1000);
  setTimeout(function () {
    successDiv[0].style.display = "none";
    window.location = "./index.html#about";
  }, 3500);
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userNameValue = userName.value.trim();
  let userEmailValue = userEmail.value.trim();
  let userMessageValue = userMessage.value.trim();

  const userData = {
    userNameValue,
    userEmailValue,
    userMessageValue,
    timeStamp: Date.now(),
  };

  messages.push(userData);
  localStorage.setItem("messages", JSON.stringify(messages));
  showSuccessMessage();
});
