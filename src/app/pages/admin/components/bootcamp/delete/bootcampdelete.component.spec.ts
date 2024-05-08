import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampdeleteComponent } from './bootcampdelete.component';

describe('BootcampdeleteComponent', () => {
  let component: BootcampdeleteComponent;
  let fixture: ComponentFixture<BootcampdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampdeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
