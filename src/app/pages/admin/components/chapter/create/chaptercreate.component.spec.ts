import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptercreateComponent } from './chaptercreate.component';

describe('ChaptercreateComponent', () => {
  let component: ChaptercreateComponent;
  let fixture: ComponentFixture<ChaptercreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChaptercreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChaptercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
