import PropTypes from 'prop-types';
import React from 'react';
import '../styles/ShareToast.css';

function ShareToast({ isToastVisible }) {
  return (
    <div className={ `share-toast ${isToastVisible && 'visible'}` }>
      <p>Link copied!</p>
    </div>
  );
}

ShareToast.propTypes = {
  isToastVisible: PropTypes.bool.isRequired,
};

export default ShareToast;
