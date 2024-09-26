import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationRequest {
  @ApiPropertyOptional({
    type: Number,
    description: 'Pagination page number',
  })
  page: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Search keywords',
  })
  search: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Number of item to show per page',
  })
  perPage: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Order By field (default ASC)',
  })
  orderBy: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Sort by method value: asc,desc',
  })
  sortBy: string;

  @ApiPropertyOptional({
    type: Object,
    description: 'Filters object',
  })
  filters: string;
}
