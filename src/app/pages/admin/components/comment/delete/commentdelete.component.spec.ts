import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentdeleteComponent } from './commentdelete.component';

describe('CommentdeleteComponent', () => {
  let component: CommentdeleteComponent;
  let fixture: ComponentFixture<CommentdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentdeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
