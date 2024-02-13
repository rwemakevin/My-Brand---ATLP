const btn = document.getElementById("btn-toogle");
let div = document.getElementById("reveal");
div.style.left = "-300px";
const toogleNavBar = () => {
  //alert(div.textContent);

  if (div.style.left === "-300px") {
    div.style.left = "0";
    console.log("Set to 0 (SHow)");
  } else {
    div.style.left = "-300px";
    console.log("Set to -250px (Hide) ");
  }
};

const hideNav = () => {
  div.style.left = "-300px";
};
