import {User} from './user';
import {Playlist} from './playlist';
export interface Likeplaylist {
  id?: number;

  user?: User

  isLike?: boolean

  playlist?: Playlist
}
