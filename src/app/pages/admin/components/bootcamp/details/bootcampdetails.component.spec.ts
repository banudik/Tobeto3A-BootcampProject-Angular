import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampdetailsComponent } from './bootcampdetails.component';

describe('BootcampdetailsComponent', () => {
  let component: BootcampdetailsComponent;
  let fixture: ComponentFixture<BootcampdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
