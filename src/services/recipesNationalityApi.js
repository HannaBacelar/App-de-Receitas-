const recipesNationalityApi = async (contries) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${contries}`);
  const data = await response.json();
  return data;
};
export default recipesNationalityApi;
