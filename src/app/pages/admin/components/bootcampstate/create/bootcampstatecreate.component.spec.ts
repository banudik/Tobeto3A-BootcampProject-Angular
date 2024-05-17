import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampstatecreateComponent } from './bootcampstatecreate.component';

describe('BootcampstatecreateComponent', () => {
  let component: BootcampstatecreateComponent;
  let fixture: ComponentFixture<BootcampstatecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampstatecreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampstatecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
