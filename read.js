// For Page Display
let urlParams = new URLSearchParams(window.location.search);
let idFromUrl = urlParams.get("id");
let date = document.getElementsByClassName("date");
let title = document.getElementsByClassName("title");
let content = document.getElementsByClassName("content");
let author = document.getElementsByClassName("author-display");

//for comment form
let form = document.getElementById("submit-form");
let userName = document.getElementById("username");
let userEmail = document.getElementById("email");
let userComment = document.getElementById("comment");

//for rendering comments
let commentSection = document.getElementsByClassName("list-comments");

//Date formater
const formatDate = (arg) => {
  const date = new Date(arg);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

//render comments
const renderComments = (arg) => {
  const commentData = arg.comments;
  console.log(commentData);
  if (commentData.length === 0) {
    console.log("empty comments");
    commentSection[0].innerHTML += `<p class="no-comment">No Comments to show </p>`;
  } else {
    console.log("we have something");
    commentSection[0].innerHTML = `<div class="comment-title">
                <h1>All comments</h1>
         </div>`;
    commentData.forEach((item) => {
      commentSection[0].innerHTML += `
      <div class="listed">
        <div class="avatar-comment">
              <i class="fa-solid fa-circle-user"></i>
            </div>
            <div class="content-comment">
              <div class="comment-head">
                <p>${item.name}</p>
                <p>${formatDate(item.timestamp)}</p>
              </div>
              <p>${item.content}</p>
              <div class="comment-foot">
                <i class="fa-solid fa-thumbs-up"></i>
                <i class="fa-solid fa-thumbs-down"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </div>
          </div>
      `;
    });
  }
};
document.addEventListener("DOMContentLoaded", async () => {
  try {
    content[0].innerHTML = `<p class="loading">Loading...<p>`;
    const response = await fetch(
      `https://my-brand-atlp-be.onrender.com/api/blogs/${idFromUrl}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      content[0].innerHTML = "";
      const blogData = await response.json();
      const data = blogData.data;

      date[0].innerHTML = formatDate(data.createdAt);
      title[0].innerHTML = data.title;
      content[0].innerHTML = data.content;
      console.log(data.content);
      author[0].innerHTML = data.author;
      renderComments(data);
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    content[0].innerHTML = `<p class="loading">Loading...<p>`;
  }
});

// const reset = () => {
//   userName.value = "";
//   userEmail.value = "";
//   userComment.value = "";
// };

//   reset();
//};
