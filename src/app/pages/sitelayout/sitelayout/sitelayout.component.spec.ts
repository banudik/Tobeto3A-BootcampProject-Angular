import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitelayoutComponent } from './sitelayout.component';

describe('SitelayoutComponent', () => {
  let component: SitelayoutComponent;
  let fixture: ComponentFixture<SitelayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitelayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SitelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
