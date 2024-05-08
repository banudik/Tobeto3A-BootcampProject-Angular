import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampeditComponent } from './bootcampedit.component';

describe('BootcampeditComponent', () => {
  let component: BootcampeditComponent;
  let fixture: ComponentFixture<BootcampeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
