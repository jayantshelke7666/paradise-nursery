import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  const totalAmount = cart.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const handleIncrement = item => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = item => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = item => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map(item => (
        <div className="cart-row" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="cart-info">
            <h3>{item.name}</h3>
            <p>Unit price: ${item.cost}</p>
            <div className="qty-controls">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Total: ${item.cost * item.quantity}</p>
          </div>
          <button className="delete-btn" onClick={() => handleDelete(item)}>Delete</button>
        </div>
      ))}

      <h3>Total Cart Amount: ${totalAmount}</h3>

      <div className="cart-footer">
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;