export interface Quote {
  _id: string;
  content: string;
  author: string;
  authorSlug?: string;
  length: number;
  tags: string[];
}

export interface QuotesData {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: Quote[];
}

export interface PaginationProps {
  handlePagination: (pageCount: number) => void;
  page: number;
  loading: boolean;
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
  link: string
  quoteCount: number;
  slug: string;
  dateAdded: string;
  dateModified: string;
}