export interface IPaginate<T> {
    docs: T[];
    meta: PaginateMeta;
}

export interface PaginateMeta {
    totalDocs: Number;
    pageSize: Number;
    totalPages: Number;
    currentPage: Number;
    pagingCounter: Number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPageNumber: Number;
    nextPageNumber: Number;
}

