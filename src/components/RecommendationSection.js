import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import '../styles/RecommendationSection.css';

function RecommendationsSection({ recommendations }) {
  const sliderSettings = {
    dots: true,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  };

  return (
    <Slider { ...sliderSettings } className="slider">
      {recommendations.map((item, index) => {
        const max = 5;
        if (index > max) return;
        return (
          <div
            key={ index }
            className="recommendation-card"
            data-testid={ `${index}-recomendation-card` }
          >
            <h4
              className="recommendation-title"
              data-testid={ `${index}-recomendation-title` }
            >
              {item?.strMeal || item.strDrink}
            </h4>
            <span className="recommendation-tag">
              {item?.strAlcoholic || item.strCategory}
            </span>
            <div className="image-overlay" />
            <img alt="" src={ item?.strMealThumb || item.strDrinkThumb } />
          </div>
        );
      })}
    </Slider>
  );
}

RecommendationsSection.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes).isRequired,
};

export default RecommendationsSection;
