import { ProductType } from "../../types/Product.types";

type SearchFormProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type SearchFilterProps = {
  filterCategory: string;
  setFilterCategory: (value: string) => void;
};

type ProductListProps = {
  productList: ProductType[];
};

type ProductProps = {
  product: ProductType;
};

export type { SearchFormProps, SearchFilterProps, ProductListProps, ProductProps };
