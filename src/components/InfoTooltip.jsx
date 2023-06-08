const InfoTooltip = ({isOpen, isAuthSuccessful, onClose}) => {
  return (
    <section className={`tooltip ${isOpen && 'tooltip_opened'}`} onClick={onClose}>
      <div className={`tooltip__container ${isOpen ? 'grow' : 'shrink'}`} onClick={event => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} type="button" aria-label="Закрыть."/>
        <div className={`tooltip__pict tooltip__pict_type_${isAuthSuccessful ? 'accept' : 'reject'}`}></div>
        <p className="tooltip__message">
          {isAuthSuccessful
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
          }</p>
      </div>
    </section>
  );
};

export default InfoTooltip;