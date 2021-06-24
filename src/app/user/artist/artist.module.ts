import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { CreteArtistComponent } from './crete-artist/crete-artist.component';
import { AllArtistComponent } from './all-artist/all-artist.component';
import { DetailArtistComponent } from './detail-artist/detail-artist.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ArtistRoutingModule
  ]
})
export class ArtistModule { }
