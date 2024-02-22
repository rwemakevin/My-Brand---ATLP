const addBlogForm = document.getElementById("add-blog");
const inputBlogAuthor = document.getElementById("input-blog-author");
const inputBlogTitle = document.getElementById("input-blog-title");
const blogContent = document.getElementById("blog-content");
const respTable = document.getElementById("resp-table");
let blogs = [];
var modal = document.getElementById("myModal");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("blogs"))
    blogs = JSON.parse(localStorage.getItem("blogs"));
  listBlogs();
  console.log(localStorage.getItem("blogs"));
});

addBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const blog = {
    id: Date.now(),
    publishedDate: Date.now(),
    title: inputBlogTitle.value.trim(),
    author: inputBlogAuthor.value.trim(),
    content: blogContent.value.trim(),
  };

  saveBlog(blog);
  console.log(blog);
});

const saveBlog = (blog) => {
  blogs.push(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  listBlogs();
  closeModal();
  clearInputs();
};

const listBlogs = () => {
  if (localStorage.getItem("blogs") === null) {
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
        
        <div class="col col-2">Author</div>
        <div class="col col-3">Title</div>
        <div class="col col-4">Acton</div>
  </li>`;
    blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs.forEach((item, index) => {
      let longTitle = item.title;
      let smallTitle = "";
      if (longTitle.length < 15) {
        smallTitle = longTitle;
      } else {
        for (let i = 0; i <= 15; i++) {
          smallTitle += longTitle[i];
        }

        smallTitle += `...`;
      }

      console.log(longTitle);
      console.log(smallTitle);
      respTable.innerHTML += `<li class="table-row">
            
            <div class="col col-2" data-label="Author">${item.author}</div>
            <div class="col col-3" data-label="Title">${smallTitle}</div>
            <div class="col col-4 action-icon" data-label="Action">
               <a href="./read.html?id=${item.id}" target="_blank"><i class="fa-solid fa-eye"></i></a> 
                <i onClick="editBlog(${item.id})" class="fa-solid fa-pen-to-square"></i>
                <i onClick="deleteBlog(${item.id})" class="fa-solid fa-trash"></i>
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
