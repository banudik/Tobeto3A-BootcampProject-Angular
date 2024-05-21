import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeeditComponent } from './employeeedit.component';

describe('EmployeeeditComponent', () => {
  let component: EmployeeeditComponent;
  let fixture: ComponentFixture<EmployeeeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
