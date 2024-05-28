import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklisteditComponent } from './blacklistedit.component';

describe('BlacklisteditComponent', () => {
  let component: BlacklisteditComponent;
  let fixture: ComponentFixture<BlacklisteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlacklisteditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlacklisteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
