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

// Création automatique des colonnes de la grille
for (let i = 0; i < 24; i ++) {
  var e = document.createElement("div");
  e.setAttribute("class", "grid-column");
  document.querySelector(".grid-display").appendChild(e);
}