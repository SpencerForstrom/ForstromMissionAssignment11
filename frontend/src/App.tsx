import './App.css';
import Bookstore from './components/BookstoreList';
import AdminBookPage from './pages/AdminBookPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Bookstore />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/adminbooks" element={<AdminBookPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
