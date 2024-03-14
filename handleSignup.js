
document.addEventListener("DOMContentLoaded", () => {
const signupForm = document.getElementById("signupForm");
const fullName = document.getElementById("names");
const email = document.getElementById("email");
const password = document.getElementById("password");
const verifyPassword = document.getElementById("confirmPassword")
let obj = {
  name : null,
  email: null,
  password: null,
  confirmPassword: null,
}

const setError = (element, message) => {
  const field = element.parentElement
  const errorField = field.querySelector(".error");
  errorField.innerHTML = message
  errorField.style.marginTop = "5px"
  field.classList.add("error")
  field.classList.remove("success")
 

}

const setSuccess = (element) => {
  const field = element.parentElement;
  const errorField = field.querySelector('.error');
  errorField.innerText = "";
  field.classList.remove("error");
  field.classList.add("success");

  
}

// password validator helper function
const isValidPassword = (arg) => {
  const regExp = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
  return regExp.test(arg)
}

//email validator helper function
const isValidEmail = arg => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regExp.test(arg)
}

const checkTruthy = (arg) => {
  for(let key in arg){
    if(!arg[key]){
      return false;
    }
  }

  return true;
}




signupForm.addEventListener("submit", (e) => {

  e.preventDefault()
  validateInputs()
  if(checkTruthy(obj) === true){
    alert("We are good to go!")
  }
 
  

  

});

const validateInputs = () => {
  let fullnameText = fullName.value.trim()
  let emailText = email.value.trim()
  let passwordText = password.value.trim()
  let verifyPasswordText = verifyPassword.value.trim()


  //validate fullname
if(fullnameText === ""){
  setError(fullName,"Please enter your fullnames")
  obj.name = false;
}else if(fullnameText.length < 3 || fullnameText.length > 50){
  setError(fullName," failed: Min allowed character 3 to 50")
  obj.name = false
}else{
  setSuccess(fullName)
  obj.name = true
}

//validate Email
if(emailText === ""){
setError(email,"Please Provide an email")
obj.email = false;
}else if(isValidEmail(emailText) == false){
  setError(email,"Please use a valid email")
  obj.email = false;
}else{
  setSuccess(email)
  obj.email = true;
}

//validate password
if(passwordText ===""){
  setError(password,"Please choose your password")
  obj.password = false
}else if(isValidPassword(passwordText) == false){
  setError(password,`<ul class="password-error">
  <li>Minimum password length is 6</li>
  <li>with at least one number</li>
  <li>one uppercase letter</li>
  <li>and one special characte</li>
</ul>`)
obj.password = false
}else{
  setSuccess(password)
  obj.password = true
}

//validate verify Password
if(verifyPasswordText == ""){
  setError(verifyPassword,"Please choose your password")
  obj.confirmPassword = false
}else if(passwordText !== verifyPasswordText){
  setError(verifyPassword,"password mismatch")
  obj.confirmPassword = false
}else{
  setSuccess(verifyPassword)
  obj.confirmPassword = true
}

}

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
