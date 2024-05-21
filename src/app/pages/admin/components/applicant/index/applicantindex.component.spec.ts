import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantindexComponent } from './applicantindex.component';

describe('ApplicantindexComponent', () => {
  let component: ApplicantindexComponent;
  let fixture: ComponentFixture<ApplicantindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
