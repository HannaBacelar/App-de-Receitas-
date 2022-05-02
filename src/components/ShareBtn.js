import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ shareHandler }) {
  return (
    <button
      type="button"
      className="transparent"
      data-testid="share-btn"
      onClick={ shareHandler }
    >
      <img src={ shareIcon } alt="" />
    </button>
  );
}

ShareBtn.propTypes = {
  shareHandler: PropTypes.func.isRequired,
};

export default ShareBtn;
