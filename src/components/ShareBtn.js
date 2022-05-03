import PropTypes from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ toastVisibilityHandler, isInACard, index, url }) {
  const handleShare = () => {
    const toastShownTime = 800;
    console.log('oi');
    const targetURL = url || window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(targetURL);
    toastVisibilityHandler(true);
    setTimeout(() => {
      toastVisibilityHandler(false);
    }, toastShownTime);
  };

  return (
    <button
      type="button"
      className="transparent"
      onClick={ handleShare }
    >
      <img
        data-testid={ isInACard ? `${index}-horizontal-share-btn` : 'share-btn' }
        src={ shareIcon }
        alt="Share this recipe"
      />
    </button>
  );
}

ShareBtn.defaultProps = {
  isInACard: false,
  index: 0,
  url: '',
};

ShareBtn.propTypes = {
  toastVisibilityHandler: PropTypes.func.isRequired,
  isInACard: PropTypes.bool,
  index: PropTypes.number,
  url: PropTypes.string,
};

export default ShareBtn;
