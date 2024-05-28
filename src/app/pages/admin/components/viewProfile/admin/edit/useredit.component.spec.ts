import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsereditComponent } from './useredit.component';

describe('UsereditComponent', () => {
  let component: UsereditComponent;
  let fixture: ComponentFixture<UsereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsereditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
