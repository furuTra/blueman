import React from '../jsx-dom-shim';

function InputNameTsx() {
  const inputStyle = {
    fontSize: 'medium',
    height: '54px',
    borderRadius: '50px',
    border: 'none',
  };

  return (
    <div style='margin: auto; align-items: center; padding: 30px; display: flex;'>
      <input
        type='text'
        name='name'
        placeholder='Enter your name'
        style={inputStyle}
      />
    </div>
  );
}

export default InputNameTsx;
