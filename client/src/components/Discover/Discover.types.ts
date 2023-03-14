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

type PaginationProps = {
  page: number;
  pages: number;
  setProductData: (productData: any) => void;
};

export type { SearchFormProps, SearchFilterProps, ProductListProps, ProductProps, PaginationProps };
