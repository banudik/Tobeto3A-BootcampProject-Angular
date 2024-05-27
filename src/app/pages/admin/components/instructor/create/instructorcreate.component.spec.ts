import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorcreateComponent } from './instructorcreate.component';

describe('InstructorcreateComponent', () => {
  let component: InstructorcreateComponent;
  let fixture: ComponentFixture<InstructorcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorcreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
