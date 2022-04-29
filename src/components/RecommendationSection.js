import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';

function RecommendationsSection({ recommendations }) {
  const sliderSettings = {
    dots: true,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
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
            <div className="recommendation-img-container">
              <img alt="" src={ item?.strMealThumb || item.strDrinkThumb } />
            </div>
            <h4 data-testid={ `${index}-recomendation-title` }>
              {item?.strMeal || item.strDrink}
            </h4>
            <span>
              {item?.strAlcoholic || item.strCategory}
            </span>
          </div>
        );
      })}
    </Slider>
  );
}

RecommendationsSection.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default RecommendationsSection;
