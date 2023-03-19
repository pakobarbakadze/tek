import { CartProductType } from "../../types/Product.types";

type CartCardProps = {
  cartItem: CartProductType;
  onRemoveClick: (cartItem: CartProductType) => void;
};

export type { CartCardProps };
