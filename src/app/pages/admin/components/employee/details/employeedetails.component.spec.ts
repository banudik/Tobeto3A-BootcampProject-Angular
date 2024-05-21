import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedetailsComponent } from './employeedetails.component';

describe('EmployeedetailsComponent', () => {
  let component: EmployeedetailsComponent;
  let fixture: ComponentFixture<EmployeedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
