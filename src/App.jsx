import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// pages
import Home from "./pages/Home";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Mypage from "./pages/Mypage";
import MypageOrderList from "./pages/Mypage-orderList";
import MypageOrderDetail from "./pages/Mypage-orderDetail";
import MypageQnaList from "./pages/Mypage-qna-list";
import MypageQnaDetail from "./pages/Mypage-qna-detail";
import MypageQnaWrite from "./pages/Mypage-qna-write";
import OrderSheet from "./pages/OrderSheet";
import OrderComplete from "./pages/Order-complete";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 메인 및 주요 서비스 경로 */}
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-sheet" element={<OrderSheet />} />
        <Route path="/order-complete" element={<OrderComplete />} />

        {/* 마이페이지 관련 경로 (소문자/하이픈으로 통일) */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage-order-list" element={<MypageOrderList />} />
        <Route path="/mypage-order-detail" element={<MypageOrderDetail />} />
        <Route path="/mypage-qna-list" element={<MypageQnaList />} />
        <Route path="/mypage-qna-detail" element={<MypageQnaDetail />} />
        <Route path="/mypage-qna-write" element={<MypageQnaWrite />} />
      </Routes>
    </>
  );
}

export default App;
