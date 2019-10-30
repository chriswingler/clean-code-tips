export interface Leaf {
  text: string;
  type: string;
}

export interface SecondaryCategory {
  [key: string]: Leaf;
}

export interface SecondaryCategories {
  [key: string]: SecondaryCategory;
}

export interface PrimaryCategory {
  [key: string]: Leaf;
}

export interface PrimaryCategories {
  [key: string]: PrimaryCategory;
}
