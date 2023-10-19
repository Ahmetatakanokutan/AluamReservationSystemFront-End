import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationCalendarComponent } from './user-reservation-calendar.component';

describe('UserReservationCalendarComponent', () => {
  let component: UserReservationCalendarComponent;
  let fixture: ComponentFixture<UserReservationCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReservationCalendarComponent]
    });
    fixture = TestBed.createComponent(UserReservationCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
