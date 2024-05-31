import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterdeleteComponent } from './chapterdelete.component';

describe('ChapterdeleteComponent', () => {
  let component: ChapterdeleteComponent;
  let fixture: ComponentFixture<ChapterdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterdeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapterdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
