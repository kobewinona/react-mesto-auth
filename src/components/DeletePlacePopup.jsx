import {memo, useCallback} from 'react';

import PopupWithForm from './PopupWithForm';


const DeletePlacePopup = memo(props => {
  const handleSubmit = useCallback(event => {
    event.preventDefault();
    
    props.onDeletePlace(props.cardToDelete)
  }, [props]);
  
  return(
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Уверены?"
      name="delete-place"
      submitText="Да"
      {...props}
    />
  );
});

export default DeletePlacePopup;