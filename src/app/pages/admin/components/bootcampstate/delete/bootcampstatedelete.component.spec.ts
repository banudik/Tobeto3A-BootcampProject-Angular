import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampstatedeleteComponent } from './bootcampstatedelete.component';

describe('BootcampstatedeleteComponent', () => {
  let component: BootcampstatedeleteComponent;
  let fixture: ComponentFixture<BootcampstatedeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampstatedeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampstatedeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
