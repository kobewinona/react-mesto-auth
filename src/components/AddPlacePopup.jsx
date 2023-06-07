import {memo, useCallback, useState} from 'react';

import PopupWithForm from './PopupWithForm';
import InputWithValidation from './InputWithValidation';


const AddPlacePopup = memo(props => {
  const [inputValues, setInputValues] = useState({placeName: '', placeLink: ''});
  
  const handleValuesUpdate = useCallback((name, value) => {
    setInputValues((prevValues) => ({
      ...prevValues, [name]: value
    }));
  }, []);
  
  const handleSubmit = useCallback(() => {
    props.onAddPlace(inputValues)
  }, [props, inputValues]);
  
  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      submitText="Создать"
      onSubmit={handleSubmit}
      {...props}
    >
      <InputWithValidation
        isShown={props.isOpen}
        onUpdate={handleValuesUpdate}
        formPlace="popup"
        name="placeName"
        type="text"
        placeholder="Название"
        aria-label="Название."
        minLength="2"
        maxLength="30"
        required
      />
      <InputWithValidation
        isShown={props.isOpen}
        onUpdate={handleValuesUpdate}
        formPlace="popup"
        name="placeLink"
        type="url"
        placeholder="Ссылка на изображение"
        aria-label="Ссылка на изображение."
        required
      />
    </PopupWithForm>
  );
});

export default AddPlacePopup;