import { TestBed } from '@angular/core/testing';

import { CorreosAfiliacionesService } from './correos-afiliaciones.service';

describe('CorreosAfiliacionesService', () => {
  let service: CorreosAfiliacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreosAfiliacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
