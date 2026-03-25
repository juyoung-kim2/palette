export function initSite() {

  const header = document.getElementById("main_header");
  const SCROLL_POINT = 50;

  window.addEventListener("scroll", () => {
    if (window.scrollY > SCROLL_POINT) {
      header?.classList.add("is-scrolled");
    } else {
      header?.classList.remove("is-scrolled");
    }
  });
}
