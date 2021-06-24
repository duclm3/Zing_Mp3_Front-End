import { TestBed } from '@angular/core/testing';

import { CommentArtistService } from './comment-artist.service';

describe('CommentArtistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentArtistService = TestBed.get(CommentArtistService);
    expect(service).toBeTruthy();
  });
});
