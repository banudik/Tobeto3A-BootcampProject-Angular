import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptereditComponent } from './chapteredit.component';

describe('ChaptereditComponent', () => {
  let component: ChaptereditComponent;
  let fixture: ComponentFixture<ChaptereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChaptereditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChaptereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
