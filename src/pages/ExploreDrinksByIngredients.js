import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { setDrinkSearchIngredient } from '../redux/actions/index';
import '../styles/ExploreByIngredients.css';

function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const ingredientsArray = [];
    const fetchIngredients = async () => {
      const results = await fetch(endPoint).then((response) => response.json());
      const max = 11;
      for (let index = 0; index <= max; index += 1) {
        ingredientsArray.push(results.drinks[index]);
      }
      setIngredients(ingredientsArray);
    };
    fetchIngredients();
  }, []);

  const handleClick = (value) => {
    dispatch(setDrinkSearchIngredient(value));
    history.push('/drinks');
  };

  return (
    <div>
      <Header
        pageTitle="Explore Ingredients"
      />
      <div className="cardsDiv">
        {
          ingredients && ingredients.map((e, index) => (
            <button
              type="button"
              key={ e.strIngredient1 }
              value={ e.strIngredient1 }
              onClick={ () => handleClick(e.strIngredient1) }
              data-testid={ `${index}-ingredient-card` }
            >
              <div className="ingredientCard">
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${e.strIngredient1}-Small.png` }
                  data-testid={ `${index}-card-img` }
                  alt={ e.strIngredient1 }
                />
              </div>
              <h2 data-testid={ `${index}-card-name` }>{ e.strIngredient1 }</h2>
            </button>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;
