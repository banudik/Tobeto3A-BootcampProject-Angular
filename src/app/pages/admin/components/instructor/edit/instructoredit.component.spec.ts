import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructoreditComponent } from './instructoredit.component';

describe('InstructoreditComponent', () => {
  let component: InstructoreditComponent;
  let fixture: ComponentFixture<InstructoreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructoreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
