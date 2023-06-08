import {forwardRef, useState, useEffect} from 'react';


const InputWithValidation = forwardRef(({name, onUpdate, isShown, formPlace, ...props}, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    setInputValue(props.defaultValue);
    setIsInputValid(true);
    setErrorMessage('');
  }, [props.defaultValue, isShown]);
  
  const handleInputsChange = event => {
    setInputValue(event.target.value);
    setIsInputValid(event.target.validity.valid);
    setErrorMessage(event.target.validationMessage);
    
    onUpdate(name, event.target.value);
  }
  
  return (
    <>
      <input
        ref={ref}
        className={`${formPlace}__form-input ${!isInputValid && `${formPlace}__form-input_invalid`}`}
        name={name}
        onChange={handleInputsChange}
        value={inputValue || ''}
        {...props}
      />
      <span className={`${formPlace}__form-error-message`}>{!isInputValid && errorMessage}</span>
    </>
  );
});

export default InputWithValidation;