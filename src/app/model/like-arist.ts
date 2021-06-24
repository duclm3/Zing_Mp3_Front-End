import {User} from './user';
import {Artist} from './artist';

export interface LikeArist {
  id?: number;

  user?: User

  isLike?: boolean

  artist?: Artist
}
