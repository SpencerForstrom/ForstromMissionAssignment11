import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartSummary() {
  const { cart, total } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null; // Hide if cart is empty

  return (
    <div
      className="position-fixed top-0 end-0 m-3 p-3 bg-light border rounded shadow"
      style={{ zIndex: 1050, minWidth: '220px' }}
    >
      <div className="mb-2">
        <strong>{totalItems}</strong> item{totalItems !== 1 ? 's' : ''} in cart
      </div>
      <div className="mb-2">
        Total: <strong>${total.toFixed(2)}</strong>
      </div>
      <Link to="/cart" className="btn btn-sm btn-primary w-100">
        View Cart
      </Link>
    </div>
  );
}

export default CartSummary;
