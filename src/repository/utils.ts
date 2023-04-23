import { PaginateResult } from "mongoose";
import { PaginateMeta } from "src/common/interface/IPaginate";

export function extractMetaInfoFromPaginateModel<T>(model: PaginateResult<T>): PaginateMeta {
    return {
        totalDocs: model.totalDocs,
        pageSize: model.limit,
        totalPages: model.totalPages,
        currentPage: model.page,
        pagingCounter: model.pagingCounter,
        hasPrevPage: model.hasPrevPage,
        hasNextPage: model.hasNextPage,
        prevPageNumber: model.prevPage,
        nextPageNumber: model.nextPage,
    }
}