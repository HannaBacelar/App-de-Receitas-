const urlBuilder = (type, value) => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/';
  switch (type) {
  case 'ingredient-search-radio':
    return url.concat(`filter.php?i=${value}`);
  case 'name-search-radio':
    return url.concat(`search.php?s=${value}`);
  case 'first-letter-search-radio':
    return url.concat(`search.php?f=${value}`);
  default:
    break;
  }
  return url;
};

const fetchDrinks = async (type, value) => {
  const url = urlBuilder(type, value);
  const response = await fetch(url);
  const obj = await response.json();

  return obj;
};

export default fetchDrinks;
