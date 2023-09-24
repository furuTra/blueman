import React from '../jsx-dom-shim';

function InputNameTsx() {
  const Input = React.styled.input`
    font-size: medium;
    height: 54px;
    border-radius: 50px;
    border: none;
  `;

  return (
    <Input
      type='text'
      name='name'
      placeholder='Enter your name'
    />
  );
}

export default InputNameTsx;
