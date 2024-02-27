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

//for rendering comments
let commentSection = document.getElementsByClassName("list-comments");

document.addEventListener("DOMContentLoaded", () => {
  blogs = JSON.parse(localStorage.getItem("blogs"));
  let blogToDisplay = blogs.find((item) => item.id == idFromUrl);
  commentArray = blogToDisplay.comments;
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
  renderComments(idFromUrl);
});

const reset = () => {
  userName.value = "";
  userEmail.value = "";
  userComment.value = "";
};
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
  //oneBlog.comments.push(commentData);
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
  renderComments(idFromUrl);
});

const renderComments = (arg) => {
  // console.log(commentSection[0]);
  let a = JSON.parse(localStorage.getItem("blogs"));
  let b = a.find((item) => item.id == arg);
  console.log(b);

  let c = b.comments;
  console.log(c);
  commentSection[0].innerHTML = `
   <div class="comment-title">
             <h1>All comments</h1>
     </div>
   `;
  if (c.length === 0) {
    commentSection[0].innerHTML += `
           <p class="no-comment">No Comments to show </p>
   `;
  } else {
    c.forEach((item) => {
      let commentDate = Date.now();
      let commentDateFormated = new Date(parseInt(commentDate));
      let commentFinalDate = commentDateFormated.toLocaleDateString();

      commentSection[0].innerHTML += `
      <div class="listed">
      <div class="avatar-comment">
        <i class="fa-solid fa-circle-user"></i>
      </div>
      <div class="content-comment">
        <div class="comment-head">
          <p>${item.userNameValue}</p>
          <p>${commentFinalDate}</p>
        </div>
        <p>${item.userCommentValue}</p>
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

  reset();
};
