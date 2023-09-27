import React from '../jsx-dom-shim';
import GearIcon from '@assets/icons/gear.png';

function SettingButtonTsx() {
  const Button = React.styled.button`
    opacity: 0.5;
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
        <Img src={GearIcon} />
      </span>
    </Button>
  );
}
export default SettingButtonTsx;
