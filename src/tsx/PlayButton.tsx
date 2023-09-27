import React from '../jsx-dom-shim';
import ForwardIcon from '@assets/icons/forward.png';

function PlayButtonTsx() {
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
        <Img src={ForwardIcon} />
      </span>
    </Button>
  );
}
export default PlayButtonTsx;
