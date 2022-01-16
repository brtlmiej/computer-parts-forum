export class Paginator<T> {
  data: T[];
  count: number;
  total: number;
  totalPages: number;
  page: number;
}