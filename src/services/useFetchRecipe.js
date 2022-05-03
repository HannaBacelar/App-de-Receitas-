import { useEffect, useState } from 'react';

export default function useFetchRecipe(type, id) {
  const [recipe, setFetchedRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      const RECIPE_URL = (type === 'Meal')
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(RECIPE_URL);
      const result = await response.json();
      const fetchedRecipe = (type === 'Meal')
        ? result.meals[0]
        : result.drinks[0];
      setFetchedRecipe(fetchedRecipe);
      console.log(fetchedRecipe);
    };
    fetchRecipe();
  }, [id, type]);

  return recipe;
}
