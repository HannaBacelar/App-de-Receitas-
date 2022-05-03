import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Header from '../components/Header';
import { fetchAPINationality, fetchApiNationalityRecipes } from '../redux/actions';

function ExploreFoodsByNationality() {
  const dispatch = useDispatch();

  const listNationality = useSelector((state) => state.nationality.nationality);
  const listNationalityRecipes = useSelector(
    (state) => state.recipesNationality.recipesNationality,
  );

  useEffect(() => {
    dispatch(fetchApiNationalityRecipes('American'));
    dispatch(fetchAPINationality());
  }, []);

  return (
    <div>
      <Header
        displaySearch
        pageTitle="Explore Nationalities"
      />

      <select
        data-testid="explore-by-nationality-dropdown"
        name="dropdonw"
        onChange={ ({ target: { value } }) => {
          dispatch(fetchApiNationalityRecipes(value));
        } }
      >
        {
          listNationality && listNationality.map((element, index) => (
            <option
              key={ element.strArea + index }
              data-testid={ `${element.strArea}-option` }
            >
              {element.strArea}
            </option>))
        }
      </select>
      {
        listNationalityRecipes && listNationalityRecipes.map((meal, index) => {
          const max = 11;
          if (index > max) return;
          return (<Card
            key={ meal.strMeal }
            img={ meal.strMealThumb }
            index={ index }
            title={ meal.strMeal }
          />);
        })
      }

      <Footer />
    </div>
  );
}

export default ExploreFoodsByNationality;
