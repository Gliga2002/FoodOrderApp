import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';

// TODO: in React if you just pass textOnly, it will automatically be setted as true
function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo image" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly={true} className="">
          Cart (3)
        </Button>
      </nav>
    </header>
  );
}

export default Header;
