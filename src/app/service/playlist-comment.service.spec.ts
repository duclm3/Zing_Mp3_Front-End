import { TestBed } from '@angular/core/testing';

import { PlaylistCommentService } from './playlist-comment.service';

describe('PlaylistCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistCommentService = TestBed.get(PlaylistCommentService);
    expect(service).toBeTruthy();
  });
});
