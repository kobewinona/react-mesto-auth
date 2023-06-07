import {memo, useState, useEffect} from 'react';

import Spinner from './Spinner';

//TODO transform into HOC


const FormWithValidation = memo(({formPlace, ...props}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputsValidity, setInputsValidity] = useState({});
  
  const handleChange = event => {
    const inputs = Array.from(event.currentTarget.elements);
    
    const currentInputsValidity = inputs.reduce((validity, input) => {
      validity[input.name] = input.validity.valid;
      return validity;
    }, {});
    
    setInputsValidity(currentInputsValidity);
  };
  
  const validateForm = () => {
    const inputValues = Object.values(inputsValidity);

    if (inputValues.length === 0) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(inputValues.every((i) => i === true));
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    
    if (event.target.checkValidity()) {
      props.onSubmit();
    }
    
    setIsFormValid(false);
  }

  useEffect(() => {
    validateForm();
  
    // eslint-disable-next-line
  }, [inputsValidity])
  
  useEffect(() => {
    setInputsValidity({});
  }, [props.isOpen])
  
  return (
    <form
      className={`${formPlace}__form`}
      name={props.name}
      onChange={handleChange}
      onSubmit={handleSubmit}
      noValidate
    >
      {props.children}
      {props.isLoading
        ? <Spinner/>
        : <button
          className={`${formPlace}__form-submit ${!isFormValid && `${formPlace}__form-submit_disabled`}`}
          type="submit"
          name="submit"
          disabled={!isFormValid}
        >{props.submitText || 'Сохранить'}</button>}
    </form>
  )
});

export default FormWithValidation;