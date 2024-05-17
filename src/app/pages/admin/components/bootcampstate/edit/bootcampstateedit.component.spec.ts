import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampstateeditComponent } from './bootcampstateedit.component';

describe('BootcampstateeditComponent', () => {
  let component: BootcampstateeditComponent;
  let fixture: ComponentFixture<BootcampstateeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampstateeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampstateeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
