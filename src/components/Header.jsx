import {memo} from 'react';
// import {Link, useParams} from 'react-router-dom';

import logo from '../images/logo_white.svg';


const Header = memo(() => {
  // const {id} = useParams();
  
  // console.log(id);
  
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия."/>
      {/*{currentPath === '/sign-up' ? <Link to="/sign-in">Войти</Link> : <Link to="/sign-in">Зарегистрироваться</Link>}*/}
    </header>
  );
});

export default Header;