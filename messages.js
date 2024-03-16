let messages = [];
const respTable = document.getElementById("resp-table");
const senderName = document.getElementById("sender-name");
const senderEmail = document.getElementById("sender-email");
const senderContent = document.getElementById("sender-content");
let success = document.getElementById("success");
let form = document.getElementById("view-email");
let token;

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  }

  const messagesEndpoint = "https://my-brand-atlp-be.onrender.com/api/messages";
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const getMessages = async () => {
    try {
      respTable.innerHTML = `<h2 class="empty-blog">Loading, Please wait...</h2>`;
      console.log("loading");
      const response = await fetch(messagesEndpoint, fetchOptions);
      const jsonResponse = await response.json();
      const data = await jsonResponse.data;
      console.log(data);
      listMessages(data);
    } catch (e) {
      console.error(`Error fetching Data`);
    }
  };

  getMessages();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendEmail();
});

const sendEmail = () => {
  Email.send({
    SecureToken: "2c632859-77ec-4616-8879-7f2917905917",
    To: senderEmail.value,
    From: "developer.purpose@gmail.com",
    Subject: "Thanks for contacting Me",
    Body: document.getElementById("textinput").value.trim(),
  }).then((message) => {
    if (message === "OK") {
      success.innerHTML = "Successfully Sent";
      success.style.display = "block";
      hideSuccess();
    } else {
      success.innerHTML = "Something went wrong!";
      success.style.display = "block";
      hideSuccess();
    }
    console.log(message);
  });
};

const hideSuccess = () => {
  setTimeout(function () {
    success.style.display = "none";
    hideModal();
    reset();
  }, 3000);
};

//target the Div that has textarea to reply
const replyContainer = document.getElementById("reply");

//target the P element that will be used to reveal replyContainer
const pButton = document.getElementById("p-button");

//Target submit button
const submitButton = document.getElementById("submit");

// Get the icon and tooltip elements

const showReplySection = () => {
  replyContainer.style.display = "block";
  pButton.style.display = "none";
  submitButton.style.display = "block";
};

const reset = () => {
  replyContainer.style.display = "none";
  pButton.style.display = "block";
  submitButton.style.display = "none";
};

const listMessages = (arg) => {
  console.log(arg);
  if (arg === null) {
    console.log(arg);
    respTable.innerHTML = `
      <li class="table-header">
      <div class="col col-1">#</div>
        <div class="col col-2">Sender</div>
        <div class="col col-3">Messages</div>
        <div class="col col-4">Action</div>
      </li>
      <h3 class="empty-blog">Mailbox Empty</h3>`;
  } else {
    console.log(arg.length);
    respTable.innerHTML = `
      <li class="table-header">
          <div class="col col-1">#</div>
          <div class="col col-2">Sender</div>
          <div class="col col-3">Messages</div>
          <div class="col col-4">Action</div>
    </li>`;

    arg.forEach((item, index) => {
      let newTitle = "";
      //format Title
      const formatTitle = (x) => {
        if (x.length <= 10) {
          return x;
        }

        for (let i = 0; i <= 10; i++) {
          newTitle += x[i];
        }

        newTitle += "...";
        return newTitle;
      };

      respTable.innerHTML += `<li class="table-row">
      <div class="col col-1" data-label="#">${index + 1}</div>
              <div class="col col-2" data-label="Sender">${item.fullName}</div>
              <div class="col col-3" data-label="Message">${formatTitle(
                item.messageContent
              )}</div>
              <div class="col col-4 action-icon" data-label="Action">
                 <i class="fa-solid fa-eye" onClick="showModal(${index})"></i>
                 
                  
 
                  <i  onClick="deleteMessage(${index})" class="fa-solid fa-trash"></i>
                  
                  

              </div>
          </li>`;
    });
  }
};

const showModal = (i) => {
  modal.style.display = "block";
  let messageItem = messages[i];
  senderName.value = `${messageItem.userNameValue}`;
  senderEmail.value = `${messageItem.userEmailValue}`;
  senderContent.value = messageItem.userMessageValue;
};

const hideModal = () => {
  modal.style.display = "none";
  reset();
};

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btnModal = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btnModal.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  reset();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    reset();
  }
};

const deleteMessage = (arg) => {
  messages = JSON.parse(localStorage.getItem("messages"));
  messages.splice(arg, 1);
  localStorage.setItem("messages", JSON.stringify(messages));
  listMessages();
};
