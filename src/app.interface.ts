export interface Pagination<T> {
  total: number;
  totalPage: number;
  per: number;
  current: number;
  data: T[];
}

export interface Question {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  [propName: string]: any;
}
