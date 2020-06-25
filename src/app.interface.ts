export interface PaginationMeta {
  total: number;
  totalPage: number;
  perPage: number;
  currentPage: number;
}

export interface Pagination<T> {
  meta: PaginationMeta;
  data: T[];
}

export type PaginationNoDataAttr = Pick<Pagination<any>, "meta">;

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  [propName: string]: any;
}

export interface Answer {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  [propName: string]: any;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface AppContextInterface {
  user: User | null;
  loading: boolean;
  updateUser: Function;
  updateLoading: Function;
}
