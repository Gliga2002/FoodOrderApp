import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import Modal from './UI/Modal';
import UserProgressContext from '../store/UserProgressContext';

export default function Cart() {
  const { items } = useContext(CartContext);
  const { progress, hideCart } = useContext(UserProgressContext);

  const cartTotal = items.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );
  return (
    <Modal className="cart" open={progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCart}>
          Close
        </Button>
        <Button onClick={hideCart}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
