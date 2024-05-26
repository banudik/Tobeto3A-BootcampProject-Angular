import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistindexComponent } from './blacklistindex.component';

describe('BlacklistindexComponent', () => {
  let component: BlacklistindexComponent;
  let fixture: ComponentFixture<BlacklistindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlacklistindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlacklistindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
