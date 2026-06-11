import { useState, useEffect } from "react";

export function usePopupExpiry() {
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    // 1. 페이지 로드시 로컬 스토리지 확인
    const expiryDate = localStorage.getItem("popupExpiry");
    const now = new Date().getTime();

    // 저장된 시간이 없거나, 현재 시간이 먄료 시간을 지났다면 팝업 띄우기
    if (!expiryDate || now > parseInt(expiryDate)) {
      setShowNotice(true);
    } else {
      setShowNotice(false);
    }
  }, []);

  const handleClosePopup = () => {
    // '오늘 하루 보지않기' 체크 했다먼, 24시간 뒤의 시간 계산
    const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem("popupExpiry", expiry.toString());

    setShowNotice(false);
  };
  return { showNotice, setShowNotice, handleClosePopup };
}
