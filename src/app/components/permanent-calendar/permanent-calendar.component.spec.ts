import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentCalendarComponent } from './permanent-calendar.component';

describe('PermanentCalendarComponent', () => {
  let component: PermanentCalendarComponent;
  let fixture: ComponentFixture<PermanentCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermanentCalendarComponent]
    });
    fixture = TestBed.createComponent(PermanentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
