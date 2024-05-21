import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationstatecreateComponent } from './applicationstatecreate.component';

describe('ApplicationstatecreateComponent', () => {
  let component: ApplicationstatecreateComponent;
  let fixture: ComponentFixture<ApplicationstatecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationstatecreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationstatecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
