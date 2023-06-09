import {useState} from 'react';
import {Link} from 'react-router-dom';

import FormWithValidation from './FormWithValidation';


const Register = props => {
  const [inputValues, setInputValues] = useState({});

  const handleValuesUpdate = event => {
    setInputValues((prevValues) => ({
      ...prevValues, [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = () => {
    props.onSignUp({
      email: inputValues['userEmail'],
      password: inputValues['userPassword']
    });
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <FormWithValidation
        onSubmit={handleSubmit}
        submitText="Зарегистрироваться"
        formPlace="auth"
        theme="dark"
        size="small"
        {...props}
      >
        <div className="auth__inputs-container">
          <input
            onChange={handleValuesUpdate}
            className="auth__form-input"
            name="userEmail"
            type="email"
            placeholder="Email"
            aria-label="Email."
            required
          />
          <input
            onChange={handleValuesUpdate}
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