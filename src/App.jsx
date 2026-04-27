import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./Pages/Home";
import Order from "./Pages/Order";
import Cart from "./Pages/Cart";
import Mypage from "./Pages/Mypage";
import MypageOrderList from "./Pages/Mypage-orderList";
import MypageOrderDetail from "./Pages/Mypage-orderDetail";
import MypageQnaList from "./Pages/Mypage-qna-list";
import MypageQnaDetail from "./Pages/Mypage-qna-detail";
import OrderSheet from "./Pages/OrderSheet";
import OrderComplete from "./Pages/Order-complete";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 메인 및 주요 서비스 경로 */}
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ordersheet" element={<OrderSheet />} />
        <Route path="/order-complete" element={<OrderComplete />} />

        {/* 마이페이지 관련 경로 (소문자/하이픈으로 통일) */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage-order-list" element={<MypageOrderList />} />
        <Route path="/mypage-order-detail" element={<MypageOrderDetail />} />
        <Route path="/mypage-qna-list" element={<MypageQnaList />} />
        <Route path="/mypage-qna-detail" element={<MypageQnaDetail />} />
      </Routes>
    </>
  );
}

export default App;
