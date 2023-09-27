import React from '../jsx-dom-shim';

function OKButtonTsx() {
  const Button = React.styled.button`
    font-size: medium;
    height: 54px;
    width: 54px;
    border-radius: 50px;
    border: none;
    background-color: #e0ffff
  `;

  return (
    <Button>
      <span>OK</span>
    </Button>
  );
}
export default OKButtonTsx;
