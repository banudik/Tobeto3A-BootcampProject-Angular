import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructordeleteComponent } from './instructordelete.component';

describe('InstructordeleteComponent', () => {
  let component: InstructordeleteComponent;
  let fixture: ComponentFixture<InstructordeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructordeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructordeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
