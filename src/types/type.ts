export interface Quote {
  _id: string;
  content: string;
  author: string;
  authorSlug?: string;
  length: number;
  tags: string[];
}

export interface Tag {
  _id: string;
  name: string;
  slug: string;
  quoteCount: number;
  dateAdded: string;
  dateModified: string;
}

export interface QuotesData {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: Quote[];
}

export interface SearchQuote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorId: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

// export interface SearchResponse {
//   __info__: {
//     $search: {
//       queryString: {
//         query: string;
//         defaultPath: string;
//       };
//     };
//   };
//   count: number;
//   totalCount: number;
//   page: number;
//   totalPages: number;
//   results: SearchQuote[];
// }

export interface PaginationProps {
  handlePagination: (pageCount: number) => void;
  page: number;
  loading: boolean;
  totalPages: number;
}

export interface AuthorsData {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: Author[];
}

export interface Author {
  _id: string;
  name: string;
  bio: string;
  description: string;
  link: string;
  quoteCount: number;
  slug: string;
  dateAdded: string;
  dateModified: string;
}

export interface SearchProps {
  setSearchTerm: (term: string) => void;
  searchTerm: string;
  isSearching: boolean;
}

export interface SearchResultsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setIsSearching: (isSearching: boolean) => void;
}

export interface FilterOptions {
  tags: string[] | [];
  author: string[];
  length: 'none' | 'short' | 'medium' | 'long';
}

export interface AccordionStateOption {
  name: string;
  active: boolean;
}

export interface FilterProps {
  setSelectedFilters: (filters: FilterOptions) => void;
  selectedFilters: FilterOptions;
  accordionState: AccordionStateOption;
  handleAccordionState: (variant: string) => void;
}
