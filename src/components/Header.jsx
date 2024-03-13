import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';

import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

// TODO: in React if you just pass textOnly, it will automatically be setted as true
function Header() {
  console.log('<Header/>')
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const numberOfCartItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo image" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly={true} className="" onClick={() => showCart()}>
          Cart ({numberOfCartItems})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
