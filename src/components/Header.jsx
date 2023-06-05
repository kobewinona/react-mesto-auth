import {memo} from 'react';

import logo from '../images/logo_white.svg';


const Header = memo(() => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия."/>
    </header>
  );
});

export default Header;