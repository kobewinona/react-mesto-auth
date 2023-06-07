import {useState} from 'react';

import FormWithValidation from './FormWithValidation';


const Login = props => {
  const [inputValues, setInputValues] = useState({});
  
  const handleValuesUpdate = event => {
    setInputValues((prevValues) => ({
      ...prevValues, [event.target.name]: event.target.value
    }));
  };
  
  const handleSubmit = () => {
    props.onSignIn({
      email: inputValues['userEmail'],
      password: inputValues['userPassword']
    });
  };
  
  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <FormWithValidation submitText="Войти" onSubmit={handleSubmit} formPlace="auth" {...props}>
        <div className="auth__inputs-container">
          <input
            className="auth__form-input"
            onChange={handleValuesUpdate}
            name="userEmail"
            type="email"
            placeholder="Email"
            aria-label="Email."
            required
          />
          <input
            className="auth__form-input"
            onChange={handleValuesUpdate}
            name="userPassword"
            type="password"
            placeholder="Пароль"
            aria-label="Пароль."
            required
          />
        </div>
      </FormWithValidation>
    </section>
  );
};

export default Login;