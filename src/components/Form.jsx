import {forwardRef} from 'react';

import Spinner from './Spinner';


const Form = forwardRef((props, ref) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className={`${props.formPlace}__form`}
      name={props.name}
    >
      {props.isUpdating
        ? <Spinner theme={props.theme} size={props.size}/>
        : <button
            ref={ref}
            className={`${props.formPlace}__form-submit`}
            type="submit"
            name="submit"
            autoFocus
          >{props.submitText || 'Сохранить'}</button>}
    </form>
  );
});

export default Form;