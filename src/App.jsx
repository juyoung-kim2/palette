import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Order from "./Pages/Order";
import Cart from "./Pages/Cart";
import OrderSheet from "./Pages/OrderSheet";
import OrderComplete from "./Pages/Order-complete";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/ordersheet" element={<OrderSheet />} />
      <Route path="/order-complete" element={<OrderComplete />} />
    </Routes>
  );
}

export default App;
