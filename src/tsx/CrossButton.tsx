import React from '../jsx-dom-shim';
import CrossIcon from '@assets/icons/cross.png';

function CrossButtonTsx() {
  const Button = React.styled.button`
    height: 54px;
    width: 54px;
    border-radius: 50px;
    border: none;
    background-color: #d3d3d3;
  `;

  const Img = React.styled.img`
    position: center;
    height: 32px;
    width: 32px;
  `;

  return (
    <Button>
      <span>
        <Img src={CrossIcon} />
      </span>
    </Button>
  );
}

export default CrossButtonTsx;
