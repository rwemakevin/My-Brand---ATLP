const signupForm = document.getElementById("signup");
const fullName = document.getElementById("full-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
let users = [];

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    id: Date.now(),
    createdAt: Date.now(),
    name: fullName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  console.log(user);
  saveUsers(user);
  //   alert("You have succesfully registered");
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  console.log(users);
});

const saveUsers = (user) => {
  users.push(user);
  resetInputs();
  localStorage.setItem("users", JSON.stringify(users));
};

const resetInputs = () => {
  fullName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  signupSuccess();
};

const signupSuccessDiv = document.getElementById("signup-success");

const signupSuccess = () => {
  signupSuccessDiv.style.display = "block";
  signupSuccessDiv.style.border = "1px solid green";
  signupSuccessDiv.style.textAlign = "center";
  signupSuccessDiv.style.padding = "10px";
  signupSuccessDiv.style.fontFamily = "Montserrat";
  signupSuccessDiv.style.borderRadius = "10px";
  signupSuccessDiv.innerHTML = "Signup successfully";
  setTimeout(function () {
    window.location = "./login.html";
  }, 3000);
};
