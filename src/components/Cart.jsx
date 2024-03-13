import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import Modal from './UI/Modal';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

export default function Cart() {
  console.log('<Cart/>');
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );
  // TODO: Sa ovaj Modal je nastao bag, jjer onClose se trigger kad se zatvara ovaj modal
  // A zatvorice se ako sam na cart i odem checkout, ovaj se zatvara i hideCart is triggered and therefore my progress is '' and no 'checkout'
  return (
    <Modal
      className="cart"
      open={progress === 'cart'}
      onClose={progress === 'cart' ? hideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          console.log(item);
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => addItem(item)}
              onDecrease={() => removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={showCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
