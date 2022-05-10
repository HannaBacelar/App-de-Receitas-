import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchAPINationality, fetchApiNationalityRecipes } from '../redux/actions';
import '../styles/ExploreNationality.css';

function ExploreFoodsByNationality() {
  const dispatch = useDispatch();

  const listNationality = useSelector((state) => state.nationality.nationality);

  const listNationalityRecipes = useSelector(
    (state) => state.recipesNationality.recipesNationality,
  );

  useEffect(() => {
    dispatch(fetchApiNationalityRecipes('All'));
    dispatch(fetchAPINationality());
  }, []);

  return (
    <div>
      <Header
        displaySearch
        pageTitle="Explore Nationalities"
      />
      <div className="selects">
        <select
          className="dropdown"
          data-testid="explore-by-nationality-dropdown"
          name="dropdonw"
          onChange={ ({ target: { value } }) => {
            dispatch(fetchApiNationalityRecipes(value));
          } }
        >
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {
            listNationality.map((element, index) => (
              <option
                key={ element.strArea + index }
                data-testid={ `${element.strArea}-option` }
              >
                {element.strArea}
              </option>))
          }
        </select>
      </div>
      <div className="recipes-cards-container">
        {
          listNationalityRecipes && listNationalityRecipes.map((meal, index) => {
            const max = 11;
            if (index > max) return;
            return (<Card
              type="foods"
              key={ meal.strMeal }
              img={ meal.strMealThumb }
              index={ index }
              title={ meal.strMeal }
              id={ meal.idMeal }
            />);
          })
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsByNationality;
