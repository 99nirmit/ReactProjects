import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from "./components/Home.jsx";
import { ProductDetails } from "./components/ProductDetails.jsx";
import { ProductList } from "./components/ProductList.jsx";
import { Cart } from "./components/Cart.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/products"> Product </Link>
        <Link to="/cart"> Cart </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App
