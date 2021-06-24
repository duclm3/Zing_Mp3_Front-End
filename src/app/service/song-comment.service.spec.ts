import { TestBed } from '@angular/core/testing';

import { SongCommentService } from './song-comment.service';

describe('SongCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongCommentService = TestBed.get(SongCommentService);
    expect(service).toBeTruthy();
  });
});
