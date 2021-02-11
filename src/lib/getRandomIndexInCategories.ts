const getRandomIndexInCategories = (categoryKeys: Array<string>): number => {
  // Grab a random index from array of keys
  const randomCategoryIndex: number = categoryKeys.indexOf(
    categoryKeys[Math.floor(categoryKeys.length * Math.random())]
  );

  return randomCategoryIndex;
};

export default getRandomIndexInCategories;
