import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampstatedetailsComponent } from './bootcampstatedetails.component';

describe('BootcampstatedetailsComponent', () => {
  let component: BootcampstatedetailsComponent;
  let fixture: ComponentFixture<BootcampstatedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampstatedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampstatedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
