import PopupWithForm from './PopupWithForm';


const DeletePlacePopup = props => {
  const handleSubmit = event => {
    event.preventDefault();
    
    props.onDeletePlace(props.cardToDelete)
  };
  
  return(
    <PopupWithForm
      onSubmit={handleSubmit}
      title="Уверены?"
      name="delete-place"
      submitText="Да"
      {...props}
    />
  );
};

export default DeletePlacePopup;