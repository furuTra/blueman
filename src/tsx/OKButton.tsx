import React from '../jsx-dom-shim';

function OKButtonTsx() {
  const buttonStyle = {
    fontSize: 'medium',
    height: '54px',
    width: '54px',
    borderRadius: '50px',
    // border: 'none',
  };

  return (
    <button style={buttonStyle}>
      <span>OK</span>
    </button>
  );
}
export default OKButtonTsx;
