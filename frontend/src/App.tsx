import './App.css';
import Bookstore from './Bookstore';
import CartPage from './components/CartPage';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Bookstore />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
