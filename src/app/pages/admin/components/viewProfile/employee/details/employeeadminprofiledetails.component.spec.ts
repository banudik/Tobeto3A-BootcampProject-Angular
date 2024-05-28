import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeadminprofiledetailsComponent } from './employeeadminprofiledetails.component';

describe('EmployeeadminprofiledetailsComponent', () => {
  let component: EmployeeadminprofiledetailsComponent;
  let fixture: ComponentFixture<EmployeeadminprofiledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeadminprofiledetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeadminprofiledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
