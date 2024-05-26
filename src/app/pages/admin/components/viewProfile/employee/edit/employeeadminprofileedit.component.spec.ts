import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeadminprofileeditComponent } from './employeeadminprofileedit.component';

describe('EmployeeadminprofileeditComponent', () => {
  let component: EmployeeadminprofileeditComponent;
  let fixture: ComponentFixture<EmployeeadminprofileeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeadminprofileeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeadminprofileeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
