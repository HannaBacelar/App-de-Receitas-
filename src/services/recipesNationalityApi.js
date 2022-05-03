const recipesNationalityApi = async (countries) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countries}`);
  const data = await response.json();
  return data;
};
export default recipesNationalityApi;
