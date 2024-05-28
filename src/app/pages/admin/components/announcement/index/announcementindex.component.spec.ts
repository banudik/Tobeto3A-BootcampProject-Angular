import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementindexComponent } from './announcementindex.component';

describe('AnnouncementindexComponent', () => {
  let component: AnnouncementindexComponent;
  let fixture: ComponentFixture<AnnouncementindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementindexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnouncementindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
