import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Order from "./Pages/Order"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
    </Routes>
  )
}

export default App