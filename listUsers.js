//For listing users
let token;
const usersContainer = document.getElementById("display");

const formatDate = (arg) => {
  const date = new Date(arg);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  }

  const usersEndpoint = "https://my-brand-atlp-be.onrender.com/api/users";
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const getUser = async () => {
    try {
      console.log("loading");
      usersContainer.innerHTML = `<h2 class="empty-blog">Loading, Please wait...</h2`;
      const response = await fetch(usersEndpoint, fetchOptions);
      const jsonResponse = await response.json();
      const data = await jsonResponse.data;
      console.log(data);
      listUsers(data);
    } catch (e) {
      console.error(`Error fetching Data`);
    }
  };

  getUser();
});

const listUsers = (arg) => {
  usersContainer.innerHTML = `
  <li class="table-header">

  <div class="col col-2">Joined on</div>
  <div class="col col-3">Name</div>
  <div class="col col-4">Acton</div>
</li>`;

  if (arg === null) {
    usersContainer.innerHTML += `<h2 class="empty-blog">No User found</h2>`;
  } else {
    arg.forEach((item, index) => {
      const date = formatDate(item.createdAt);

      usersContainer.innerHTML += `<li class="table-row">
            
        <div class="col col-2" data-label="Joined on">${date}</div>
        <div class="col col-3" data-label="Name">${item.name}</div>
        <div class="col col-4 action-icon" data-label="Action">
           <a ><i class="fa-solid fa-eye"></i></a> 
            <i  class="fa-solid fa-pen-to-square"></i>
            <i onClick="deleteUser(${item.id})" class="fa-solid fa-trash"></i>
        </div>
    </li>`;
    });
  }
};

// const deleteUser = (arg) => {
//   users = JSON.parse(localStorage.getItem("users"));
//   let newUsers = users.filter((item) => {
//     return parseInt(item.id) !== arg;
//   });

//   if (newUsers.length === 0) {
//     localStorage.removeItem("users");
//   } else {
//     localStorage.setItem("users", JSON.stringify(newUsers));
//   }
//   //   reset();
// };
