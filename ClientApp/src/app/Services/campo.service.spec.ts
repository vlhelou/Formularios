import { TestBed } from '@angular/core/testing';

import { CampoService } from './campo.service';

describe('CampoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampoService = TestBed.get(CampoService);
    expect(service).toBeTruthy();
  });
});
