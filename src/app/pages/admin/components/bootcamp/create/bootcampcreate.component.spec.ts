import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampcreateComponent } from './bootcampcreate.component';

describe('BootcampcreateComponent', () => {
  let component: BootcampcreateComponent;
  let fixture: ComponentFixture<BootcampcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampcreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
