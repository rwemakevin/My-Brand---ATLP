const addBlogForm = document.getElementById("add-blog");
const inputBlogAuthor = document.getElementById("input-blog-author");
const inputBlogTitle = document.getElementById("input-blog-title");
const blogContent = document.getElementById("blog-content");
const respTable = document.getElementById("resp-table");
let saveBlogToasterDiv = document.getElementById("save-blog-toaster");
let token;
let username;
const toasterMessage = (div, text, color) => {
  div.style.display = "block";
  div.style.backgroundColor = color;
  div.innerHTML = text;
};

const editBlog = (i) => {
  //window.location.href = `./edit-blog.html?id=${arg}`;
  console.log(i);
  //alert(arg);
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    username = decodedToken.name;
    inputBlogAuthor.value = username;
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

  const saveBlog = async (blog) => {
    const blogData = {
      title: inputBlogTitle.value.trim(),
      author: inputBlogAuthor.value.trim(),
      content: blogContent.value.trim(),
    };
    const addBlogsEndpoint = "https://my-brand-atlp-be.onrender.com/api/blogs";
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    };
    try {
      toasterMessage(saveBlogToasterDiv, "Saving blog...", "#0b5ed7");
      const response = await fetch(addBlogsEndpoint, fetchOptions);
      if (!response.ok) {
        if (response.status == "401") {
          toasterMessage(saveBlogToasterDiv, "Access Denied", "#bb2d3b");
          console.log("unothorize");
        } else if (response.status == "500") {
          toasterMessage(saveBlogToasterDiv, "Something went wrong", "#bb2d3b");
          console.log("Internal server");
        } else if (response.status == "400") {
          toasterMessage(
            saveBlogToasterDiv,
            `<ul>
          <li>Author should have a min of 3 Characters</li>
          <li>Title should have a min of 6 Character</li>
          <li>content should have a min of 10 Character</li>
        </ul>`,
            "#bb2d3b"
          );
          console.log(response.status);
        } else {
          toasterMessage(saveBlogToasterDiv, "Something went wrong", "#bb2d3b");
          console.log(response.status);
        }
        throw new Error("Error sending message: " + response.statusText);
      } else {
        toasterMessage(saveBlogToasterDiv, "Blog Published", "green");
        setTimeout(function () {
          clearInputs();
          closeModal();
          getBlogs();
        }, 2000);
      }

      //alert("Blog Added");
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
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
        let newAuthor = "";
        //format Title
        const formatTitle = (arg) => {
          if (arg.length <= 10) {
            return arg;
          }

          for (let i = 0; i < 10; i++) {
            newTitle += arg[i];
          }

          newTitle += "...";
          return newTitle;
        };

        //format Title
        const formatAuthor = (arg) => {
          if (arg.length <= 10) {
            return arg;
          }

          for (let i = 0; i < 10; i++) {
            newAuthor += arg[i];
          }

          newAuthor += "...";
          return newAuthor;
        };

        respTable.innerHTML += `<li class="table-row">
        <div class="col col-1" data-label="#">${index + 1}</div>
              <div class="col col-2" data-label="Author">${formatAuthor(
                item.author
              )}</div>
              <div class="col col-3" data-label="Title">${formatTitle(
                item.title
              )}</div>
              <div class="col col-4 action-icon" data-label="Action">
                 <a href="./read.html?id=${
                   item._id
                 }" target="_blank"><i class="fa-solid fa-eye"></i></a> 
                  <a href = "./edit-blog.html?id=${
                    item._id
                  }"><i class="fa-solid fa-pen-to-square"></i></a>
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

  const clearInputs = () => {
    inputBlogAuthor.value = "";
    inputBlogTitle.value = "";
    blogContent.value = "";
    saveBlogToasterDiv.style.display = "none";
  };

  const closeModal = () => {
    modal.style.display = "none";
    clearInputs();
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
    closeModal();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      closeModal();
    }
  };
});
