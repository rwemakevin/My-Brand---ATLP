let urlParams = new URLSearchParams(window.location.search);
let idFromUrl = urlParams.get("id");
let date = document.getElementsByClassName("date");
let title = document.getElementsByClassName("title");
let content = document.getElementsByClassName("content");
let author = document.getElementsByClassName("author-display");

document.addEventListener("DOMContentLoaded", () => {
  blogs = JSON.parse(localStorage.getItem("blogs"));
  let blogToDisplay = blogs.find((item) => item.id == idFromUrl);
  console.log(blogToDisplay);
  const n = parseInt(blogToDisplay.id);
  const m = new Date(n);
  const human = m.toLocaleDateString();
  console.log(human);

  date[0].innerHTML = human;
  title[0].innerHTML = blogToDisplay.title;
  content[0].innerHTML = blogToDisplay.content;
  author[0].innerHTML = blogToDisplay.author;
});
