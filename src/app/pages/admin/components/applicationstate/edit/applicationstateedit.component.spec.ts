import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationstateeditComponent } from './applicationstateedit.component';

describe('ApplicationstateeditComponent', () => {
  let component: ApplicationstateeditComponent;
  let fixture: ComponentFixture<ApplicationstateeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationstateeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationstateeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
