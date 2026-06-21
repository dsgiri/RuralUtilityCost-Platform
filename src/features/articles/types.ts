export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface Author {
  name: string;
  image: SanityImage;
}

export interface Category {
  title: string;
  description: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author?: Author;
  mainImage?: SanityImage;
  categories?: Category[];
  publishedAt: string;
  body?: any[];
  excerpt?: string;
}
