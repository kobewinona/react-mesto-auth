import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';


const AccountMenu = ({ children }) => {
  const currentPath = useLocation();
  const [isAccountMenuShown, setIsAccountMenuShown] = useState(false);
  
  const toggleAccountMenu = () => {
    setIsAccountMenuShown(!isAccountMenuShown);
  };
  
  const renderLink = () => {
    if (currentPath.pathname === '/sign-up') {
      return <Link className="header__link" to="/sign-in" replace={true}>Войти</Link>
    } else if (currentPath.pathname === '/sign-in') {
      return <Link className="header__link" to="/sign-up" replace={true}>Регистрация</Link>
    } else {
      return <button onClick={toggleAccountMenu}>Menu</button>;
    }
  };
  
  return (
    <>
      {isAccountMenuShown && (
        <div className="header__account">
          <div className="header__account-container">
            <p className="header__account-user-info">d.klimkin@icloud.com</p>
            <button className="header__account-button">Выйти</button>
          </div>
        </div>
      )}
      {renderLink()}
      {children}
    </>
  );
};

export default AccountMenu;