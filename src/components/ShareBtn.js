import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ toastVisibilityHandler }) {
  const handleShare = () => {
    const toastShownTime = 800;
    navigator.clipboard.writeText(window.location.href.replace('/in-progress', ''));
    toastVisibilityHandler(true);
    setTimeout(() => {
      toastVisibilityHandler(false);
    }, toastShownTime);
  };

  return (
    <button
      type="button"
      className="transparent"
      data-testid="share-btn"
      onClick={ handleShare }
    >
      <img src={ shareIcon } alt="" />
    </button>
  );
}

ShareBtn.propTypes = {
  toastVisibilityHandler: PropTypes.func.isRequired,
};

export default ShareBtn;
