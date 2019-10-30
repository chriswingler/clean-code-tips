import { PrimaryCategories } from '../types/types';

const transformCategory = (
  primaryCategories: PrimaryCategories
): Array<string> => {
  // Transform categories into an array of keys, so they can be indexed
  const categoryKeys: Array<string> = Object.keys(primaryCategories);

  return categoryKeys;
};

export default transformCategory;
