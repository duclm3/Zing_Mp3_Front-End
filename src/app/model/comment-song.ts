import {User} from './user';
import {Song} from './song';

export interface CommentSong {
  id?: number;
  content?: string;
  user?: User;
  song?: Song;
}
