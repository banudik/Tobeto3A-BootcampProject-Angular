import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationstatedetailsComponent } from './applicationstatedetails.component';

describe('ApplicationstatedetailsComponent', () => {
  let component: ApplicationstatedetailsComponent;
  let fixture: ComponentFixture<ApplicationstatedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationstatedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationstatedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
