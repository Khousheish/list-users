import { PaginatedUsersResponse, User } from '@Modules/users/shared/user.interface';

export const MOCKED_USER: User = {
  id: 1,
  email: 'khousheish@live.com',
  first_name: 'Hassan',
  last_name: 'Khousheish',
  avatar: 'https://reqres.in/img/faces/1-image.jpg',
  isFavorite: false,
};

export const MOCKED_PAGINATED_USER_RESPONSE: PaginatedUsersResponse = {
  data: [MOCKED_USER],
  page: 1,
  per_page: 10,
  total_pages: 1,
  total: 1,
  support: {
    url: '',
    text: '',
  },
};
