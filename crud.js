const addBlogForm = document.getElementById("add-blog");
const inputBlogAuthor = document.getElementById("input-blog-author");
const inputBlogTitle = document.getElementById("input-blog-title");
const blogContent = document.getElementById("blog-content");
const respTable = document.getElementById("resp-table");
let token;

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  }

  const blogsEndpoint = "https://my-brand-atlp-be.onrender.com/api/blogs";
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const getBlogs = async () => {
    try {
      respTable.innerHTML = `<h2 class="empty-blog">Loading, Please wait...</h2>`;
      console.log("loading");
      const response = await fetch(blogsEndpoint, fetchOptions);
      const jsonResponse = await response.json();
      const data = await jsonResponse.data;
      console.log(data);
      listBlogs(data);
    } catch (e) {
      console.error(`Error fetching Data`);
    }
  };

  getBlogs();
});

addBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const blog = {
    title: inputBlogTitle.value.trim(),
    author: inputBlogAuthor.value.trim(),
    content: blogContent.value.trim(),
  };

  saveBlog(blog);
  console.log(blog);
});

const saveBlog = (blog) => {
  const blogsEndpoint = "https://my-brand-atlp-be.onrender.com/api/blogs";
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  listBlogs();
  closeModal();
  clearInputs();
};

const listBlogs = (arg) => {
  if (localStorage.getItem("token") === null) {
    respTable.innerHTML = `
    <li class="table-header">
      
      <div class="col col-2">Author</div>
      <div class="col col-3">Title</div>
      <div class="col col-4">Acton</div>
    </li>
    <h2 class="empty-blog">Empty</h2>`;
  } else {
    respTable.innerHTML = `
    <li class="table-header">
    <div class="col col-1">#</div>
        <div class="col col-2">Author</div>
        <div class="col col-3">Title</div>
        <div class="col col-4">Acton</div>
  </li>`;

    arg.forEach((item, index) => {
      let newTitle = "";
      //format Title
      const formatTitle = (arg) => {
        if (arg.length <= 10) {
          return arg;
        }

        for (let i = 0; i < arg.length; i++) {
          newTitle += arg[i];
        }

        newTitle += "...";
        return newTitle;
      };

      respTable.innerHTML += `<li class="table-row">
      <div class="col col-1" data-label="#">${index + 1}</div>
            <div class="col col-2" data-label="Author">${item.author}</div>
            <div class="col col-3" data-label="Title">${formatTitle(
              item.title
            )}</div>
            <div class="col col-4 action-icon" data-label="Action">
               <a href="./read.html?id=${
                 item._id
               }" target="_blank"><i class="fa-solid fa-eye"></i></a> 
                <i onClick="editBlog(${
                  item._id
                })" class="fa-solid fa-pen-to-square"></i>
                <i onClick="deleteBlog(${
                  item._id
                })" class="fa-solid fa-trash"></i>
            </div>
        </li>`;
    });
  }
};

const deleteBlog = (arg) => {
  blogs = JSON.parse(localStorage.getItem("blogs"));
  console.log("passed Id below");
  console.log(arg);
  console.log("bookmark parsed below");
  console.log(blogs);
  let newBlogs = blogs.filter((item) => {
    return parseInt(item.id) !== arg;
  });

  console.log(blogs);

  if (newBlogs.length < 1) {
    localStorage.removeItem("blogs");
  } else {
    localStorage.setItem("blogs", JSON.stringify(newBlogs));
  }
  //   reset();
  listBlogs();
};

const editBlog = (arg) => {
  window.location.href = `/edit-blog.html?id=${arg}`;
};

const clearInputs = () => {
  inputBlogAuthor.value = "";
  inputBlogTitle.value = "";
  blogContent.value = "";
};

const closeModal = () => {
  modal.style.display = "none";
};

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btnModal = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btnModal.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
