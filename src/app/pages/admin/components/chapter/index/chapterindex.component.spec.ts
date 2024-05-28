import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterindexComponent } from './chapterindex.component';

describe('ChapterindexComponent', () => {
  let component: ChapterindexComponent;
  let fixture: ComponentFixture<ChapterindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapterindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
