import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지 경로(pathname)가 바뀔 때마다 스크롤을 맨 위로!
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 화면에 아무것도 그리지 않음, 꼭 return을 써야함
};

export default ScrollToTop;
