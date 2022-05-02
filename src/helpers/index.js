export function getTodaysDate() {
  const currentDate = new Date();
  const decimal = 10; // uses this to verify if number requires a 0
  const day = currentDate.getDate() < decimal
    ? `0${currentDate.getDate()}`
    : currentDate.getDate();
  const month = currentDate.getMonth() < decimal
    ? `0${currentDate.getMonth()}`
    : currentDate.getMonth();
  const year = currentDate.getFullYear();
  const today = `${day}/${month}/${year}`;

  return today;
}

export function getDoneRecipeObject(id, type, recipe) {
  return { id,
    type: type === 'Drink' ? 'drink' : 'food',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: recipe?.strAlcoholic || '',
    name: recipe[`str${type}`],
    image: recipe[`str${type}Thumb`],
    doneDate: getTodaysDate(),
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  };
}
