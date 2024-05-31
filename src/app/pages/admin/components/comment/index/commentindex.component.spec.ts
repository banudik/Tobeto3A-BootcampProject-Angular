import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentindexComponent } from './commentindex.component';

describe('CommentindexComponent', () => {
  let component: CommentindexComponent;
  let fixture: ComponentFixture<CommentindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
