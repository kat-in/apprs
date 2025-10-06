(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".hamburger__menu");
const nav_items = nav.querySelectorAll("li");
const faq = document.querySelectorAll(".accordion__question");
const priceCardButtons = document.querySelectorAll(".price__card__button button");
const modalOverlay = document.querySelector(".modal__overlay");
const modalCloseIcon = document.querySelector(".modal_cross");
modalOverlay.querySelector(".modal");
const slider = document.querySelector(".slider");
const slides = Array.from(slider.children);
const speed = 2;
const zone = 0.3;
let scrollTimer = null;
function centerSlider() {
  const totalWidth = slides.reduce((sum, s) => {
    const style = getComputedStyle(s);
    const marginRight = parseInt(style.marginRight) || 0;
    return sum + s.offsetWidth + marginRight;
  }, 0);
  slider.scrollLeft = (totalWidth - slider.clientWidth) / 2;
}
window.addEventListener("load", centerSlider);
window.addEventListener("resize", centerSlider);
function startScroll(direction) {
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  scrollTimer = setInterval(() => {
    slider.scrollLeft = Math.max(0, Math.min(slider.scrollLeft + speed * direction, maxScroll));
  }, 16);
}
slider.addEventListener("mousemove", (e) => {
  const x = e.clientX - slider.getBoundingClientRect().left;
  const w = slider.clientWidth;
  clearInterval(scrollTimer);
  if (x < w * zone) startScroll(-1);
  else if (x > w * (1 - zone)) startScroll(1);
});
slider.addEventListener("mouseleave", () => clearInterval(scrollTimer));
let isTouching = false;
let startX = 0;
let scrollStart = 0;
slider.addEventListener("touchstart", (e) => {
  isTouching = true;
  startX = e.touches[0].pageX;
  scrollStart = slider.scrollLeft;
});
slider.addEventListener("touchmove", (e) => {
  if (!isTouching) return;
  const dx = e.touches[0].pageX - startX;
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  slider.scrollLeft = Math.max(0, Math.min(scrollStart - dx, maxScroll));
});
slider.addEventListener("touchend", () => isTouching = false);
const handleOutsideClick = (e) => {
  if (e.target.classList.contains("modal_active")) {
    modalOverlay.classList.remove("modal_active");
    document.body.classList.remove("fixed");
    document.body.removeEventListener("click", handleOutsideClick);
  }
};
priceCardButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    modalOverlay.classList.add("modal_active");
    document.body.classList.add("fixed");
    document.body.addEventListener("click", handleOutsideClick);
  });
});
modalCloseIcon.addEventListener("click", () => {
  modalOverlay.classList.remove("modal_active");
  document.body.classList.remove("fixed");
});
faq.forEach((question, index) => {
  const faq_item = question.parentNode;
  question.addEventListener("click", (e) => {
    if (faq_item.classList.contains("active")) {
      faq.forEach((item) => {
        item.parentNode.classList.remove("active");
        item.lastElementChild.classList.remove("minus");
        item.lastElementChild.classList.add("plus");
      });
      localStorage.removeItem("activeAccordion");
    } else {
      faq.forEach((item) => {
        item.parentNode.classList.remove("active");
        item.lastElementChild.classList.remove("minus");
        item.lastElementChild.classList.add("plus");
      });
      faq_item.classList.add("active");
      question.lastElementChild.classList.remove("plus");
      question.lastElementChild.classList.add("minus");
      localStorage.setItem("activeAccordion", index);
    }
  });
});
let savedIndex = localStorage.getItem("activeAccordion");
if (savedIndex !== null) {
  const savedQuestion = faq[savedIndex];
  const faq_item = savedQuestion.parentNode;
  faq_item.classList.add("active");
  savedQuestion.lastElementChild.classList.remove("plus");
  savedQuestion.lastElementChild.classList.add("minus");
} else {
  const firstQuestion = faq[0];
  const firstItem = firstQuestion.parentNode;
  firstItem.classList.add("active");
  firstQuestion.lastElementChild.classList.remove("plus");
  firstQuestion.lastElementChild.classList.add("minus");
  localStorage.setItem("activeAccordion", 0);
}
hamburger.addEventListener("click", (e) => {
  if (nav.getAttribute("id") === "hide") {
    nav.setAttribute("id", "show");
    hamburger.classList.add("cross");
    hamburger.firstElementChild.classList.add("line_rigth");
    hamburger.firstElementChild.classList.remove("hamburger_small_line");
    hamburger.lastElementChild.classList.add("line_left");
    hamburger.lastElementChild.classList.remove("hamburger_line");
    document.body.classList.add("fixed");
  } else if (nav.getAttribute("id") === "show") {
    nav.setAttribute("id", "hide");
    hamburger.classList?.remove("cross");
    hamburger.firstElementChild.classList.add("hamburger_small_line");
    hamburger.firstElementChild.classList.remove("line_rigth");
    hamburger.lastElementChild.classList.add("hamburger_line");
    hamburger.lastElementChild.classList.remove("line_left");
    document.body.classList.remove("fixed");
  }
});
nav_items.forEach((item) => {
  item.addEventListener("click", (e) => {
    nav.setAttribute("id", "hide");
    hamburger.classList?.remove("cross");
    hamburger.firstElementChild.classList.add("hamburger_small_line");
    hamburger.firstElementChild.classList.remove("line_rigth");
    hamburger.lastElementChild.classList.add("hamburger_line");
    hamburger.lastElementChild.classList.remove("line_left");
    document.body.classList.remove("fixed");
  });
});
//# sourceMappingURL=index-OhX8UjTv.js.map
