import { screen } from '@testing-library/react';

const getElements = async (type, page = 'details') => {
  let video;
  let recommendations;
  let startRecipeBtn;
  let finishRecipeBtn;
  if (type === 'food' && page === 'details') video = await screen.findByTestId('video');
  const photo = await screen.findByTestId('recipe-photo');
  const title = await screen.findByTestId('recipe-title');
  const category = await screen.findByTestId('recipe-category');
  const shareBtn = await screen.findByTestId('share-btn');
  const favoriteBtn = await screen.findByTestId('favorite-btn');
  if (page === 'details') {
    recommendations = await screen.findAllByTestId(/-recomendation-card/);
    startRecipeBtn = await screen.findByTestId('start-recipe-btn');
  } else {
    finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');
  }

  return { photo,
    title,
    category,
    shareBtn,
    favoriteBtn,
    recommendations,
    video,
    startRecipeBtn,
    finishRecipeBtn };
};

export default getElements;
