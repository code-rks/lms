export interface IPaginate<T> {
  docs: T[];
  meta: PaginateMeta;
}

export interface PaginateMeta {
  totalDocs: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPageNumber: number;
  nextPageNumber: number;
}
