import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeecreateComponent } from './employeecreate.component';

describe('EmployeecreateComponent', () => {
  let component: EmployeecreateComponent;
  let fixture: ComponentFixture<EmployeecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeecreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
