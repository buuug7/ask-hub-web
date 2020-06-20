export interface Pagination<T> {
  total: number;
  totalPage: number;
  per: number;
  current: number;
  data: T[];
}

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
