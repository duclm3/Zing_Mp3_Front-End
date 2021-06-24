import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SongDetailComponent} from './song/song-detail/song-detail.component';
import {SongListComponent} from './song/song-list/song-list.component';
import {SongCreateComponent} from './song/song-create/song-create.component';
import {SongEditComponent} from './song/song-edit/song-edit.component';
import {SongDeleteComponent} from './song/song-delete/song-delete.component';
import {CreatePlaylistComponent} from './playlist/create-playlist/create-playlist.component';
import {EditPlaylistComponent} from './playlist/edit-playlist/edit-playlist.component';
import {ListPlaylistComponent} from './playlist/list-playlist/list-playlist.component';
import {AuthGuard} from '../helper/auth-guard';
import {UserEditComponent} from './user-edit/user-edit.component';
import {SongUserComponent} from './song/song-user/song-user.component';

import {YourPlaylistComponent} from './playlist/your-playlist/your-playlist.component';

import {TopPlaylistComponent} from './playlist/top-playlist/top-playlist.component';
import {NewPlaylistComponent} from './playlist/new-playlist/new-playlist.component';
import {DetailPlaylistComponent} from './playlist/detail-playlist/detail-playlist.component';
import {SearchResultComponent} from './search/search-result/search-result.component';
import {CommentSongComponent} from './song/comment-song/comment-song.component';
import {CommentArtistComponent} from './artist/comment-artist/comment-artist.component';
import {CommentPlaylistComponent} from './playlist/comment-playlist/comment-playlist.component';
import {CreteArtistComponent} from './artist/crete-artist/crete-artist.component';
import {AllArtistComponent} from './artist/all-artist/all-artist.component';
import {DetailArtistComponent} from './artist/detail-artist/detail-artist.component';
import {ContactComponent} from './contact/contact.component';


const routes: Routes = [
  {
    path: 'search/:name' ,
    component: SearchResultComponent,
  },
  {
    path: 'edit' ,
    component: UserEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'playlists/create' ,
    component: CreatePlaylistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'playlists/edit/:id' ,
    component: EditPlaylistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'yourplaylists' ,
    component: YourPlaylistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'playlist/delete' ,
    component: EditPlaylistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'songs/detail/:id',
    component: SongDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'yoursongs',
    component: SongUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'songs/edit/:id',
    component: SongEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'songs/create',
    component: SongCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'songs/delete/:id',
    component: SongDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'allsongs',
    component: SongListComponent,
  },
  {
    path: 'playlists/rating',
    component: TopPlaylistComponent,
  },
  {
    path: 'playlists/news',
    component: NewPlaylistComponent,
  },
  {
    path: 'allplaylists',
    component: ListPlaylistComponent,
  },
  {
    path: 'playlistSong/:id',
    component: DetailPlaylistComponent,
  },
  {
    path: 'songs/comments/:id',
    component: CommentSongComponent,
  },
  {
    path: 'artists/comments/:id',
    component: CommentArtistComponent,
  },
  {
    path: 'songs/comments/:id',
    component: CommentSongComponent,
  },
  {
    path: 'playlists/comments/:id',
    component: CommentPlaylistComponent
  },

  {
    path: 'artists/create',
    component: CreteArtistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'allartists',
    component: AllArtistComponent,
  },
  {
    path: 'detail/artists/:id',
    component: DetailArtistComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'search/:name' ,
    component: SearchResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
