import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleContinue = () => {
    const returnPath = sessionStorage.getItem('returnPath') || '/';
    navigate(returnPath);
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => updateQuantity(item.bookID, Number(e.target.value))}
                    />
                  </td>
                  <td>${item.subtotal.toFixed(2)}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.bookID)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ${total.toFixed(2)}</h4>

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-secondary" onClick={handleContinue}>Continue Shopping</button>
            <button className="btn btn-outline-danger" onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
