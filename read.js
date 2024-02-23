// For Page Display
let urlParams = new URLSearchParams(window.location.search);
let idFromUrl = urlParams.get("id");
let date = document.getElementsByClassName("date");
let title = document.getElementsByClassName("title");
let content = document.getElementsByClassName("content");
let author = document.getElementsByClassName("author-display");
let oneBlog;
let blogs = [];
let commentArray = [];

//for comment form
let form = document.getElementById("submit-form");
let userName = document.getElementById("username");
let userEmail = document.getElementById("email");
let userComment = document.getElementById("comment");

document.addEventListener("DOMContentLoaded", () => {
  blogs = JSON.parse(localStorage.getItem("blogs"));
  let blogToDisplay = blogs.find((item) => item.id == idFromUrl);
  console.log(blogToDisplay);
  const n = parseInt(blogToDisplay.id);
  const m = new Date(n);
  const human = m.toLocaleDateString();
  // console.log(human);
  date[0].innerHTML = human;
  title[0].innerHTML = blogToDisplay.title;
  content[0].innerHTML = blogToDisplay.content;
  author[0].innerHTML = blogToDisplay.author;
  // console.log(blogToDisplay.comments);
  oneBlog = blogToDisplay;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userNameValue = userName.value;
  let userEmailValue = userEmail.value;
  let userCommentValue = userComment.value;

  let commentData = {
    userNameValue,
    userEmailValue,
    userCommentValue,
  };
  commentArray.push(commentData);
  // console.log(oneBlog);
  oneBlog.comments.push(commentData);
  // console.log(oneBlog.comments);

  blogs = blogs.map((item) => {
    if (item.id == idFromUrl) {
      return {
        ...item,
        comments: commentArray,
      };
    }

    return item;
  });

  localStorage.setItem("blogs", JSON.stringify(blogs));
});
