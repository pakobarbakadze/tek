import { Product } from "../../types/Product.types";

type SearchFormProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type SearchFilterProps = {
  setFilterTerm: (value: string) => void;
};

type ProductListProps = {
  productList: Product[];
};

type ProductProps = {
  product: Product;
};

export type { SearchFormProps, SearchFilterProps, ProductListProps, ProductProps };
