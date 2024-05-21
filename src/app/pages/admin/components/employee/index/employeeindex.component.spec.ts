import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeindexComponent } from './employeeindex.component';

describe('EmployeeindexComponent', () => {
  let component: EmployeeindexComponent;
  let fixture: ComponentFixture<EmployeeindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
