import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FeatureArtitsComponent } from './artist/feature-artits/feature-artits.component';
import {TopSongComponent} from './song/top-song/top-song.component';
import {TreandingSongsComponent} from './song/treanding-songs/treanding-songs.component';
import {ArtistModule} from './artist/artist.module';
import {NewPlaylistComponent} from './playlist/new-playlist/new-playlist.component';
import {TopPlaylistComponent} from './playlist/top-playlist/top-playlist.component';
import {AblumComponent} from './ablum/ablum.component';
import {CreatePlaylistComponent} from './playlist/create-playlist/create-playlist.component';
import {EditPlaylistComponent} from './playlist/edit-playlist/edit-playlist.component';
import {ListPlaylistComponent} from './playlist/list-playlist/list-playlist.component';
import {SongModule} from './song/song.module';
import {SongDetailComponent} from './song/song-detail/song-detail.component';
import {SongDeleteComponent} from './song/song-delete/song-delete.component';
import {SongListComponent} from './song/song-list/song-list.component';
import {SongEditComponent} from './song/song-edit/song-edit.component';
import {SongCreateComponent} from './song/song-create/song-create.component';
import {UploadModule} from '../upload/upload.module';
import {UserEditComponent} from './user-edit/user-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SongUserComponent} from './song/song-user/song-user.component';
import {SongPlayComponent} from './song/song-play/song-play.component';
import {YourPlaylistComponent} from './playlist/your-playlist/your-playlist.component';
import {DetailPlaylistComponent} from './playlist/detail-playlist/detail-playlist.component';
import {SearchResultComponent} from './search/search-result/search-result.component';
import {CommentPlaylistComponent} from './playlist/comment-playlist/comment-playlist.component';
import {CommentSongComponent} from './song/comment-song/comment-song.component';
import {CommentArtistComponent} from './artist/comment-artist/comment-artist.component';
import {CreteArtistComponent} from './artist/crete-artist/crete-artist.component';
import {AllArtistComponent} from './artist/all-artist/all-artist.component';
import {DetailArtistComponent} from './artist/detail-artist/detail-artist.component';
import {ContactComponent} from './contact/contact.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [NewPlaylistComponent,
    TopPlaylistComponent,
    AblumComponent,
    FeatureArtitsComponent,
    TopSongComponent,
    TreandingSongsComponent,
    SongDetailComponent,
    SongDeleteComponent,
    SongListComponent,
    SongEditComponent,
    SongCreateComponent,
    CreatePlaylistComponent,
    EditPlaylistComponent,
    ListPlaylistComponent,
    UserEditComponent,
    SongUserComponent,
    SongPlayComponent,
    YourPlaylistComponent,
    DetailPlaylistComponent,
    SearchResultComponent,
    CommentPlaylistComponent,
    CommentSongComponent,
    CommentArtistComponent,
    CreteArtistComponent,
    AllArtistComponent,
    DetailArtistComponent,
    ContactComponent
  ],


  exports: [
    AllArtistComponent,
    FeatureArtitsComponent,
    TopSongComponent,
    TreandingSongsComponent,
    NewPlaylistComponent,
    TopPlaylistComponent,
    AblumComponent,
    SongDetailComponent,
    SongDeleteComponent,
    SongListComponent,
    SongEditComponent,
    SongCreateComponent,
    CreatePlaylistComponent,
    EditPlaylistComponent,
    ListPlaylistComponent,
    UserEditComponent,
    SongUserComponent,
    SongUserComponent,
    CreatePlaylistComponent,
    NewPlaylistComponent,
    TopPlaylistComponent,
    CreatePlaylistComponent,
    NewPlaylistComponent,
    TopPlaylistComponent,
    EditPlaylistComponent,
    SongPlayComponent,
    YourPlaylistComponent,
    DetailPlaylistComponent,
    ContactComponent

  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        UploadModule,
        ReactiveFormsModule,
        NgbCarouselModule,
        FormsModule,
        NgxPaginationModule,
        NgbModule,
    ],

})
export class UserModule { }
