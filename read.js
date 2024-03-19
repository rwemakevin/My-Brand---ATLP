//Login Modal
const loginModal = document.getElementById("login-modal");
const loginForm = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signupSuccessDiv = document.getElementById("signup-success");
let token;
let user;
let id;

// for Blog and comments
let submitComment = document.getElementById("submit-comment-form");
let userComment = document.getElementById("comment");
console.log(userComment);
userComment.disabled = true;
let urlParams = new URLSearchParams(window.location.search);
let idFromUrl = urlParams.get("id");
let date = document.getElementsByClassName("date");
let title = document.getElementsByClassName("title");
let content = document.getElementsByClassName("content");
let author = document.getElementsByClassName("author-display");
const signP = document.getElementById("p");
const submitCommentBtn = document.getElementById("for-submit-comment-btn");

//Regarding user and token
if (localStorage.getItem("token")) {
  //if user signed in
  console.log(localStorage.getItem("token"));
  token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  user = decodedToken.name;
  id = decodedToken.userId.toString();

  userComment.disabled = false;
  submitCommentBtn.style.display = "block";
  signP.style.display = "none";
} else {
  //if user not signed in
  console.log(userComment);
  userComment.disabled = true;
  signP.style.display = "block";
  submitCommentBtn.style.display = "none";
}

const openLoginModal = () => {
  loginModal.style.display = "block";
};

const reset = () => {
  email.value = "";
  password.value = "";
  signupSuccessDiv.style.display = "none";
};

const closeLoginModal = () => {
  loginModal.style.display = "none";
  reset();
};
window.addEventListener("click", (e) => {
  if (e.target == loginModal) {
    closeLoginModal();
  }
});

const resetField = (arg1, arg2) => {
  arg1.value = "";
  arg2.value = "";
};

const signupMessage = (arg, text, color) => {
  arg.style.display = "block";
  arg.style.backgroundColor = color;
  arg.innerHTML = text;
};

const redirect = (time, path) => {
  setTimeout(function () {
    window.location = path;
  }, time);
};

const reload = () => {
  setTimeout(function () {
    closeLoginModal();
    location.reload();
  }, 2000);
};

let obj = {
  name: null,
  password: null,
};

const setError = (element, message) => {
  const field = element.parentElement;
  const errorField = field.querySelector(".error");
  errorField.innerHTML = message;
  errorField.style.marginTop = "5px";
  field.classList.add("error");
  field.classList.remove("success");
};

const setSuccess = (element) => {
  const field = element.parentElement;
  const errorField = field.querySelector(".error");
  errorField.innerText = "";
  field.classList.remove("error");
  field.classList.add("success");
};

const isValidEmail = (arg) => {
  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(arg);
};

const checkTruthy = (arg) => {
  for (let key in arg) {
    if (!arg[key]) {
      return false;
    }
  }

  return true;
};

const validateInputs = () => {
  let emailText = email.value.trim();
  let passwordText = password.value.trim();

  //validate email
  if (emailText === "") {
    setError(email, "Please enter your email");
    obj.name = false;
  } else if (isValidEmail(emailText) === false) {
    setError(email, "Invalid email");
    obj.name = false;
  } else {
    setSuccess(email);
    obj.name = true;
  }

  //validate password
  if (passwordText === "") {
    setError(password, "Please enter your password");
    obj.password = false;
  } else {
    setSuccess(password);
    obj.password = true;
  }
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  if (checkTruthy(obj) === true) {
    const loginEndpoint = "https://my-brand-atlp-be.onrender.com/api/login";

    const userData = {
      email: email.value,
      password: password.value,
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const startLogin = async () => {
      try {
        signupMessage(signupSuccessDiv, "... processing", "#0b5ed7");
        const response = await fetch(loginEndpoint, fetchOptions);
        if (!response.ok) {
          if (response.status === 401) {
            signupMessage(signupSuccessDiv, "Wrong credentials", "#bb2d3b");
            resetField(email, password);
          } else if (response.status === 404) {
            signupMessage(signupSuccessDiv, "User not found", "#bb2d3b");
            resetField(email, password);
          } else {
            signupMessage(
              signupSuccessDiv,
              "Check credentials format",
              "#bb2d3b"
            );
            resetField(email, password);
          }
          throw new Error("Something went wrong");
        }

        signupMessage(signupSuccessDiv, "Success", "#198754");
        const data = await response.json();
        token = data.token;
        localStorage.setItem("token", token);
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        signP.style.display = "none";
        console.log(decodedToken.role);
        reload();
      } catch (e) {
        console.log(`Something went wrong: ${e}`);
      }
    };

    startLogin();
  }
});

//for rendering comments
let commentSection = document.getElementsByClassName("list-comments");

//Date formater
const formatDate = (arg) => {
  const date = new Date(arg);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

//render comments
const renderComments = (arg) => {
  const commentData = arg.comments;

  if (commentData.length === 0) {
    commentSection[0].innerHTML += `<p class="no-comment">No Comments to show </p>`;
  } else {
    commentSection[0].innerHTML = `<div class="comment-title">
                <h1>All comments</h1>
         </div>`;
    commentData.forEach((item) => {
      commentSection[0].innerHTML += `
      <div class="listed">
        <div class="avatar-comment">
              <i class="fa-solid fa-circle-user"></i>
            </div>
            <div class="content-comment">
              <div class="comment-head">
                <p>${item.name}</p>
                <p>${formatDate(item.timestamp)}</p>
              </div>
              <p>${item.content}</p>
              <div class="comment-foot">
                <i class="fa-solid fa-thumbs-up"></i>
                <i class="fa-solid fa-thumbs-down"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </div>
          </div>
      `;
    });
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  // For Page Display

  try {
    content[0].innerHTML = `<p class="loading">Loading...<p>`;
    const response = await fetch(
      `https://my-brand-atlp-be.onrender.com/api/blogs/${idFromUrl}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      content[0].innerHTML = "";
      const blogData = await response.json();
      const data = blogData.data;

      date[0].innerHTML = formatDate(data.createdAt);
      title[0].innerHTML = data.title;
      content[0].innerHTML = data.content;

      author[0].innerHTML = data.author;
      renderComments(data);
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    content[0].innerHTML = `<p class="loading">Loading...<p>`;
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  if (checkTruthy(obj) === true) {
    const loginEndpoint = "https://my-brand-atlp-be.onrender.com/api/login";

    const userData = {
      email: email.value,
      password: password.value,
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const startLogin = async () => {
      try {
        signupMessage(signupSuccessDiv, "... processing", "#0b5ed7");
        const response = await fetch(loginEndpoint, fetchOptions);
        if (!response.ok) {
          if (response.status === 401) {
            signupMessage(signupSuccessDiv, "Wrong credentials", "#bb2d3b");
            resetField(email, password);
          } else if (response.status === 404) {
            signupMessage(signupSuccessDiv, "User not found", "#bb2d3b");
            resetField(email, password);
          } else {
            signupMessage(
              signupSuccessDiv,
              "Check credentials format",
              "#bb2d3b"
            );
            resetField(email, password);
          }
          throw new Error("Something went wrong");
        }

        signupMessage(signupSuccessDiv, "Success", "#198754");
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        reload();
      } catch (e) {
        console.log(`Something went wrong: ${e}`);
      }
    };

    startLogin();
  }
});

submitComment.addEventListener("submit", (e) => {
  e.preventDefault();
  const addCommentData = {
    name: user,
    email: "developer.purpose@gmail.com",
    content: userComment.value.trim(),
  };
  const addCommentEndpoint = `https://my-brand-atlp-be.onrender.com/api/comments/${idFromUrl}`;
  const fetchOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addCommentData),
  };
  const addComment = async () => {
    try {
      const response = await fetch(addCommentEndpoint, fetchOptions);
      const jsonResponse = await response.json();
      if (!response.ok) {
      } else {
        location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  addComment();
});
