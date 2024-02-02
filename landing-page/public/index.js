const themeBtn = document.querySelector("#themeBtn");
const menuBtn = document.querySelector("#menuBtn");
const menu = document.querySelector("#menu");
const date = document.querySelector("#date");

const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

darkTheme && document.body.classList.add("dark");

themeBtn.addEventListener("click", () => document.body.classList.toggle("dark"));
menuBtn.addEventListener("click", () => menu.classList.toggle("hidden"));

date.textContent = new Date().getFullYear();
