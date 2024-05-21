import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructordetailsComponent } from './instructordetails.component';

describe('InstructordetailsComponent', () => {
  let component: InstructordetailsComponent;
  let fixture: ComponentFixture<InstructordetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructordetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
