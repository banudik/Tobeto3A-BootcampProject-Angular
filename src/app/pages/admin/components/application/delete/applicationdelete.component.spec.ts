import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationdeleteComponent } from './applicationdelete.component';

describe('ApplicationdeleteComponent', () => {
  let component: ApplicationdeleteComponent;
  let fixture: ComponentFixture<ApplicationdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationdeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
