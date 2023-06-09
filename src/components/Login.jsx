import {useState, useCallback} from 'react';

import FormWithValidation from './FormWithValidation';


const Login = props => {
  const [inputValues, setInputValues] = useState({});
  
  const handleValuesUpdate = event => {
    setInputValues((prevValues) => ({
      ...prevValues, [event.target.name]: event.target.value
    }));
  };
  
  const handleSubmit = useCallback(() => {
    props.onSignIn({
      email: inputValues['userEmail'],
      password: inputValues['userPassword']
    });
  }, [props, inputValues]);
  
  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
        <FormWithValidation
          onSubmit={handleSubmit}
          submitText="Войти"
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
    </section>
  );
};

export default Login;