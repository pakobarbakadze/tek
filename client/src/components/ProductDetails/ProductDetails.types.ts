import { ProductType } from "../../types/Product.types";

type ProductInfoProps = {
  product: ProductType | undefined;
  onButtonClick: () => void;
};

export type { ProductInfoProps };
