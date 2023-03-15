interface ProductType {
  _id: string;
  name: string;
  image: any;
  brand: string;
  category: string;
  description: string;
  price: number;
}

interface CartProductType extends ProductType {
  cartQuantity: number;
}

export type { ProductType, CartProductType };
