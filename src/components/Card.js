import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Card({ index, img, title, type, id }) {
  return (
    <Link to={ `/${type}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          alt={ title }
          data-testid={ `${index}-card-img` }
          width="100%"
          src={ img }
        />
        <h2 data-testid={ `${index}-card-name` }>{title}</h2>
      </div>
    </Link>
  );
}

Card.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Card;
