import { useState, useEffect } from "react";

export function useMenuToggle() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = (e) => {
    e.preventDefault();
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // 메뉴 오픈 시 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return { menuOpen, openMenu, closeMenu };
}
