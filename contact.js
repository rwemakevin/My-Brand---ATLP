const contactForm = document.getElementById("contact-form");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userMessage = document.getElementById("user-message");
let messages = [];
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userNameValue = userName.value.trim();
  let userEmailValue = userEmail.value.trim();
  let userMessageValue = userMessage.value.trim();

  const userData = {
    userNameValue,
    userEmailValue,
    userMessageValue,
  };

  console.log(userData);
});

document.addEventListener("DOMContentLoaded", () => {});
