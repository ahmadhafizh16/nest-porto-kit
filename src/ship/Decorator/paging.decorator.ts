import { createParamDecorator, ExecutionContext, Query } from '@nestjs/common';

export const Paging = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const { query } = ctx.switchToHttp().getRequest();

  return {
    page: query.page ? parseInt(query.page) : 1,
    search: query.search ? query.search : null,
    perPage: query.perPage ? query.perPage : 10,
    orderBy: query.orderBy ? query.orderBy : null,
    sortBy: query.sortBy ? query.sortBy : 'asc',
    filters: query.filters ? query.filters : null,
  };
});
