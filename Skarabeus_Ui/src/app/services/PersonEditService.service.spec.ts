/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PersonEditServiceService } from './Edit.service';

describe('Service: PersonEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonEditServiceService]
    });
  });

  it('should ...', inject([PersonEditServiceService], (service: PersonEditServiceService) => {
    expect(service).toBeTruthy();
  }));
});
