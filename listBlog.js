let blogs = [];
let blogSection = document.querySelector("section#blog-section");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("blogs"))
    blogs = JSON.parse(localStorage.getItem("blogs"));
  listBlogs();
  console.log(localStorage.getItem("blogs"));
});

const listBlogs = () => {
  if (localStorage.getItem("blogs") === null) {
    blogSection.innerHTML = `
      
      <h2 class="empty-blog">Nothing to show</h2>`;
  } else {
    blogSection.innerHTML = "";
    blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs.forEach((item, index) => {
      let n = parseInt(item.id);
      let m = new Date(n);
      let human = m.toLocaleDateString();

      let longTitle = item.content;
      let smallTitle = "";
      if (longTitle.length < 200) {
        smallTitle = longTitle;
      } else {
        for (let i = 0; i <= 200; i++) {
          smallTitle += longTitle[i];
        }

        smallTitle += `...`;
      }
      blogSection.innerHTML += `
        <div>
        <p class="date">${human}</p>
        <p class="title">
          ${item.title}
        </p>
        <p class="description">
          ${smallTitle}
        </p>
        <a target="_blank" href="./read.html?id=${item.id}"><button>FULL STORY</button></a>
        
      </div>
      `;
    });
  }
};
