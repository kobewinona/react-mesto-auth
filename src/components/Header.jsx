import {memo} from 'react';
import {Link, useLocation} from 'react-router-dom';

import logo from '../images/logo_white.svg';


const Header = memo(() => {
  const currentPath = useLocation();
  
  const renderLink = () => {
    if (currentPath.pathname === '/sign-up') {
      return <Link className="header__link" to="/sign-in" replace={true}>Войти</Link>
    } else if (currentPath.pathname === '/sign-in') {
      return <Link className="header__link" to="/sign-up" replace={true}>Регистрация</Link>
    } else {
      return null;
    }
  };
  
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Место Россия."/>
        {renderLink()}
      </div>
      {/*here must be a link to /sign-in if the current url is /sign-up, or sign-up if the current url is /sign-in*/}
    </header>
  );
});

export default Header;