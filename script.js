/* ================================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadCommonLayout();
  initAgreement();
  initPickupTime();
  initOptionPopup();
  initOptionTabs();
  initOptionSelection();
  initToppingQty();
  initOptionChangeListener();
  updateSelectedOptions();
  bindFaqToggle();

  var mainswiper = new Swiper(".main-hero .swiper-container", {
    spaceBetween: 10,
    pagination: {
      el: ".main-hero .swiper-pagination",
      type: "progressbar",
    },
  });

  const header = document.getElementById("main_header");
  const SCROLL_POINT = 50; // 기준 px (원하는 값으로 조절)

  window.addEventListener("scroll", () => {
    if (window.scrollY > SCROLL_POINT) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  });
});

/* ================================
   공통 레이아웃 로드
================================ */
function loadCommonLayout() {
  const mainheader = document.getElementById("main_header");
  const header = document.getElementById("sub_header");
  const footer = document.getElementById("footer");
  const menu = document.getElementById("mobile-menu");
  const leftBanner = document.getElementById("leftBanner");

  if (header) {
    fetch("sub_header.html")
      .then((res) => res.text())
      .then((html) => {
        header.innerHTML = html;
        bindMobileMenu(); // 🔥 여기서 호출
      });
  }

  if (mainheader) {
    fetch("header.html")
      .then((res) => res.text())
      .then((html) => {
        mainheader.innerHTML = html;
        bindMobileMenu();
      });
  }

  if (footer) {
    fetch("footer.html")
      .then((res) => res.text())
      .then((html) => (footer.innerHTML = html));
  }

  if (menu) {
    fetch("sideMenu.html")
      .then((res) => res.text())
      .then((html) => {
        menu.innerHTML = html;
        bindMobileMenu();
      });
  }

  if (leftBanner) {
    fetch("left_banner.html")
      .then((res) => res.text())
      .then((html) => {
        leftBanner.innerHTML = html;

        const btn = document.getElementById("goCakeBuilder");
        if (btn) {
          btn.addEventListener("click", () => {
            location.href = "#";
          });
        }
      });
  }
}

/* ================================
   약관 토글
================================ */
function initAgreement() {
  document.querySelectorAll(".agree-row .arrow").forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const acc = arrow.closest(".agree-accordion");
      if (acc) acc.classList.toggle("open");
    });
  });

  const agreeAll = document.getElementById("agreeAll");
  const checks = document.querySelectorAll('.agree-item input[type="checkbox"]');

  if (!agreeAll) return;

  agreeAll.addEventListener("change", () => {
    checks.forEach((chk) => (chk.checked = agreeAll.checked));
  });
}

/* ================================
   픽업 시간 선택
================================ */
function initPickupTime() {
  const timeInput = document.getElementById("pickupTime");

  document.querySelectorAll(".pickup-time-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-disabled")) return;

      document.querySelectorAll(".pickup-time-btn").forEach((b) => b.classList.remove("is-active"));

      btn.classList.add("is-active");

      if (timeInput) {
        timeInput.value = btn.textContent.trim();
      }
    });
  });
}

/* ================================
   옵션 팝업
================================ */
function initOptionPopup() {
  const popup = document.getElementById("optionPopup");
  const openBtn = document.getElementById("openOptionPopup");
  const closeBtn = popup ? popup.querySelector(".popup-handle") : null;

  if (!popup || !openBtn || !closeBtn) return;

  openBtn.addEventListener("click", () => {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
    document.body.style.overflow = "";
  });
}

/* ================================
   옵션 탭 전환
================================ */
function initOptionTabs() {
  const tabs = document.querySelectorAll(".option-tabs .tab-item");
  const panels = document.querySelectorAll(".option-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      const key = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");

      const target = document.querySelector(`.option-panel[data-panel="${key}"]`);
      if (target) target.classList.add("active");
    });
  });
}

/* ================================
   옵션 선택 스타일
================================ */
function initOptionSelection() {
  document.querySelectorAll(".option-item").forEach((item) => {
    item.addEventListener("click", () => {
      const panel = item.closest(".option-panel");
      if (!panel) return;

      panel.querySelectorAll(".option-item").forEach((i) => i.classList.remove("selected"));

      item.classList.add("selected");
    });
  });
}

/* ================================
   옵션 변경 감지
================================ */
function initOptionChangeListener() {
  document.querySelectorAll(".option-item input").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.type === "checkbox") {
        if (input.checked) {
          input.dataset.selectedAt = Date.now();
        } else {
          delete input.dataset.selectedAt;
        }
      }
      updateSelectedOptions();
    });
  });
}

/* ================================
   토핑 수량
================================ */
function initToppingQty() {
  document.querySelectorAll(".topping-qty").forEach((box) => {
    const minus = box.querySelector(".qty-minus");
    const plus = box.querySelector(".qty-plus");
    const value = box.querySelector(".qty-value");
    const checkbox = box.closest(".option-item") ? box.closest(".option-item").querySelector('input[type="checkbox"]') : null;

    if (!minus || !plus || !value || !checkbox) return;

    minus.addEventListener("click", () => {
      let qty = parseInt(value.textContent, 10);
      if (qty > 1) {
        value.textContent = qty - 1;
      } else {
        checkbox.checked = false;
      }
      updateSelectedOptions();
    });

    plus.addEventListener("click", () => {
      let qty = parseInt(value.textContent, 10);
      value.textContent = qty + 1;
      checkbox.checked = true;

      if (!checkbox.dataset.selectedAt) {
        checkbox.dataset.selectedAt = Date.now();
      }

      updateSelectedOptions();
    });
  });
}

/* ================================
   선택 옵션 계산
================================ */
function updateSelectedOptions() {
  const baseNameEl = document.querySelector(".selected-base .name");
  const basePriceEl = document.querySelector(".selected-base .price");
  const toppingsBox = document.querySelector(".selected-toppings");
  const totalEl = document.querySelector(".total-amount");

  if (!baseNameEl || !basePriceEl || !totalEl || !toppingsBox) return;

  toppingsBox.innerHTML = "";
  let total = 0;

  const sheet = getSingleOption("cakeSheet", "sheetOption");
  const cream = getSingleOption("cream", "creamOption");

  if (!sheet && !cream) {
    baseNameEl.textContent = "선택안함";
    basePriceEl.textContent = "₩0";
  } else {
    const left = sheet ? sheet.name : "선택안함";
    const right = cream ? cream.name : "선택안함";

    baseNameEl.textContent = `${left} / ${right}`;
    basePriceEl.textContent = `₩${(sheet ? sheet.price : 0) + (cream ? cream.price : 0)}`;

    total += (sheet ? sheet.price : 0) + (cream ? cream.price : 0);
  }

  const toppings = Array.from(document.querySelectorAll('[data-panel="deco"] input[name="decoOption"]:checked')).sort((a, b) => {
    return Number(a.dataset.selectedAt) - Number(b.dataset.selectedAt);
  });

  toppings.forEach((input) => {
    const item = input.closest(".option-item");
    if (!item) return;

    const name = item.querySelector(".option-name").textContent;
    const price = parseInt(item.querySelector(".option-price").textContent.replace(/[^0-9]/g, ""), 10);
    const qty = parseInt(item.querySelector(".qty-value").textContent, 10);

    const sum = price * qty;
    total += sum;

    const div = document.createElement("div");
    div.className = "topping-item";
    div.innerHTML = `<span>${name} × ${qty}</span><span>₩${sum.toLocaleString()}</span>`;
    toppingsBox.appendChild(div);
  });

  totalEl.textContent = `₩${total.toLocaleString()}`;
}

/* ================================
   단일 옵션 헬퍼
================================ */
function getSingleOption(panelKey, inputName) {
  const input = document.querySelector(`[data-panel="${panelKey}"] input[name="${inputName}"]:checked`);

  if (!input) return null;

  const item = input.closest(".option-item");
  if (!item) return null;

  const nameEl = item.querySelector(".option-name");
  const priceEl = item.querySelector(".option-price");

  return {
    name: nameEl ? nameEl.textContent : "",
    price: priceEl ? parseInt(priceEl.textContent.replace(/[^0-9]/g, ""), 10) : 0,
  };
}

/*메뉴 토글*/
function bindMobileMenu() {
  const hamBtn = document.getElementById("hamOpen");
  const menuWrap = document.getElementById("mobile-menu");
  const menuClose = document.getElementById("menuClose");
  const menuDim = document.getElementById("menuDim");
  const headerClose = document.getElementById("headerClose");
  const headerbox = document.querySelector(".header");

  console.log("hamBtn:", hamBtn);
  console.log("menuClose:", menuClose);
  console.log("menuDim:", menuDim);
  console.log("headerclose", headerClose);

  if (!menuWrap) return;

  hamBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    menuWrap.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  menuClose?.addEventListener("click", () => {
    menuWrap.classList.remove("open");
    document.body.style.overflow = "";
  });

  menuDim?.addEventListener("click", () => {
    menuWrap.classList.remove("open");
    document.body.style.overflow = "";
  });

  if (headerClose && headerbox) {
    headerClose.addEventListener("click", (e) => {
      headerbox.classList.add("remove");
    });
  }
}

/*faq*/
function bindFaqToggle() {
  const faqList = document.querySelector(".faq-list-wrap");
  if (!faqList) return;

  faqList.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-head");
    if (!btn) return;

    const current = btn.closest(".faq-list");

    faqList.querySelectorAll(".faq-list").forEach((item) => {
      if (item !== current) item.classList.remove("open");
    });

    current.classList.toggle("open");
  });
}
