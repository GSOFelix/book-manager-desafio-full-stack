export class PaginationHelper {
    static buildResponse<T>(
        data: T[],
        total: number,
        page: number,
        limit: number,
    ) {
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }

    static calculateSkip(page: number, limit: number): number {
        return (page - 1) * limit;
    }
}