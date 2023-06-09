import {useRef} from 'react';

import Popup from './Popup';
import FormWithValidation from './FormWithValidation';
import Form from './Form';


const PopupWithForm = props => {
  const submitButtonRef = useRef();

  if (!props.validate && props.isOpen) {
    setTimeout(() => submitButtonRef.current?.focus(), 50);
  }
  
  return (
    <Popup base="light" type="form" isOpen={props.isOpen} onClose={props.onClose}>
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
    </Popup>
  );
};

export default PopupWithForm;