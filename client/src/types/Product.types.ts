type Product = {
  _id: { $oid: string };
  name: string;
  images: string[];
  brand: string;
  category: string;
  description: string;
  price: number;
};

export type { Product };
