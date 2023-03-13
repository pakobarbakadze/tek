import { ProductType } from "../../types/Product.types";

type SearchFormProps = {
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type SearchFilterProps = {
  filterCategory: string;
  filterClickHandler: (value: string) => void;
};

type ProductListProps = {
  productList: ProductType[];
};

type ProductProps = {
  product: ProductType;
};

type ProductDataType = {
  page: number;
  pages: number;
  productList: [];
};

export type { SearchFormProps, SearchFilterProps, ProductListProps, ProductProps, ProductDataType };
