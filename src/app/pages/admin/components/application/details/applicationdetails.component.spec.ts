import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationdetailsComponent } from './applicationdetails.component';

describe('ApplicationdetailsComponent', () => {
  let component: ApplicationdetailsComponent;
  let fixture: ComponentFixture<ApplicationdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
