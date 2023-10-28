export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface PaginatedUsersResponse {
  page: number;
  per_page: number;
  support: {
    text: string;
    url: string;
  };
  data: User[];
  total: number;
  total_pages: number;
}
