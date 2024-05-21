import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationstatedeleteComponent } from './applicationstatedelete.component';

describe('ApplicationstatedeleteComponent', () => {
  let component: ApplicationstatedeleteComponent;
  let fixture: ComponentFixture<ApplicationstatedeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationstatedeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationstatedeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
