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
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/ordersheet" element={<OrderSheet />} />
        <Route path="/mypageOrderList" element={<MypageOrderList />} />
        <Route path="/mypageOrderDetail" element={<MypageOrderDetail />} />
        <Route path="/mypageQnaList" element={<MypageQnaList />} />
        <Route path="/mypageQnaDetail" element={<MypageQnaDetail />} />
        <Route path="/order-complete" element={<OrderComplete />} />
      </Routes>
    </>
  );
}

export default App;
