//For listing users
let token
const usersContainer = document.getElementById("display");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")){
    token = localStorage.getItem("token");
  }

  const usersEndpoint = "https://my-brand-atlp-be.onrender.com/api/users"
  const fetchOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",

    },

  }

    const getUser = async () => {
      try{
        console.log("loading")
        const response = await fetch(usersEndpoint, fetchOptions);
        const jsonResponse = await response.json()
        const data = jsonResponse.data
        console.log(data)
      }catch(e){
        console.error(`Error fetching Data`)
      }
    }

    getUser()
 
  
  
 
});

const listUsers = () => {
  usersContainer.innerHTML = `
  <li class="table-header">

  <div class="col col-2">Date</div>
  <div class="col col-3">Name</div>
  <div class="col col-4">Acton</div>
</li>`;

  if (localStorage.getItem("users") === null) {
    usersContainer.innerHTML += `<h2 class="empty-blog">No User found</h2>`;
  } else {
    users = JSON.parse(localStorage.getItem("users"));

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
  }
};

const deleteUser = (arg) => {
  users = JSON.parse(localStorage.getItem("users"));
  let newUsers = users.filter((item) => {
    return parseInt(item.id) !== arg;
  });

  if (newUsers.length === 0) {
    localStorage.removeItem("users");
  } else {
    localStorage.setItem("users", JSON.stringify(newUsers));
  }
  //   reset();
  listUsers();
};

