import { TestBed } from '@angular/core/testing';

import { MicroblockchainService } from './microblockchain.service';

describe('MicroblockchainService', () => {
  let service: MicroblockchainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroblockchainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
