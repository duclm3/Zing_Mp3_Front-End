import {User} from './user';
import {Song} from './song';

export interface LikeSong {
  id?: number;

  user?: User

  isLike?: boolean

  song?: Song;
}
