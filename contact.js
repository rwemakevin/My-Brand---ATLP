document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const userName = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  const userMessage = document.getElementById("user-message");
  const loading = document.getElementsByClassName("success");
  function showSuccessMessage(arg, bgColor) {
    let successDiv = document.getElementsByClassName("success");
    successDiv[0].style.backgroundColor = bgColor;
    successDiv[0].innerHTML = arg;
    successDiv[0].style.display = "block";
    userEmail.value = "";
    userMessage.value = "";
    userName.value = "";
    console.log(arg);

    setTimeout(function () {
      successDiv[0].style.display = "none";
      window.location = "./index.html#about";
    }, 7000);
  }

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
          if (response.status === 500) {
            showSuccessMessage("Fail: something went wrong", "#bb2d3b");
          } else {
            showSuccessMessage("Fail: something went wrong", "#bb2d3b");
          }

          throw new Error("Error sending message: " + response.statusText);
        } else {
          showSuccessMessage("Success. Thank you!", "#198754");
        }
      } catch (e) {
        console.log(`Something went wrong: ${e}`);
        showSuccessMessage("Failed: try again", "red");
      }
    };

    sendMessages();

    // showSuccessMessage();
  });
});
