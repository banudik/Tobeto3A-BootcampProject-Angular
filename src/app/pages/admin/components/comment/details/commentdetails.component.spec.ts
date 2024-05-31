import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentdetailsComponent } from './commentdetails.component';

describe('CommentdetailsComponent', () => {
  let component: CommentdetailsComponent;
  let fixture: ComponentFixture<CommentdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
