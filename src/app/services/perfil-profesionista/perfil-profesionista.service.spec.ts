import { TestBed } from '@angular/core/testing';

import { PerfilProfesionistaService } from './perfil-profesionista.service';

describe('PerfilProfesionistaService', () => {
  let service: PerfilProfesionistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilProfesionistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
