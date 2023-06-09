import {useState, useEffect} from 'react';

import Spinner from './Spinner';


const FormWithValidation = props => {
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
      onChange={handleChange}
      onSubmit={handleSubmit}
      className={`${props.formPlace}__form`}
      name={props.name}
      noValidate
    >
      {props.children}
      {props.isUpdating
        ? <Spinner theme={props.theme} size={props.size}/>
        : <button
            className={`${props.formPlace}__form-submit ${!isFormValid && `${props.formPlace}__form-submit_disabled`}`}
            type="submit"
            name="submit"
            disabled={!isFormValid}
          >{props.submitText || 'Сохранить'}</button>}
    </form>
  )
};

export default FormWithValidation;