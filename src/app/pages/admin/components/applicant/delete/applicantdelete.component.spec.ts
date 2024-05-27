import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantdeleteComponent } from './applicantdelete.component';

describe('ApplicantdeleteComponent', () => {
  let component: ApplicantdeleteComponent;
  let fixture: ComponentFixture<ApplicantdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantdeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
