const navToggle = document.querySelector(".nav__toggle");
const navList = document.querySelector(".nav__list");
const chatbotToggle = document.querySelector(".chatbot__toggle");
const chatbotWindow = document.querySelector("#chatbot-window");
const chatbotClose = document.querySelector(".chatbot__close");
const chatbotForm = document.querySelector(".chatbot__form");
const chatbotMessages = document.querySelector(".chatbot__messages");
const yearEl = document.querySelector("#year");

const toggleNav = () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navList.classList.toggle("nav__list--open");
};

const closeNavOnLinkClick = () => {
  if (window.innerWidth <= 900) {
    navToggle.setAttribute("aria-expanded", "false");
    navList.classList.remove("nav__list--open");
  }
};

const setChatbotVisibility = (shouldOpen) => {
  if (!chatbotWindow) return;

  chatbotWindow.classList.toggle("chatbot__window--open", shouldOpen);
  chatbotWindow.setAttribute("aria-hidden", String(!shouldOpen));

  if (chatbotToggle) {
    chatbotToggle.setAttribute("aria-expanded", String(shouldOpen));
    chatbotToggle.classList.toggle("chatbot__toggle--active", shouldOpen);
  }
};

const toggleChatbot = () => {
  const isOpen = chatbotWindow.classList.contains("chatbot__window--open");
  setChatbotVisibility(!isOpen);
};

const appendChatMessage = (author, text) => {
  const message = document.createElement("p");
  message.innerHTML = `<strong>${author}:</strong> ${text}`;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTo({ top: chatbotMessages.scrollHeight, behavior: "smooth" });
};

const handleChatSubmit = (event) => {
  event.preventDefault();
  const input = chatbotForm.querySelector("input");
  const value = input.value.trim();

  if (!value) return;

  appendChatMessage("You", value);
  input.value = "";

  setTimeout(() => {
    appendChatMessage("Nova Assistant", "Thanks for reaching out! A launch specialist will follow up shortly.");
  }, 900);
};

if (navToggle && navList) {
  navToggle.addEventListener("click", toggleNav);
  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavOnLinkClick);
  });
}

if (chatbotToggle && chatbotWindow) {
  chatbotToggle.addEventListener("click", toggleChatbot);
}

if (chatbotClose) {
  chatbotClose.addEventListener("click", () => setChatbotVisibility(false));
}

if (chatbotForm) {
  chatbotForm.addEventListener("submit", handleChatSubmit);
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

setChatbotVisibility(false);

