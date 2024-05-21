import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorindexComponent } from './instructorindex.component';

describe('InstructorindexComponent', () => {
  let component: InstructorindexComponent;
  let fixture: ComponentFixture<InstructorindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
