import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationeditComponent } from './applicationedit.component';

describe('ApplicationeditComponent', () => {
  let component: ApplicationeditComponent;
  let fixture: ComponentFixture<ApplicationeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
