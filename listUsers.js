//For listing users
let users = [];
const usersContainer = document.getElementById("display");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("users"))
    users = JSON.parse(localStorage.getItem("users"));
  listUsers();
  console.log(localStorage.getItem("users"));
});

const listUsers = () => {
  if (localStorage.getItem("users") === null) {
    usersContainer.innerHTML = `
        <li class="table-header">
      
        <div class="col col-2">Date</div>
        <div class="col col-3">Name</div>
        <div class="col col-4">Acton</div>
      </li>
      <h2 class="empty-blog">No User found</h2>`;
  } else {
    users = JSON.parse(localStorage.getItem("users"));
    usersContainer.innerHTML = `
        <li class="table-header">
            <div class="col col-2">Author</div>
            <div class="col col-3">Title</div>
            <div class="col col-4">Acton</div>
      </li>`;
  }

  users.forEach((item, index) => {
    usersContainer.innerHTML += `<li class="table-row">
            
        <div class="col col-2" data-label="Date">${item.createdAt}</div>
        <div class="col col-3" data-label="Name">${item.name}</div>
        <div class="col col-4 action-icon" data-label="Action">
           <a ><i class="fa-solid fa-eye"></i></a> 
            <i  class="fa-solid fa-pen-to-square"></i>
            <i onClick="deleteUser(${item.id})" class="fa-solid fa-trash"></i>
        </div>
    </li>`;
  });
};

const deleteUser = (arg) => {
  users = JSON.parse(localStorage.getItem("users"));
  let newUsers = users.filter((item) => {
    return parseInt(item.id) !== arg;
  });

  if (newUsers.length < 1) {
    localStorage.removeItem("users");
  } else {
    localStorage.setItem("users", JSON.stringify(newUsers));
  }
  //   reset();
  listUsers();
};
