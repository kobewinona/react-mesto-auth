import FormWithValidation from './FormWithValidation';


const Login = props => {
  const handleSubmit = event => {
    event.preventDefault();
  };
  
  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <FormWithValidation submitText="Войти" onSubmit={handleSubmit} formPlace="auth" {...props}>
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
    </section>
  );
};

export default Login;