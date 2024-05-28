import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructoradminprofiledetailsComponent } from './instructoradminprofiledetails.component';

describe('InstructoradminprofiledetailsComponent', () => {
  let component: InstructoradminprofiledetailsComponent;
  let fixture: ComponentFixture<InstructoradminprofiledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructoradminprofiledetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructoradminprofiledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
