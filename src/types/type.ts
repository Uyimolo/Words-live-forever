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
