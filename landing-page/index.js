import { t, switchLanguage } from "./utils/i18n";

const elements = document.querySelectorAll("[data-i18n]");

elements.forEach(
  (element) => (element.textContent = t(element.getAttribute("data-i18n"))),
);

const themeBtn = document.querySelector("#themeBtn");
const langBtn = document.querySelector("#langBtn");
const menuBtn = document.querySelector("#menuBtn");
const menu = document.querySelector("#menu");
const date = document.querySelector("#date");

const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

darkTheme && document.body.classList.add("dark");

themeBtn.addEventListener("click", () =>
  document.body.classList.toggle("dark"),
);

langBtn.addEventListener("click", () => switchLanguage());

menuBtn.addEventListener("click", () => menu.classList.toggle("hidden"));

date.textContent = new Date().getFullYear();
