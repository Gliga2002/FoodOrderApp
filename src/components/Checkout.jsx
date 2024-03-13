import { useContext, useState } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import { postOrder } from '../util/http';

export default function Checkout() {
  console.log('Checkout');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { items } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    // ne treba ti useEffect jer je u okviru cb function, nece da napravi infinite loop
    // mozes i da outsource ovo kad radi u separate file
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await postOrder(customerData, items);
        setIsSuccess(response);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }

    fetchData();
  }

  let content = (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

      <Input label="Full Name" type="text" id="name" />
      <Input label="E-mail Adress" type="email" id="email" />
      <Input label="Street" type="text" id="street" />
      <div className="control-row">
        <Input label="Postal Code" type="text" id="postal-code" />
        <Input label="City" type="text" id="city" />
      </div>
      <p className="modal-actions">
        <Button type="button" textOnly onClick={hideCheckout}>
          Close
        </Button>
        <Button>Submit Order</Button>
      </p>
    </form>
  );

  if (isLoading) {
    content = <p className="center-text">Loading data...</p>;
  }

  if (error && !isLoading) {
    content = <p className="center-text">Failed to post data...</p>;
    <Button
      type="button"
      textOnly
      onClick={() => {
        hideCheckout();
        setError(false);
      }}
    >
      Close
    </Button>;
  }

  if (isSuccess && !isLoading) {
    content = (
      <>
        <p className="center-text">Cestitamo, uspesno ste submit data</p>;
        <Button
          type="button"
          textOnly
          onClick={() => {
            hideCheckout();
            setIsSuccess(false);
          }}
        >
          Close
        </Button>
        ;
      </>
    );
  }

  console.log(content);

  return (
    <Modal
      open={progress === 'checkout'}
      onClose={() => {
        hideCheckout();
        setIsSuccess(false);
        setError(false);
      }}
    >
      {content}
    </Modal>
  );
}
