
document.addEventListener("DOMContentLoaded", () => {
const signupForm = document.getElementById("signupForm");
const fullName = document.getElementById("names");
const Email = document.getElementById("email");
const Password = document.getElementById("password");
const verifyPassword = document.getElementById("confirmPassword")

const setError = (element, message) => {

}

const setSuccess = (element) => {
  const field = element.parentElement
  console.log(field)
}




signupForm.addEventListener("submit", (e) => {
  e.preventDefault()
  setSuccess(Password)

});


});




const signupSuccessDiv = document.getElementById("signup-success");

// const signupSuccess = () => {
//   signupSuccessDiv.style.display = "block";
//   signupSuccessDiv.style.border = "1px solid green";
//   signupSuccessDiv.style.textAlign = "center";
//   signupSuccessDiv.style.padding = "10px";
//   signupSuccessDiv.style.fontFamily = "Montserrat";
//   signupSuccessDiv.style.borderRadius = "10px";
//   signupSuccessDiv.innerHTML = "Signup successfully";
//   setTimeout(function () {
//     window.location = "./login.html";
//   }, 3000);
// };
