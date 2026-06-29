import { useState } from "react";

export function usePopupExpiry() {
  // 페이지 로드시 로컬 스토리지 확인 (lazy initializer로 렌더 1번만 실행)
  const [showNotice, setShowNotice] = useState(() => {
    const expiryDate = localStorage.getItem("popupExpiry");
    const now = new Date().getTime();
    return !expiryDate || now > parseInt(expiryDate);
  });

  const handleClosePopup = () => {
    // '오늘 하루 보지않기' 체크 했다먼, 24시간 뒤의 시간 계산
    const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem("popupExpiry", expiry.toString());

    setShowNotice(false);
  };
  return { showNotice, setShowNotice, handleClosePopup };
}
