import {User} from './user';
import {Artist} from './artist';

export interface CommentArist {
  id?: number;
  content?: string;
  user?: User;
  artist?: Artist;
}
