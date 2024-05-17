import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampstateindexComponent } from './bootcampstateindex.component';

describe('BootcampstateindexComponent', () => {
  let component: BootcampstateindexComponent;
  let fixture: ComponentFixture<BootcampstateindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampstateindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampstateindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
