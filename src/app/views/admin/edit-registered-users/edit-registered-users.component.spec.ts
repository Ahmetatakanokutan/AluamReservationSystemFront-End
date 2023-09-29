import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegisteredUsersComponent } from './edit-registered-users.component';

describe('EditRegisteredUsersComponent', () => {
  let component: EditRegisteredUsersComponent;
  let fixture: ComponentFixture<EditRegisteredUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRegisteredUsersComponent]
    });
    fixture = TestBed.createComponent(EditRegisteredUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
