import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampindexComponent } from './bootcampindex.component';

describe('BootcampindexComponent', () => {
  let component: BootcampindexComponent;
  let fixture: ComponentFixture<BootcampindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
