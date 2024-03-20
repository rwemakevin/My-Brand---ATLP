document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const userName = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  const userMessage = document.getElementById("user-message");
  const loading = document.getElementsByClassName("success");
  const loginBtn = document.querySelector("a.login");
  console.log(loginBtn);

  if (localStorage.getItem("token")) {
    loginBtn.style.display = "none";
  }
  function showSuccessMessage(arg, bgColor) {
    let successDiv = document.getElementsByClassName("success");
    successDiv[0].style.backgroundColor = bgColor;
    successDiv[0].innerHTML = arg;
    successDiv[0].style.display = "block";
    userEmail.value = "";
    userMessage.value = "";
    userName.value = "";
    console.log(arg);
  }

  const closeSuccessMessage = () => {
    setTimeout(function () {
      successDiv[0].style.display = "none";
      window.location = "./index.html#about";
    }, 7000);
  };

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let userNameValue = userName.value.trim();
    let userEmailValue = userEmail.value.trim();
    let userMessageValue = userMessage.value.trim();

    const userData = {
      fullname: userNameValue,
      email: userEmailValue,
      message: userMessageValue,
    };

    //let's do the signup process
    const sendMessageEndpoint =
      "https://my-brand-atlp-be.onrender.com/api/messages";

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const sendMessages = async () => {
      try {
        showSuccessMessage("...sending", "#0b5ed7");
        const response = await fetch(sendMessageEndpoint, fetchOptions);
        console.log(response);
        if (!response.ok) {
          showSuccessMessage("Fail: " + response.statusText, "#bb2d3b");
          throw new Error("Error sending message: " + response.statusText);
        } else {
          showSuccessMessage("Success. Thank you!", "#198754");
          closeSuccessMessage();
        }
      } catch (e) {
        console.log(`Something went wrong: ${e}`);
        showSuccessMessage(`${e}`, "#bb2d3b");
        console.log(e);
      }
    };

    sendMessages();

    // showSuccessMessage();
  });
});
