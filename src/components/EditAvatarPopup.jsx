import {useRef, useState} from 'react';

import PopupWithForm from './PopupWithForm';
import InputWithValidation from './InputWithValidation';


const EditAvatarPopup = props => {
  const avatarInputRef = useRef();
  
  const [inputValue, setInputValue] = useState({});
  
  const handleValueUpdate = (name, value) => {
    setInputValue({[name]: value});
  };
  
  const handleSubmit = () => {
    props.onUpdateAvatar(inputValue);
    
    avatarInputRef.current.value = '';
  };
  
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      submitText="Сохранить"
      onSubmit={handleSubmit}
      {...props}
    >
      <InputWithValidation
        ref={avatarInputRef}
        isShown={props.isOpen}
        onUpdate={handleValueUpdate}
        formPlace="popup"
        name="userAvatar"
        type="url"
        placeholder="Ссылка на изображение"
        aria-label="Ссылка на изображение."
        required
      />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;