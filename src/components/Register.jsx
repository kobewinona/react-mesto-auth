import {Link} from 'react-router-dom';

import FormWithValidation from './FormWithValidation';


const Register = props => {
  const handleSubmit = event => {
    event.preventDefault();
  };
  
  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <FormWithValidation submitText="Зарегистрироваться" onSubmit={handleSubmit} formPlace="auth" {...props}>
        <div className="auth__inputs-container">
          <input
            className="auth__form-input"
            name="userEmail"
            type="email"
            placeholder="Email"
            aria-label="Email."
            required
          />
          <input
            className="auth__form-input"
            name="userPassword"
            type="password"
            placeholder="Пароль"
            aria-label="Пароль."
            required
          />
        </div>
      </FormWithValidation>
      <p className="auth__text">Уже зарегистрированы?
        <Link className="auth__link" to="/sign-in"> Войти</Link>
      </p>
    </section>
  );
};

export default Register;