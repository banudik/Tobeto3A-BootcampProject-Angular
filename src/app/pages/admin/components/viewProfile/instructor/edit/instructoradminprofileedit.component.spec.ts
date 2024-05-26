import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructoradminprofileeditComponent } from './instructoradminprofileedit.component';

describe('InstructoradminprofileeditComponent', () => {
  let component: InstructoradminprofileeditComponent;
  let fixture: ComponentFixture<InstructoradminprofileeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructoradminprofileeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructoradminprofileeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
