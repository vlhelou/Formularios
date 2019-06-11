import { TestBed } from '@angular/core/testing';

import { PreenchimentoService } from './preenchimento.service';

describe('PreenchimentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreenchimentoService = TestBed.get(PreenchimentoService);
    expect(service).toBeTruthy();
  });
});
