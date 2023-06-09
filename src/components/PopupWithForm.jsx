import {memo, useRef} from 'react';

import FormWithValidation from './FormWithValidation';
import Form from './Form';


const PopupWithForm = memo(props => {
  const submitButtonRef = useRef();

  if (!props.validate && props.isOpen) {
    setTimeout(() => submitButtonRef.current?.focus(), 50);
  }
  
  return (
    <section className={`popup popup_base_light ${props.isOpen && 'popup_opened'}`} onClick={props.onClose}>
      <div
        className={`popup__container popup__container_type_form ${props.isOpen ? 'grow' : 'shrink'}`}
        onClick={event => event.stopPropagation()}
      >
        <button
          className="close-button" type="button" aria-label="Закрыть." onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        {props.validate
          ? <FormWithValidation
              onSubmit={props.onSubmit}
              formPlace="popup"
              theme="light"
              size="small"
              {...props}
            >
              {props.children}
            </FormWithValidation>
          : <Form
              ref={submitButtonRef}
              onSubmit={props.onSubmit}
              formPlace="popup"
              theme="light"
              size="small"
              {...props}>
              {props.children}
            </Form>
        }
      </div>
    </section>
  );
});

export default PopupWithForm;