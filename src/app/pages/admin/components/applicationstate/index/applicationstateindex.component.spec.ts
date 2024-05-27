import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationstateindexComponent } from './applicationstateindex.component';

describe('ApplicationstateindexComponent', () => {
  let component: ApplicationstateindexComponent;
  let fixture: ComponentFixture<ApplicationstateindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationstateindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationstateindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
