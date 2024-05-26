import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistdeleteComponent } from './blacklistdelete.component';

describe('BlacklistdeleteComponent', () => {
  let component: BlacklistdeleteComponent;
  let fixture: ComponentFixture<BlacklistdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlacklistdeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlacklistdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
