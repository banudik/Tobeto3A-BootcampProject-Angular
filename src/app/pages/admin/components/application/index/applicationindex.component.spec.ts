import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationindexComponent } from './applicationindex.component';

describe('ApplicationindexComponent', () => {
  let component: ApplicationindexComponent;
  let fixture: ComponentFixture<ApplicationindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
