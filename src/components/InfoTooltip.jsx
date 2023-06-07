import {useState} from 'react';


const InfoTooltip = () => {
  const [isShown, setIsShown] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(true);
  
  return (
    <section className={`tooltip ${isShown && 'tooltip_opened'}`}>
      <div className={`tooltip__container ${isShown ? 'grow' : 'shrink'}`}>
        <button className="close-button" type="button" aria-label="Закрыть."/>
        <div className={`tooltip__pict tooltip__pict_type_${isRegistrationSuccessful ? 'accept' : 'reject'}`}></div>
        <p className="tooltip__message">
          {isRegistrationSuccessful
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
          }</p>
      </div>
    </section>
  );
};

export default InfoTooltip;