import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistdetailsComponent } from './blacklistdetails.component';

describe('BlacklistdetailsComponent', () => {
  let component: BlacklistdetailsComponent;
  let fixture: ComponentFixture<BlacklistdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlacklistdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlacklistdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
