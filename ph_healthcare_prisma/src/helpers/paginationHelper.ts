type IOptions = {
    page?:number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'asc'| 'desc',
}
type IOptionsResult = {
    page:number,
    limit: number,
    skip: number,
    sortBy: string,
    sortOrder: 'asc'| 'desc',
}

const calculatePagination = (options:IOptions):IOptionsResult =>{
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1 ) * limit;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

export const paginationHelper = {
    calculatePagination,
}