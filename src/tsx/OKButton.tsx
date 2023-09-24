import React from '../jsx-dom-shim';

function OKButtonTsx() {
  const Button = React.styled.button`
    font-size: medium;
    height: 54px;
    width: 54px;
    border-radius: 50px;
    border: none;
    transition: background-color 0.3s;
    &:hover {
      background-color: #333;
    }
  `;

  return (
    <Button>
      <span>OK</span>
    </Button>
  );
}
export default OKButtonTsx;
