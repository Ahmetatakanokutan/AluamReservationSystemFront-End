import { TestBed } from '@angular/core/testing';

import { UserReservationCalendarService } from './user-reservation-calendar.service';

describe('UserReservationCalendarService', () => {
  let service: UserReservationCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReservationCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
