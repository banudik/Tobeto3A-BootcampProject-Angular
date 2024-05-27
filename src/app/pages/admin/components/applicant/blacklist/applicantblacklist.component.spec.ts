import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantblacklistComponent } from './applicantblacklist.component';

describe('ApplicantblacklistComponent', () => {
  let component: ApplicantblacklistComponent;
  let fixture: ComponentFixture<ApplicantblacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantblacklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantblacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
