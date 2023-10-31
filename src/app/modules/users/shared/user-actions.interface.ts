import { User } from './user.interface';

export interface GetUserSuccessProps {
  data: User[];
}

export interface AddRandomUserProps {
  user: User;
}

export interface AddUserToFavoritesProps {
  user: User;
}

export interface AddUserToFavoritesSuccessProps {
  user: User;
}

export interface RemoveUserToFavoritesProps {
  user: User;
}
