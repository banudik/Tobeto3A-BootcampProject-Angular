import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedeleteComponent } from './employeedelete.component';

describe('EmployeedeleteComponent', () => {
  let component: EmployeedeleteComponent;
  let fixture: ComponentFixture<EmployeedeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeedeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeedeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
