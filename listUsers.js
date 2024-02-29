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

const a = [
  {
    id: 1708697748125,
    publishedDate: 1708697748125,
    title: "How are you doing?",
    author: "Testing",
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eros est, convallis vel aliquam non, suscipit non est. Suspendisse hendrerit, dui id auctor pretium, purus est semper enim, quis imperdiet velit dolor vitae massa. Quisque sed faucibus felis, sed consequat eros. Fusce maximus vulputate tortor eget condimentum. Fusce consectetur velit nec nisi ultricies scelerisque. Pellentesque commodo vestibulum ipsum vitae egestas. In egestas eu elit in auctor. Ut volutpat metus vel ex elementum tincidunt. Maecenas non enim ac mauris rhoncus commodo. Aliquam maximus augue ac bibendum tempor. Ut semper gravida lacus, et finibus risus tempor vel. Proin ac orci sit amet ante sagittis accumsan malesuada eget urna. Phasellus condimentum, mauris ac mattis pellentesque, metus lacus convallis ligula, sed dictum lorem leo nec ipsum. Donec posuere nec tellus a ullamcorper. Integer odio nisl, aliquam ut est quis, elementum tempor purus.</p>\n<p>&nbsp;</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://www.harambee.rw/wp-content/uploads/2023/09/MOSE0263-scaled.jpg" alt="" width="397" height="596"></p>',
    comments: [
      {
        userNameValue: "Mudeyi",
        userEmailValue: "Yves@harambee.rw",
        userCommentValue: "This is a good Content, Keep it up",
      },
      {
        userNameValue: "Pascal",
        userEmailValue: "pascal@harambee.rw",
        userCommentValue:
          "I agree with Mudeyi, You should give us more of it often",
      },
      {
        userNameValue: "Kevin",
        userEmailValue: "kevinr@harambee.rw",
        userCommentValue: "Hahahaah",
      },
      {
        userNameValue: "Biggie",
        userEmailValue: "biggie@gmail.cmo",
        userCommentValue: "Hi Guys",
      },
      {
        userNameValue: "kev",
        userEmailValue: "kevinrwema@gmail.com",
        userCommentValue: "hello",
      },
    ],
  },
  {
    id: 1708698195333,
    publishedDate: 1708698195333,
    title: "Can you do me a favor?",
    author: "Biggie",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eros est, convallis vel aliquam non, suscipit non est. Suspendisse hendrerit, dui id auctor pretium, purus est semper enim, quis imperdiet velit dolor vitae massa. Quisque sed faucibus felis, sed consequat eros. Fusce maximus vulputate tortor eget condimentum. Fusce consectetur velit nec nisi ultricies scelerisque. Pellentesque commodo vestibulum ipsum vitae egestas. In egestas eu elit in auctor. Ut volutpat metus vel ex elementum tincidunt. Maecenas non enim ac mauris rhoncus commodo. Aliquam maximus augue ac bibendum tempor. Ut semper gravida lacus, et finibus risus tempor vel. Proin ac orci sit amet ante sagittis accumsan malesuada eget urna. Phasellus condimentum, mauris ac mattis pellentesque, metus lacus convallis ligula, sed dictum lorem leo nec ipsum. Donec posuere nec tellus a ullamcorper. Integer odio nisl, aliquam ut est quis, elementum tempor purus.</p>",
    comments: [
      {
        userNameValue: "Diane",
        userEmailValue: "diane@yahoo.com",
        userCommentValue: "Wow! I am speechless, feel like crying🥺🥺",
      },
      {
        userNameValue: "Uwimana",
        userEmailValue: "uwimana@gmail.com",
        userCommentValue: "That's what I thought!",
      },
      {
        userNameValue: "Lost boy",
        userEmailValue: "lost@gmail.c.om",
        userCommentValue: "Hello guys, I am lost",
      },
    ],
  },
];
