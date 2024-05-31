import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistcreateComponent } from './blacklistcreate.component';

describe('BlacklistcreateComponent', () => {
  let component: BlacklistcreateComponent;
  let fixture: ComponentFixture<BlacklistcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlacklistcreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlacklistcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
