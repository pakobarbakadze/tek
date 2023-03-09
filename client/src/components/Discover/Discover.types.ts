type SearchFormProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type SearchFilterProps = {
  setFilterTerm: (value: string) => void;
};

export type { SearchFormProps, SearchFilterProps };
