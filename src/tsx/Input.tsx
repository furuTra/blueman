import React from '../jsx-dom-shim';

function InputTsx() {
  return (
    <div>
      <input
        type='text'
        name='name'
        placeholder='Enter you name'
        style='font-size: 32px'
      />
      <input
        type='button'
        name='nameButton'
        value='ok!'
        style='font-size: 32px'
      />
    </div>
  );
}

export default InputTsx;
