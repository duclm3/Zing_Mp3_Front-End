import {User} from './user';
import {Playlist} from './playlist';


export interface Commentplaylist {
  id?: number;
  content?: string;
  user?: User;
  playlist?: Playlist;
}
