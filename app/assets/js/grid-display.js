/*
  En appuyant sur les touches S et X du clavier vous pouvez afficher la grille pour vous 
  aider dans vos développements.
*/
var currentKeyCode = "";
document.addEventListener("keydown", (function(e) {
  if (e.key === "s") {
    currentKeyCode = e.key;
  }
}));
document.addEventListener("keyup", (function(e) {
  var grid = document.querySelector(".grid-container");
  if (e.key === "x" && currentKeyCode === 's') {
    grid.classList.toggle("active");
  }
  currentKeyCode = "";
}));

